"use client"
import { Leaf } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { LogIn, LogOut } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'

function Header() {
    const { data: session } = useSession()
    const navLinks = [
        { label: "About Us", href: "#about" },
        { label: "Tutorial", href: "#tutorial" },
        { label: "Contact", href: "#team" },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage/20">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                        <div className="relative">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-forest to-mint rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Leaf className="h-4 w-4 sm:h-5 sm:h-5 text-white" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-forest to-mint rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl sm:text-2xl font-bold font-oswald tracking-wider bg-black bg-clip-text text-transparent">
                                PlantMD
                            </h1>
                        </div>
                    </Link>

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
                            href="/scan"
                            className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-roboto"
                        >
                            Use App
                        </Link>

                        {session ? (
                            <Button
                                onClick={() => signOut()}
                                className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-roboto"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <Button
                                onClick={() => signIn('google')}
                                className="bg-plant-dark hover:bg-gray-800 text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-roboto"
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Sign In
                            </Button>
                        )}
                    </nav>
                </div>
            </div>
        </nav>
    )
}

export default Header