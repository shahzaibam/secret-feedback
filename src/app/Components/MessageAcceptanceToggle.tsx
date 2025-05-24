"use client";
import { useEffect, useState } from "react";

interface Props {
    username: string;
}

const MessageToggleAcceptance = ({ username }: Props) => {
    const [isAccepting, setIsAccepting] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch status from DB when component mounts
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(`/api/message-acceptance?username=${username}`);
                const data = await res.json();

                if (data.success) {
                    setIsAccepting(data.isAcceptingMessage);
                } else {
                    console.error("Failed to fetch status:", data.message);
                }
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        fetchStatus();
    }, [username]);

    const handleToggle = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/message-acceptance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });

            const data = await res.json();

            if (data.success) {
                setIsAccepting(data.isAcceptingMessage);
            } else {
                console.error("Error:", data.message);
            }
        } catch (err) {
            console.error("Something went wrong", err);
        }

        setLoading(false);
    };

    // Wait for data to load
    if (isAccepting === null) {
        return (<div className="mt-10 text-center">Loading...</div>);
    }

    return (
        <div className="mt-10 flex items-center justify-center gap-4">
            <span className="text-lg font-medium">
                {isAccepting ? "Accepting Messages" : "Not Accepting Messages"}
            </span>

            <button
                onClick={handleToggle}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isAccepting ? "bg-green-500" : "bg-gray-400"
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${isAccepting ? "translate-x-6" : "translate-x-1"
                        }`}
                />
            </button>
        </div>
    );
};

export default MessageToggleAcceptance;
