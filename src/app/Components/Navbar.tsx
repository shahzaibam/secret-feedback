import React from 'react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-between px-20 py-4 items-center'>
                <div>
                    <h1 className='font-mono font-semibold text-2xl'>SECRET FEEDBACK</h1>
                </div>

                <div >
                    <ul className='flex gap-10'>
                        {["Services", "Projects", "About"].map((item, index) => {
                            return <li className='cursor-pointer hover:text-red-500 ' key={index}>
                                {item}
                            </li>
                        })}


                        <button>Sign In</button>
                        <button>Register</button>
                    </ul>

                </div>




                <ThemeToggle />
            </div>
        </div>
    )
}

export default Navbar