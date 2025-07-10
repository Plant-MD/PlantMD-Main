import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Leaf, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">PlantMD</span>
            </Link>
            <p className="text-gray-500">
              Diagnose plant diseases instantly and get reliable treatment methods.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
             <Link href="/#faq" className="text-base text-gray-500 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-base text-gray-500">connect@plantmd.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-base text-gray-500">+977 9800000000</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Newsletter</h3>
            <p className="mt-4 text-base text-gray-500">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <Input
                type="email"
                name="email"
                id="email"
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <Button
                  type="submit"
                  className="w-full bg-green-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-green-700"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
          </div>
<p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} PlantMD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;