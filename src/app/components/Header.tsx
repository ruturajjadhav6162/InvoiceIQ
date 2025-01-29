// components/Header.js
import Link from 'next/link';

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center ">
      {/* Logo/Name */}
      <h1 className="text-2xl font-bold text-gray-800">
        <Link href="/"><img src="/logo.png" alt="InvoiceIQ.ai" className=" h-6 w-25 md:w-40 md:h-8" /></Link>
      </h1>

      {/* Login and Sign Up buttons */}
      <div className="flex space-x-4 ">
        <Link href="/login">
          <div className="px-4 py-3 bg-blue-600 text-white rounded-3xl hover:bg-black cursor-pointer">
            Login
          </div>
        </Link>
        <Link href="/signup">
          <div className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-md hover:bg-black hover:border-black hover:text-white cursor-pointer">
            Sign Up
          </div>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
