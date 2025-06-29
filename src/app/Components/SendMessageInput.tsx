"use client"
import React, { useEffect, useState } from 'react'

const SendMessageInput = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<string | null>(null);


    const getAISuggestion = async () => {
        try {
            const res = await fetch("/api/suggest-message");
            const data = await res.json();

            if (data.success) {
                setMessage(data.suggestion);
            } else {
                setStatus("❌ Could not get AI suggestion.");
            }
        } catch (error: Error | unknown) {
            console.error("OpenAI Error:", error instanceof Error ? error.message : error);
            setStatus("❌ Could not get AI suggestion.");
        }

    };



    //send feedback to the user, checks everything if user exists, then if it is accepting messages or not, if yes then send the message and store it
    async function handleSendFeedback(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await fetch("/api/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, message }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("✅ Message sent successfully!");
                setUsername("");
                setMessage("");
            } else {
                setStatus(`❌ ${data.message}`);
            }
        } catch (err) {
            console.error("Error sending message:", err);
            setStatus("❌ Something went wrong.");
        }
    }

    //set time out just to show the status for 3 seconds, after showing for 3 seconds it will be hidden
    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);




    return (
        <div className='w-auto'>
            <div className='text-center'>

                <h1 className='text-3xl font-semibold py-10 tracking-tight '>
                    Write the username and the message
                </h1>

                <form onSubmit={handleSendFeedback} className="flex justify-center gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Username"
                        className="border p-2 px-8 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Type your feedback/message..."
                        className="border p-2 px-8 rounded"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <input
                        type='submit'
                        value="Send"
                        className='bg-blue-600 text-white p-2 px-6 rounded cursor-pointer'
                    />

                    <button
                        type="button"
                        onClick={getAISuggestion}
                        className="bg-purple-600 text-white p-2 px-4 rounded"
                    >
                        ✨ Suggest Message
                    </button>

                </form>

                {status && <p className="mt-4 text-lg">{status}</p>}
            </div>
        </div>
    )
}

export default SendMessageInput;
