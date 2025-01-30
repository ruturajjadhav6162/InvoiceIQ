"use client";
import Link from "next/link";  // Import Link from next/link
import { motion } from "framer-motion";  // Import motion from framer-motion
import AIInfoSlider from './Slider';  // Import AIInfoSlider component
import Image from "next/image";  // Import Image from next/image for optimized image handling

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const LandingSection = () => (
  <section className="bg-gray-50 py-10">
    <AIInfoSlider />
    <motion.div 
      className="max-w-screen-xl mx-auto px-4 py-12 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false , amount: 0.2 }}
      variants={fadeIn}
    >
      <h2 className="text-lg font-semibold text-blue-600">Streamlined Data</h2>
      <h1 className="mt-2 text-2xl md:text-4xl font-bold text-gray-900">
        AI Invoice Data Capture
      </h1>
      <p className="mt-4 text-sm text-gray-700 md:text-lg">
        Streamline your invoice data extraction process with our AI Invoice Parser API. Experience the convenience of automated invoice processing with our advanced AI tool. Our user-friendly API guarantees accurate invoice data capture and smooth data extraction.
      </p>
      <div className="mt-6 flex justify-center space-x-4 ">
        <Link href="/home">
          <motion.span 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer "
          >
            Try Now
          </motion.span>
        </Link>
      </div>
    </motion.div>

    {/* Extract From Anywhere Section */}
    <motion.div 
      className="max-w-screen-xl mx-auto px-4 mt-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false , amount: 0.2 }}
      variants={fadeIn}
    >
      <h2 className="text-lg font-semibold text-blue-600">Extract From Anywhere</h2>
      <h1 className="mt-2 text-2xl md:text-4xl font-bold text-gray-900">
        Extract data from any invoice format
      </h1>
      <p className="mt-4 text-sm text-gray-700 md:text-lg">
        Our AI-powered tool allows you to effortlessly extract data from various document formats.
      </p>
    </motion.div>

    {/* Offer Features Section */}
    <div className="mt-10 max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
      {["pdf.png", "gallery.jpg", "txt.png"].map((src, index) => (
        <motion.div
          key={index}
          className="border-2 border-blue-500 p-6 hover:bg-blue-500 rounded-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false , amount: 0.2 }}
          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
        >
          <h3 className="text-lg font-bold text-gray-800">
            <Image src={`/${src}`} alt="Feature" className="h-14 mx-auto mb-4" width={50} height={50} />
            {["PDF DOCUMENTS", "IMAGES", "TEXT FILES"][index]}
          </h3>
          <p className="text-sm text-gray-600">
            Easily extract data with our AI-powered tool.
          </p>
        </motion.div>
      ))}
    </div>

    {/* Security by Design Section */}
    <motion.div 
      className="mt-16 max-w-screen-xl mx-auto px-4 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false , amount: 0.2 }}
      variants={fadeIn}
    >
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
        <Image src="/secure.webp" alt="Secures" className="h-16 md:h-20 w-16 md:w-20 mx-auto mb-4" width={80} height={80} />
        Security by Design
      </h2>
      <p className="mt-4 text-sm text-gray-700 md:text-lg">
        Our product is built with security at its core.
      </p>
    </motion.div>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {["no.png", "lock.png", "data.png"].map((src, index) => (
        <motion.div
          key={index}
          className="text-center border-2 border-blue-500 p-2 hover:bg-blue-500 rounded-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false , amount: 0.2 }}
          variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
        >
          <h3 className="text-lg font-bold text-gray-800">
            <Image src={`/${src}`} alt="Secures" className="h-12 w-12 mx-auto mb-4" width={50} height={50} />
            {["Data is not used for training", "Fully Encrypted", "Secure Data Storage"][index]}
          </h3>
          <p className="mt-2 text-black">
            {["We will never use your data for training purposes.", "All data is encrypted in transit and at rest.", "Your data is protected against unauthorized access."][index]}
          </p>
        </motion.div>
      ))}
    </div>

    {/* No Training Required Section */}
    <motion.div
      className="max-w-screen-xl mx-auto px-4 mt-20 flex items-center justify-center space-x-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false , amount: 0.2 }}
      variants={fadeIn}
    >
      <div className="flex-shrink-0">
        <Image
          src="/training.webp"
          alt="Ready to Go"
          className="w-32 h-32 object-cover rounded-full"
          width={128}
          height={128}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-blue-600">Ready to Go</h2>
        <h1 className="mt-2 text-2xl md:text-4xl font-bold text-gray-900">
          No Training Required
        </h1>
        <p className="mt-4 text-sm text-gray-700 md:text-lg">
          Begin processing your invoices instantly.
        </p>
      </div>
    </motion.div>
  </section>
);

export default LandingSection;
