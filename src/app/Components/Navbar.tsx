import React from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-between px-20 py-4 items-center'>
                <div>
                    <h1 className='font-mono font-semibold text-2xl'>SECRET FEEDBACK</h1>
                </div>

                <div>
                    <ul className='flex gap-10 items-center'>
                        {[
                            { label: "Services", href: "/services" },
                            { label: "Projects", href: "/projects" },
                            { label: "About", href: "/about" },
                        ].map((item, index) => (
                            <li key={index} className='cursor-pointer hover:text-red-500'>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}

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
                    </ul>
                </div>

                <ThemeToggle />
            </div>
        </div>
    )
}

export default Navbar
