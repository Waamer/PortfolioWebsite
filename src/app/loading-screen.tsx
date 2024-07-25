'use client'
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [loaderSecs, setLoaderSecs] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setInterval(() => {
            if (loaderSecs >= 50) {
                document.body.style.overflow = 'auto';
                clearInterval(timer);
                onComplete();
            } else {
                setLoaderSecs(prev => prev + 2);
            }
        }, 1);
        return () => clearInterval(timer);
    }, [loaderSecs, onComplete]);

    return (
        <div className={`fixed inset-0 z-30 bg-[#F4A261] flex flex-col items-center justify-center transition-all duration-[600ms] ${loaderSecs === 50 ? '-translate-y-full' : 'translate-y-0'}`}>
            <p className={`text-[#41190f] text-4xl font-bold mb-1 select-none`}>W</p>
            <progress id="progress-bar" className="w-[200px] sm:w-[300px] bg-transparent border-2 border-[#41190f]" value={loaderSecs} max={50}></progress>
        </div>
    );
}
