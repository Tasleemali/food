import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "../ui/button"

export default function Footer() {
  return (
    <footer className="bg-black py-10">
        <div className="mx-auto max-w-screen-xl px-4">

       
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-5xl font-bold  text-orange-500">Foodie.</h3>
            <p className="text-gray-300">
              Delivering delicious food to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-gray-500">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-gray-500">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-300">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">Menu</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">Contact</a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-300">Contact Us</h4>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-300" />
              <p className="text-gray-300">contact@foodie.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-300" />
              <p className="text-gray-300">(123) 456-7890</p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-300" />
              <p className="text-gray-300">123 Foodie Street, Mumbai, India</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-300">
          &copy; {new Date().getFullYear()} Foodie. All rights reserved.
        </div>
      </div>
      </div>
    </footer>
  )
}