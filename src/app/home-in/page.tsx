"use client";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import MessageAcceptanceToggle from "../Components/MessageAcceptanceToggle";

const HomeIn = () => {
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) {
            setUsername(storedName);

            // Cargar los mensajes de este usuario
            fetch(`/api/get-messages?username=${storedName}`)
                .then(async res => {
                    const text = await res.text();
                    try {
                        const data = JSON.parse(text);
                        if (data.success) {
                            setMessages(data.messages);
                        } else {
                            console.error("API error:", data.message);
                        }
                    } catch {
                        console.error("Not JSON:", text); // Aquí verás si se está devolviendo HTML
                    }
                })
                .catch(err => console.error("Fetch error:", err))
                .finally(() => setLoading(false));

        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="text-center mt-20">
                <h1 className="text-xl font-bold">Welcome back, {username}!</h1>

                {username && <MessageAcceptanceToggle username={username} />}

                <div className="mt-10 max-w-xl mx-auto text-left">
                    <h2 className="text-lg font-semibold mb-2">Your Messages</h2>

                    {loading && <p>Loading...</p>}

                    {!loading && messages.length === 0 && (
                        <p className="text-gray-500">You have no messages yet.</p>
                    )}

                    {!loading && messages.map((msg: any, index: number) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-4 my-2 border"
                        >
                            <p className="text-gray-800">{msg.content}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {new Date(msg.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default HomeIn;
