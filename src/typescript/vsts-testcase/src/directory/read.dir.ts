import * as fs from "fs";
import * as path from "path";

export function readDir(dir: string, filelist: string[]): string[] {
    const files: string[] = fs.readdirSync(dir);

    for (const file of files) {
        let fullFileName: string;

        fullFileName = path.join(dir, file);

        if (fs.statSync(fullFileName).isDirectory()) {
            filelist = readDir(fullFileName, filelist);
        } else {
            if (fullFileName.toUpperCase().indexOf(".PR") > 0) {
                filelist.push(fullFileName);
            }
        }
    }

    return filelist;
}
