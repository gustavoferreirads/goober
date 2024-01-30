import {useEffect, useRef, useState} from 'react';


export const useProgressFill = (totalDurationInSeconds = 20) => {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<any>(null);

    const startProcess = (onFinish: () => void) => {
        setProgress(0);
        const updateInterval = 1000; // 1000 milliseconds = 1 second
        const totalUpdates = totalDurationInSeconds; // 1 update per second
        const progressIncrement = 100 / totalUpdates; // 1% increment for each update

        intervalRef.current = setInterval(() => {
            setProgress(prevProgress => {
                const nextProgress = prevProgress + progressIncrement;
                if (nextProgress >= 100) {
                    clearInterval(intervalRef.current as any);
                    onFinish();
                    return 100;
                }
                return nextProgress;
            });
        }, updateInterval);
    };

    const cancelProcess = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setProgress(0); // Reset progress
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [totalDurationInSeconds]);

    return { progress, startProcess, cancelProcess };
};
