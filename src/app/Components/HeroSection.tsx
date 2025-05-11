import React from 'react'
import Link from 'next/link'

function HeroSection() {
    return (
        <div className="text-black dark:text-white flex flex-col justify-center mt-64">
            <div className="relative z-10 text-center px-4 sm:px-8">
                <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-4">
                    Get Anonymous Feedback & Grow
                </h1>
                <p className="text-xl sm:text-2xl mb-8">
                    Secret Feedback allows you to receive constructive anonymous feedback that helps you improve.
                </p>

                <div className="flex justify-center gap-6 mb-8">
                    <Link
                        href="/sign-up"
                        className="bg-yellow-500 text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
                    >
                        Sign Up
                    </Link>
                    <Link
                        href="/sign-in"
                        className="bg-transparent border-2 border-white text-black dark:text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition duration-300"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeroSection