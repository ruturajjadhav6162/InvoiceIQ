"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Header1 from "./../components/Header1";
import Footer from "../components/Footer";
import EducationalSection from "../components/EducationalSection";
import Image from "next/image"; // Import Image from Next.js

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [csvData, setCsvData] = useState<Blob | null>(null);
  const [question, setQuestion] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
    }
  };

  const handleProcessFile = async () => {
    if (!file) return;

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", file); // Append the file to be uploaded

    try {
      const response = await fetch("http://localhost:8000/upload-invoice/", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.blob();
        setCsvData(data); // Store the CSV data to be downloaded
        setIsProcessing(false);
        setShowButtons(true);
        setShowChat(true);
      } else {
        setIsProcessing(false);
        console.error("Error processing the file");
      }
    } catch (error) {
      setIsProcessing(false);
      console.error("Error:", error);
    }
  };

  const handleExportCsv = () => {
    if (csvData) {
      const url = URL.createObjectURL(csvData);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.xlsx";
      link.click();
    }
  };

  const sendMessage = async () => {
    if (!question.trim()) return;
  
    setMessages((prevMessages) => [...prevMessages, { role: "user", text: question }]);
  
    if (!file) {
      console.error("No image file selected.");
      return;
    }
  
    // Prepare the FormData to send both the question and the image file
    const formData = new FormData();
    formData.append("question", question);
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:8000/query-invoice/", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { role: "bot", text: data.answer }]);
      setQuestion("");  // Clear the input after sending
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">
      <Header1 />
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

      <nav className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-50 ${isOpen ? "block" : "hidden"}`}>
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6 text-gray-600" />
        </button>
        <ul className="mt-10 space-y-4">
          {["Home", "Logout"].map((item, index) => (
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

      <EducationalSection />

      <section className="flex justify-center items-center flex-grow mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-black">Upload a File</h2>
          <p className="text-gray-600 mb-6">Choose an invoice image (JPG, PNG) to extract its data.</p>

          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="border p-2 mb-4 w-full text-gray-800"
          />

          {file && fileType && (
            <div className="mt-6">
              {fileType.startsWith("image") && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  className="h-80 w-80 object-contain mx-auto mb-4"
                  width={320}
                  height={320}
                />
              )}
            </div>
          )}

          {file && !isProcessing && !showButtons && (
            <button
              onClick={handleProcessFile}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Process File
            </button>
          )}

          {isProcessing && (
            <p className="text-lg text-green-500 font-bold mt-4">Processing your file...</p>
          )}

          {showButtons && (
            <div className="mt-4">
              <button onClick={handleExportCsv} className="mr-4 bg-green-500 text-white px-4 py-2 rounded-md">
                Download Excel File
              </button>
            </div>
          )}

          {showChat && (
            <div className="mt-6 border-t pt-4">
              {/* Input Section for the question */}
              <h3 className="text-lg font-semibold text-black mb-2">Ask a Question about the Invoice</h3>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                className="border p-2 w-full rounded-md text-black"
              />
              <button
                onClick={sendMessage}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>

              {/* Answer Section */}
              {messages.length > 0 && (
                <div className="mt-4 border p-4 h-40 overflow-y-auto bg-gray-50 rounded-md">
                  <p className="text-black">{messages[messages.length - 1].text}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
