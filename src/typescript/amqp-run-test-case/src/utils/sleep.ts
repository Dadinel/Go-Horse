const miliseconds: number = 1000;

export function sleep(seconds: number): void {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, seconds*miliseconds);
}