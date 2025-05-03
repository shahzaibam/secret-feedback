import React from 'react'

function Benefit() {
    return (
        <div className="mt-16 py-28 bg-zinc-100 dark:bg-zinc-800">
            <div className="text-center max-w-4xl mx-auto px-4 sm:px-8">
                <h2 className="text-3xl sm:text-4xl font-semibold mb-20">Why Choose Secret Feedback?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white dark:bg-zinc-700 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Privacy</h3>
                        <p>Receive honest feedback without the fear of judgment. Stay anonymous for both senders and receivers.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-zinc-700 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Growth</h3>
                        <p>Constructive feedback helps you grow, improve, and become better at what you do.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-zinc-700 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">AI Suggestions</h3>
                        <p>Get AI-powered suggestions for improving your feedback and making your messages more effective.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Benefit