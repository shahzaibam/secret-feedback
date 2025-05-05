"use client"
import React, { useState } from 'react';

const SignUp = () => {

    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    function createAccount(e) {

        e.preventDefault();

        const user = {
            fullname,
            email,
            confirmPassword
        }

        console.log(user)

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }


    return (
        <div className="flex mt-64 items-center justify-center bg-gradient-to-r px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form className="space-y-4" onSubmit={(e) => createAccount(e)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/sign-in" className="text-blue-600 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
