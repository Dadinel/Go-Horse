const printLog: boolean = process.env.devLog === "logging" || false;

export function logMessage(...message: any): void {
    if (printLog) {
        console.log(message);
    }
}