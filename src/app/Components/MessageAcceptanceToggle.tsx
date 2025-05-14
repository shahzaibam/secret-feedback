"use client";
import { useState } from "react";

interface Props {
    username: string;
}

const MessageToggleAcceptance = ({ username }: Props) => {
    const [isAccepting, setIsAccepting] = useState(true);
    const [loading, setLoading] = useState(false);

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
