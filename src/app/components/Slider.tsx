import React, { useState, useEffect } from 'react';

const AIInfoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="blue"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 19V6h12v13H6zm0 0L3 12l3-7m12 7l3 7-3 7" />
        </svg>
      ),
      title: "Automating Invoice Extraction",
      text: "AI automates invoice extraction, reducing human error and increasing accuracy.",
      additionalText: "This technology ensures that invoices are processed quickly and correctly, providing efficiency to organizations.",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="blue"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L12 22M2 12L22 12" />
        </svg>
      ),
      title: "Faster Processing",
      text: "AI improves speed by processing invoices faster than manual methods.",
      additionalText: "By automating the process, AI reduces the time required to extract and verify invoice data, improving overall workflow.",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="blue"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Better Decision Making",
      text: "AI enables better decision-making by analyzing invoice data more thoroughly.",
      additionalText: "With AI, data from invoices can be analyzed in-depth, providing valuable insights that help businesses make informed decisions.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="w-full max-w-screen-xl bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
        <div className="mb-6">{slides[currentIndex].svg}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{slides[currentIndex].title}</h2>
        <p className="text-lg font-semibold text-gray-800 mb-2">{slides[currentIndex].text}</p>
        <p className="text-md text-gray-600">{slides[currentIndex].additionalText}</p>
      </div>
    </div>
  );
};

export default AIInfoSlider;
