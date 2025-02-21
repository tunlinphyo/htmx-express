export class Utils {
    public static loading(time: number = 1000) {
        return new Promise(resolve => {
            const timeout = setTimeout(() => {
                clearTimeout(timeout)
                resolve(time)
            }, time)
        })
    }

    public static isEmptyObjective(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }
}