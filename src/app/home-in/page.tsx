"use client";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import MessageAcceptanceToggle from "../Components/MessageAcceptanceToggle";

const HomeIn = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) setUsername(storedName);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="text-center mt-20">
                <h1 className="text-xl font-bold">Bienvenido, {username}!</h1>
                {username && <MessageAcceptanceToggle username={username} />}
            </div>
        </div>
    );
};

export default HomeIn;
