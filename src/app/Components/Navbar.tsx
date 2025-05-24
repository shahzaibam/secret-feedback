"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [token, setToken] = useState<string | null>(null);

    //just when the navbar reloads, get the token if it exists
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
            console.log("Token:", storedToken);
        }
    }, []);

    //when doing the log out delete the token and the username 
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        window.location.href = "/";
    };

    return (
        <div className='w-full'>
            <div className='flex justify-between px-20 py-4 items-center'>
                <div>
                    <h1 className='font-mono font-semibold text-2xl'>SECRET FEEDBACK</h1>
                </div>

                <div>
                    <ul className='flex gap-10 items-center'>
                        {[{ label: "Home", href: "/" },
                        { label: "Projects", href: "/projects" },
                        { label: "About", href: "/about" },
                        ].map((item, index) => (
                            <li key={index} className='cursor-pointer hover:text-red-500'>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}

                        {/* CHANGE THE NAVBAR IF EXISTS THE TOKEN */}
                        {!token ? (
                            <>
                                <li>
                                    <Link href="/sign-in">
                                        <button>Sign In</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sign-up">
                                        <button>Sign Up</button>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/send-message">
                                        <button>Send Message</button>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/home-in">
                                        <button>Dashboard</button>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-red-600 hover:underline">
                                        Log Out
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;
