export function getDefaultParam(position: number, defaultValue: string = "") {
    if(process.argv.length > position) {
        return process.argv[position];
    }
    else {
        return defaultValue;
    }
}