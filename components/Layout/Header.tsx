"use client"
import { Leaf, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { LogIn, LogOut } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

function Header() {
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { label: "About Us", href: "#about" },
        { label: "Tutorial", href: "#tutorial" },
        { label: "Contact", href: "#footer" },
        { label: "Community", href: "community" },
    ]

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage/20 py-2">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group justify-around">
                        <div className="">
                            <Image
                                src="logo.png"
                                alt="PlantMD Logo"
                                width={64}
                                height={64}
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl sm:text-2xl font-bold font-oswald tracking-wider text-left bg-black bg-clip-text text-transparent">
                                PlantMD
                            </h1>
                        </div>
                    </Link>


                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
                        {navLinks.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="relative group text-gray-600 transition-colors duration-200 hover:text-green-600 font-roboto"
                            >
                                <span className="capitalize">{label}</span>
                                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-green-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <Link
                            href="#"
                            className="relative bg-gray-100 border-2 border-gray-300 text-gray-500 px-4 lg:px-6 py-1 cursor-not-allowed opacity-60 font-roboto overflow-hidden group"
                            onClick={(e) => e.preventDefault()}
                        >
                            <span className="relative z-10">Coming Soon</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 animate-flare"></div>
                        </Link>

                        {session ? (
                            <Button
                                onClick={() => signOut()}
                                className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-roboto text-md"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <Button
                                onClick={() => signIn('google')}
                                className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-roboto text-md"
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Sign In
                            </Button>
                        )}


                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex items-center justify-center w-8 h-8 text-gray-600 hover:text-green-600 transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-12 w-12" />
                        ) : (
                            <Menu className="h-12 w-12" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                    ? 'max-h-96 opacity-100 visible'
                    : 'max-h-0 opacity-0 invisible overflow-hidden'
                    }`}>
                    <div className="py-4 space-y-4 border-t border-sage/20 bg-white/90 backdrop-blur-sm">
                        {/* Mobile Navigation Links */}
                        {navLinks.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={closeMenu}
                                className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 font-roboto"
                            >
                                <span className="capitalize">{label}</span>
                            </Link>
                        ))}

                        {/* Mobile Use App Button */}
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                closeMenu()
                            }}
                            className="block mx-4 bg-gray-100 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed opacity-60 font-roboto text-center relative overflow-hidden group"
                        >
                            <span className="relative z-10">Coming Soon</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 animate-flare"></div>
                        </Link>

                        {/* Mobile Auth Button */}
                        <div className="px-4">
                            {session ? (
                                <Button
                                    onClick={() => {
                                        signOut()
                                        closeMenu()
                                    }}
                                    className="w-full bg-plant-dark hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors font-roboto"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign Out
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        signIn('google')
                                        closeMenu()
                                    }}
                                    className="w-full bg-plant-dark hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors font-roboto"
                                >
                                    <LogIn className="h-4 w-4 mr-2" />
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header