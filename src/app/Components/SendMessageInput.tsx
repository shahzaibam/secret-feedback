"use client"
import React, { useEffect, useState } from 'react'

const SendMessageInput = () => {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<string | null>(null);

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

                <h1 className='text-3xl font-semibold py-10 tracking-tight uppercase'>
                    Write the username and the message/feedback <br /> you want to send that user
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
                        placeholder="Your message..."
                        className="border p-2 px-8 rounded"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <input
                        type='submit'
                        value="Send"
                        className='bg-blue-600 text-white p-2 px-6 rounded cursor-pointer'
                    />
                </form>

                {status && <p className="mt-4 text-lg">{status}</p>}
            </div>
        </div>
    )
}

export default SendMessageInput;
