import { useEffect, useState } from 'react';

type IntersectionObserverEntryWithId = IntersectionObserverEntry & {
    target: HTMLElement;
};

const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const [entries, setEntries] = useState<IntersectionObserverEntryWithId[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            setEntries(entries as IntersectionObserverEntryWithId[]);
        }, options);

        const elements = document.querySelectorAll('[data-observe]');
        elements.forEach((element) => observer.observe(element));

        return () => {
            elements.forEach((element) => observer.unobserve(element));
        };
    }, [options]);

    return entries;
};

export default useIntersectionObserver;
