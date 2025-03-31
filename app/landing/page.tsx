'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-neutral-800">

            {/* HERO */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Discover Events & Meet People</h2>
                <p className="text-lg sm:text-xl text-neutral-500 max-w-xl mb-6">
                    Whether you&apos;re new in town or just want to go out, GoOut helps you find great places and people near you.
                </p>
                <Link href="/register">
                    <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 transition">
                        Join the Community
                    </Button>
                </Link>
            </section>

            {/* FEATURES */}
            <section className="bg-neutral-50 py-16">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <FeatureCard
                        icon={<MapPin className="h-10 w-10 text-indigo-600 mx-auto mb-4" />}
                        title="Find Great Spots"
                        description="Explore bars, cafes, parks, and local gems near you."
                    />
                    <FeatureCard
                        icon={<Users className="h-10 w-10 text-indigo-600 mx-auto mb-4" />}
                        title="Meet New People"
                        description="Connect with others who share your interests and vibe."
                    />
                    <FeatureCard
                        icon={<Calendar className="h-10 w-10 text-indigo-600 mx-auto mb-4" />}
                        title="Join Events"
                        description="Attend or host events, hangouts and experiences in your area."
                    />
                </div>
            </section>

            {/* STEPS */}
            <section className="bg-white py-16">
                <div className="max-w-5xl mx-auto text-center px-6 space-y-10">
                    <h2 className="text-3xl font-bold">How it works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <StepItem
                            title="1. Create Your Account"
                            description="Sign up in seconds and set your vibe and preferences."
                        />
                        <StepItem
                            title="2. Discover & Explore"
                            description="Use the interactive map and filters to explore local spots."
                        />
                        <StepItem
                            title="3. Connect & Enjoy"
                            description="Meet people, join events and enjoy your city like never before."
                        />
                    </div>
                </div>
            </section>

            {/* UI PREVIEW */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
                    <h2 className="text-3xl font-bold">See how it works</h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                        GoOut&apos;s clean interface lets you explore events on the map and connect instantly.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        {/* Fake MAP preview */}
                        <div className="w-full md:w-1/2 bg-neutral-100 rounded-lg p-4 border shadow-sm">
                            <div className="rounded-md overflow-hidden">
                                <Image
                                    src="/map-landing.png"
                                    alt="Map preview"
                                    width={600}
                                    height={250}
                                    className="w-full h-[200px] object-cover rounded-md"
                                />
                            </div>

                        </div>

                        {/* Fake CARD preview */}
                        <div className="w-full md:w-1/2 bg-neutral-100 rounded-lg p-4 border shadow-sm">
                            <div className="bg-white p-4 rounded-md border shadow-sm text-left space-y-2">
                                <h3 className="text-lg font-semibold">Sunset Rooftop Party</h3>
                                <p className="text-sm text-neutral-500">📍 Downtown Bar · 🗓️ Apr 6</p>
                                <p className="text-sm text-neutral-500">👥 34 participants</p>
                                <Button className="mt-3">View Event</Button>
                            </div>
                            <p className="text-sm mt-2 text-neutral-500">What an event card looks like</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-neutral-50 py-16">
                <div className="max-w-5xl mx-auto text-center px-6 space-y-10">
                    <h2 className="text-3xl font-bold">What users are saying</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Testimonial
                            name="Alex M."
                            quote="I moved to a new city and found awesome people through GoOut. It's like Meetup but better!"
                        />
                        <Testimonial
                            name="Andreea R."
                            quote="Finally an app that helps you go out and actually enjoy your free time. Super intuitive!"
                        />
                        <Testimonial
                            name="David P."
                            quote="I discovered cool places in my area that I didn't even know existed. 10/10 would recommend!"
                        />
                    </div>
                </div>
            </section>



            {/* CTA Final */}
            <section className="bg-indigo-600 text-white py-12">
                <div className="text-center max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-4">Ready to start exploring?</h2>
                    <p className="text-lg mb-6">Join GoOut today and never spend a night bored again.</p>
                    <Link href="/register">
                        <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-neutral-100">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center text-sm text-neutral-400 py-6">
                &copy; {new Date().getFullYear()} GoOut. All rights reserved.
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div>
            {icon}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-neutral-500">{description}</p>
        </div>
    );
}

function StepItem({ title, description }: { title: string; description: string }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-neutral-500">{description}</p>
        </div>
    );
}

function Testimonial({ name, quote }: { name: string; quote: string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border text-left">
            <p className="text-neutral-600 italic">&quot;{quote}&quot;</p>
            <p className="mt-4 font-semibold text-neutral-800">– {name}</p>
        </div>
    );
}

