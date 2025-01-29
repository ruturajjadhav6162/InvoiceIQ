"use client"
import Footer from '../components/Footer';
import Header1 from './../components/Header1';
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const DashBoard = () => {
    const [isOpen, setIsOpen] = useState(false);
 return (
    <div className="bg-white">
        <Header1/>
        <header className="p-4 text-black flex items-center justify-between">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </header>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
          
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-50 ${isOpen ? "block" : "hidden"}`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <ul className="mt-10 space-y-4">
          {["Home", "Dashboard", "Logout"].map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-200 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
        <Footer/>
    </div>
 )
}

export default DashBoard;