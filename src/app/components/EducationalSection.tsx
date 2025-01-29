import { motion } from 'framer-motion';

const EducationalSection: React.FC = () => {
  return (
    <motion.section
      className="bg-gray-100 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Get your Invoice Data Extracted in 3 Easy Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4V1m0 3h7a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h7V1"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Your File</h3>
            <p className="text-gray-600 text-center">
              Choose a file (PDF, Image, or TXT) to start the process. Simple as that!
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17V3l-4 4M3 7l4 4M21 13v6a2 2 0 01-2 2h-6v2h6a4 4 0 004-4v-6a4 4 0 00-4-4h-6V7h6a2 2 0 012 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload the File</h3>
            <p className="text-gray-600 text-center">
              Upload the selected file to our platform to start the extraction process.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Extraction & Actions</h3>
            <p className="text-gray-600 text-center">
              Our AI will extract the information, and you can either download the data as Excel or view it in the dashboard.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EducationalSection;
