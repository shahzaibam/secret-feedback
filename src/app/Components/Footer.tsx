import React from 'react'

const Footer = () => {
    return (
        <div className="bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white py-4 mt-8 fixed bottom-0 w-full">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-8">
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} Secret Feedback. All Rights Reserved.</p>
                </div>
                <div className="flex gap-4">
                    <a href="/about" className="text-sm hover:underline">About</a>
                    <a href="/contact" className="text-sm hover:underline">Contact</a>
                    <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
