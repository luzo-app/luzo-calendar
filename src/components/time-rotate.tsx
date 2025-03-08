import { WordRotate } from "@/components/magicui/word-rotate";
import { useEffect, useState } from "react";

const TimeRotate: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Extraire les heures et les minutes
    const hoursMinutes = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <span className="flex items-center justify-center text-2xl font-bold text-gray-800 dark:text-white">
            {hoursMinutes}:
            <WordRotate
                words={[time.getSeconds().toString().padStart(2, "0")]}
                className="inline"
            />
        </span>
    );
};

export default TimeRotate;