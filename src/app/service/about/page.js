"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  return (

    <div className='bg-white text-black  '>
          <div className='  max-w-screen-2xl py-10 px-5 '>
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
      
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-5  text-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">About Foodie.</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">Delivering Happiness, One Meal at a Time</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className=" max-w-sm md:w-1/2">
              <img
                src='https://media.istockphoto.com/id/511243463/photo/work-surface-and-kitchen-equipment.jpg?s=612x612&w=0&k=20&c=DMmmWGnL-m0qxuT7uhoIHvLZuaIp_5ZdjkRC5WICmuU='
                alt="Our Kitchen"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, FoodFleet began as a small team of food enthusiasts who wanted to
                bridge the gap between busy lifestyles and quality dining. What started as a local
                delivery service in one city has now grown into a trusted platform serving thousands
                of happy customers nationwide.
              </p>
              <p className="text-gray-600">
                We partner with the best local restaurants and professional chefs to bring you
                restaurant-quality meals delivered straight to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🚀 Lightning Fast Delivery</h3>
              <p className="text-gray-600">Average delivery time under 30 minutes</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🍔 Quality Guaranteed</h3>
              <p className="text-gray-600">Fresh ingredients from trusted suppliers</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">❤ Customer First</h3>
              <p className="text-gray-600">24/7 support and satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-rows-1 gap-8">
            {/* Repeat this block for each team member */}
            <div className="text-center">
              <img
                src="https://static9.depositphotos.com/1005893/1150/i/450/depositphotos_11501533-stock-photo-indian-businessman.jpg"
                alt="Team member"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Add more team members */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Taste the Difference?</h2>
          <Link href="/" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg 
            font-semibold hover:bg-black transition-colors">
            Start Ordering Now
          </Link>
        </div>
      </section>
      </div>
      </motion.div>
      </div>
    </div>
  );
}