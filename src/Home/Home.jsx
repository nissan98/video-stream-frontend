import React from 'react'
import Navbar from '../NavBar/NavBar'
import FeatureCard from '../FeatureCard/FeatureCard'
import { Link } from 'react-router-dom'




export default function Home() {


    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 flex flex-col to-gray-950  relative  ">


            <div className='w-full sticky top-0 z-30 '>
                <Navbar />
            </div>
            {/* Decorative blurred circles */}


            <main className="pt-28 pb-5 sm:pt-1 sm flex-1 flex flex-col items-center justify-center px-4 relative z-10 overflow-hidden">
                <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-blue-900 rounded-full blur-3xl opacity-20 z-[100]"></div>

                <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-blue-700 rounded-full blur-2xl opacity-10 z-0"></div>

                <h1 className="text-5xl md:text-6xl font-extrabold text-blue-200 mb-4 text-center drop-shadow-xl tracking-tight md:mb-10">
                    Welcome to <span className="text-blue-500">VStream</span>
                </h1>
                <p className="text-xl text-gray-300 mb-10 text-center max-w-2xl drop-shadow">
                    Effortlessly upload, manage, and share your videos with a beautiful, modern interface. Experience seamless streaming and a vibrant community.
                </p>
                <Link
                    to={"/uploadVideo"}
                    className="px-4 sm:px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white  py-3 rounded-2xl font-bold text-xl shadow-xl transition-all duration-200 mb-12"
                >
                    Upload Your First Video
                </Link>
                {/* Features Section */}
                <section className="mb-2 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 md:mb-20">
                    <FeatureCard
                        icon={
                            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1.382a2 2 0 001.447 1.342L9 10m6 0v4m0 0l-6 3m6-3l-6-3" />
                            </svg>
                        }
                        title="Fast Uploads"
                        desc="Upload large videos quickly and securely with our optimized uploader."
                    />
                    <FeatureCard
                        icon={
                            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        }
                        title="Secure & Private"
                        desc="Your videos are encrypted and privacy is our top priority."
                    />
                    <FeatureCard
                        icon={
                            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1.382a2 2 0 001.447 1.342L9 10m6 0v4m0 0l-6 3m6-3l-6-3" />
                            </svg>
                        }
                        title="HD Streaming"
                        desc="Enjoy smooth, high-definition streaming on any device, anywhere."
                    />
                </section>
            </main>
            {/* Footer */}
            <footer className="w-full bg-gray-950/80 border-t border-gray-800 py-6 flex flex-col md:flex-row items-center justify-between px-8 z-20">
                <span className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} VStream. All rights reserved.</span>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition">Terms</a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition">Contact</a>
                </div>
            </footer>
        </div>

    )
}
