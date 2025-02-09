"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  Card,
CardTitle,
CardDescription,
CardFooter,
  CardContent,
  CardHeader

} from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"

   import { motion } from 'framer-motion'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission (e.g., send data to a server)
    console.log( formData)
    setFormData({
      name: '',
      email: '',
      message: '',
    })
    alert('Thank you for your message!')
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-10 p-4">
      <Card className="w-full bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="bg-orange-400 hover:bg-orange-600 text-white">
                Send Message
              </Button>
            </form>
          </motion.div>
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-orange-400" />
              <div>
                <p className="font-semibold text-gray-700">Address</p>
                <p className="text-gray-500">123 Food Street, City, Country</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-orange-400" />
              <div>
                <p className="font-semibold text-gray-700">Phone</p>
                <p className="text-gray-500">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-orange-400" />
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-500">contact@fooddelivery.com</p>
              </div>
            </div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48">
                     <iframe src='https://www.google.com/maps/dir/19.3983423,73.366045/19.2126564,72.9767487/@19.2106715,72.948723,12.29z?entry=ttu&g_ep=EgoyMDI1MDEyOC4wIKXMDSoASAFQAw%3D%3D'>

                     </iframe>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
