import { Injectable } from '@nestjs/common';
import { isFullTested } from '../controller/controller.util';
import { Sequelize } from 'sequelize-typescript';
import { getSequelizeInstance } from '../database/database.providers';

@Injectable()
export class SonarService {
    public async generateSonarCoverage(id: string): Promise<any> {
        if ( isFullTested(id) ) {
            const sequelize: Sequelize = getSequelizeInstance();
            const query: string = `
                   SELECT cov.id
                        , cov.source
                        , parse.directory
                        , parseLine.line
                        , CASE
                        WHEN COALESCE(covLine.line,0) > 0 THEN
                            true
                        ELSE
                            false
                        END coverage
                     FROM "parsedSources" parse
                     LEFT JOIN "parsedLinesSources" parseLine
                       ON parse.id = parseLine.id
                      AND parse.source = parseLine.source
                     LEFT JOIN "testcaseCoverage" cov
                       ON parse.id = cov.id
                      AND parse.source = cov.source
                     LEFT JOIN "testcaseLinesCoverage" covLine
                       ON parse.id = covLine.id
                      AND parse.source = covLine.source
                      AND parseLine.line = covLine.line
                    WHERE parse.id = '${id}'
                      AND parse.source like '%FWCLOSEAREA.%'
                    ORDER BY parse.id
                        , parse.source
                        , parseLine.line;
               `;

            let xml: string = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            xml += '<coverage version="1">\n';

            await sequelize.query(query).spread( (results: any, metadata: any) => {
                let source: string = '';
                let close: boolean = false;

                for (const line of results) {
                    if (source !== line.source) {
                        if (close) {
                            xml += '</file>\n';
                        }

                        xml += `<file path="${line.directory}">\n`;
                        source = line.source;
                        close = true;
                    }

                    xml += `<lineToCover covered="${line.coverage}" lineNumber="${line.line}"/>\n`;
                }

                if (close) {
                    xml += '</file>\n';
                }

                xml += '</coverage>';
            });

            return xml;
        } else {
            return false;
        }
    }

    public async generateSonarTests(id: string): Promise<any> {
        if ( isFullTested(id) ) {
            const sequelize: Sequelize = getSequelizeInstance();
            const query: string = `
                SELECT clas.id
                     , clas.source
                     , meth.method
                     , meth.success
                     , meth.message
                  FROM "testcaseClass" clas
                  LEFT JOIN "testcaseMethodsClass" meth
                    ON clas.id = meth.id
                   AND clas.source = meth.source
                 WHERE clas.id = '${id}';
            `;

            let xml: string = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            xml += '<testExecutions version="1">\n';

            await sequelize.query(query).spread( (results: any, metadata: any) => {
                let source: string = '';
                let close: boolean = false;

                for (const method of results) {
                    if (source !== method.source) {
                        if (close) {
                            xml += '</file>\n';
                        }

                        xml += `<file path="${method.source}">\n`;
                        source = method.source;
                        close = true;
                    }

                    // TODO: Verifica a questão da duração do método
                    xml += `<testCase duration="0" name="${method.method}"`;

                    if (!method.success) {
                        xml += `\n<error message="failure">${method.message}</error>\n`;
                    } else {
                        xml += '/>\n';
                    }
                }

                if (close) {
                    xml += '</file>\n';
                }

                xml += '</testExecutions>';
            });

            return xml;
            //
        } else {
            return false;
        }
    }
}
