import React from 'react'
import Navbar from './Navbar'
import Benefit from './Benefit'
import HeroSection from './HeroSection'
import Footer from './Footer'

function Home() {
    return (
        <div className='bg-white text-black dark:bg-zinc-900 dark:text-white w-full h-screen transition-colors duration-300'>
            <Navbar />
            <HeroSection />
            <Benefit />
            <Footer />



        </div>
    )
}

export default Home
