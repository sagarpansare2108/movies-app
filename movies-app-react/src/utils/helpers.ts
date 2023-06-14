export function classNames(...args: any[]) {
    return args.filter(Boolean).join(' ')
}

export function convertMinutesToHHMM(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const minutesRemainder = minutes % 60;
    const hoursString = String(hours).padStart(2, '0');
    const minutesString = String(minutesRemainder).padStart(2, '0');
    return `${hoursString}:${minutesString}`;
}
