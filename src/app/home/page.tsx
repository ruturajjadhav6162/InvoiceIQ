"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Header1 from "./../components/Header1";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import EducationalSection from "../components/EducationalSection";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTime, setProcessingTime] = useState(2);
  const [showButtons, setShowButtons] = useState(false);
  const [showChat, setShowChat] = useState(false); // State for chat visibility
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [userMessage, setUserMessage] = useState("");

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileContent(event.target.result);
        }
      };

      if (selectedFile.type.startsWith("image")) {
        reader.readAsDataURL(selectedFile);
      } else {
        reader.readAsText(selectedFile);
      }
    }
  };

  const handleProcessFile = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowButtons(true);
      setShowChat(true);
    }, processingTime * 1000);
  };

  const handleExportExcel = () => {
    if (file) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
    }
  };

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { role: "user", text: userMessage }]);
    setUserMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, fileContent }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { role: "bot", text: data.reply }]);
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

      <EducationalSection />

      <section className="flex justify-center items-center flex-grow mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-black">Upload a File</h2>
          <p className="text-gray-600 mb-6">Choose a file (Image, PDF, or TXT) to display it below.</p>

          <input type="file" onChange={handleFileChange} accept="image/*,.pdf,.txt" className="border p-2 mb-4 w-full text-gray-800" />

          {file && fileType && (
            <div className="mt-6">
              {fileType.startsWith("image") && fileContent ? (
                <img src={fileContent as string} alt="Uploaded" className="h-80 w-80 object-contain mx-auto mb-4 " />
              ) : fileType === "application/pdf" && fileContent ? (
                <embed src={fileContent as string} type="application/pdf" width="100%" height="400px" />
              ) : fileType === "text/plain" && fileContent ? (
                <pre className="bg-gray-100 p-4 text-gray-700 rounded">{fileContent as string}</pre>
              ) : null}
            </div>
          )}

          {file && !isProcessing && !showButtons && (
            <button onClick={handleProcessFile} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
              Process File
            </button>
          )}

          {isProcessing && (
            <p className="text-lg text-green-500 font-bold mt-4">Processing your file...</p>
          )}

          {showButtons && (
            <div className="mt-4">
              <button onClick={handleExportExcel} className="mr-4 bg-green-500 text-white px-4 py-2 rounded-md">
                Export as Excel
              </button>
              <button onClick={() => router.push("/dashboard")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                View here
              </button>
            </div>
          )}

{showChat && (
  <div className="mt-6 border-t pt-4">
    {/* Input Section at the Top */}
    <h3 className="text-lg font-semibold text-black mb-2">Ask a Question</h3>
    <input
      type="text"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
      placeholder="Ask a question..."
      className="border p-2 w-full rounded-md text-black"
    />
    <button
      onClick={() => {
        setMessages([]); 
        sendMessage();
      }}
      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Send
    </button>

    {/* Answer Section */}
    {messages.length > 0 && (
      <div className="mt-4 border p-4 h-40 overflow-y-auto bg-gray-50 rounded-md">
        <p className="text-black text-start">
          <strong> </strong>{messages[messages.length - 1].text}
        </p>
      </div>
    )}
  </div>
)}

        </div>
      </section>
       <div className="h-12"/>
      <Footer />
    </div>
  );
}
