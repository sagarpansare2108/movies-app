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

export function startViewTransition({
    updateDOM,
    classNames = []
}: {
    updateDOM?: () => void;
    classNames?: string[]
} = {}) {
    const doc = document as any;

    if (!doc.startViewTransition) {
        updateDOM && updateDOM();
        return;
    }

    document.documentElement.classList.add(...classNames);

    const transition = doc.startViewTransition(() => {
        updateDOM && updateDOM();
    });

    transition.finished.finally(() =>
        document.documentElement.classList.remove(...classNames)
    );
};