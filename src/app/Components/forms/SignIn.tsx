"use client"
import React, { useState } from 'react';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function userLogin(e: React.FormEvent) {

        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill both fields");
            return
        }

        try {

            const response = await fetch("/api/log-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                toast.success("Logged In! Check your console log");
            } else {
                toast.error(data.message || "Something went wrong");
            }


        } catch (error) {
            toast.error(String(error));
        }


        console.log(email);
        console.log(password)
    }


    return (
        <div className="flex mt-64 items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <Toaster position="top-center" />

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
                <form className="space-y-4" onSubmit={(e) => userLogin(e)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/sign-up" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
