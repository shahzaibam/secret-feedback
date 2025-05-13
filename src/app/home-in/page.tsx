"use client";
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

const HomeIn = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) setUsername(storedName);
    }, []);

    return (
        <div>
            <Navbar />
            <h1 className="text-xl font-bold">Bienvenido, {username}!</h1>
        </div>
    );
};

export default HomeIn;
