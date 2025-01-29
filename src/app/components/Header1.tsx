import Link from 'next/link';

const Header1 = () => (
  <header className="bg-white shadow-md">
    <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center ">
      {/* Logo/Name */}
      <h1 className="text-2xl font-bold text-gray-800">
        <Link href="/"><img src="/logo.png" alt="InvoiceIQ.ai" className=" h-6 w-25 md:w-40 md:h-8" /></Link>
      </h1>

      {/* Login and Sign Up buttons */}
      <div className="flex flex-row space-x-4 border-2 border-gray-300 w-48 md:w-60">
        <img src="/John.jpg" alt="" className='h-8 w-6 md:h-10 md:w-10 mt-1 md:mt-0 ml-1'/>
        <div className='flex-row text-black ml-2 text-sm md:text-md'>
          <p>John Doe</p>
          <p>johndoe@gmail.com</p>

        </div>
      </div>
    </div>
  </header>
);

export default Header1;
