import React from 'react'
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href='/' className='logo'>
                    <Image src='/icons/logo.png' alt='logo' width={24} height={24} />
                    <p>DevArena</p>
                </Link>
                <ul>
                    <Link href='/'>Home</Link>
                    <Link href='/event'>Events</Link>
                    <Link href='/create_event'>Create Event</Link>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar
