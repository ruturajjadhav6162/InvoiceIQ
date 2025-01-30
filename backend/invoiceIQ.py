from fastapi import FastAPI, UploadFile, File, Response, Form
import os
import json
import pdfplumber  # To extract text from PDFs
import google.generativeai as genai
from groq import Groq
from dotenv import load_dotenv
from io import BytesIO, StringIO
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Set the API keys
groq_api_key = os.getenv("GROQ_API_KEY")
gemini_api_key = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=gemini_api_key)

# Initialize GroQ client
groq_client = Groq(api_key=groq_api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_gemini_response(input_text, image, prompt):
    """Generate content from Gemini AI."""
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([input_text, image[0], prompt])
    return response.text

def send_to_groq_llm(raw_text):
    """Extract structured JSON invoice data from text using Groq."""
    invoice_prompt = f"""
    You are provided with the following invoice details in plain text. Please extract and return the key information as a valid JSON object. 
    Identify all relevant fields such as Invoice Number, Date, Due Date, Bill To, Ship To, Items, Amounts, Totals, etc.
    Ensure the output is a valid JSON object, NOT a string containing JSON.
    Here is the invoice text:
    {raw_text}
    Return only the JSON, without any explanations or additional text.
    """
    chat_completion = groq_client.chat.completions.create(
        messages=[{"role": "user", "content": invoice_prompt}],
        model="llama-3.3-70b-versatile",
    )
    response_content = chat_completion.choices[0].message.content.strip()
    return response_content 

def convert_json_to_csv_with_groq(invoice_data):
    """Convert JSON invoice data to CSV format using Groq."""
    csv_prompt = f"""
    Here is a structured JSON invoice data:

    {json.dumps(invoice_data, indent=2)}

    Convert this data into a CSV format. Provide only the CSV output, do not include any explanations.
    """
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": csv_prompt}],
            model="llama-3.3-70b-versatile",
        )
        csv_data = chat_completion.choices[0].message.content.strip()
        return csv_data
    except Exception as e:
        return f"Error: {str(e)}"

def convert_csv_to_excel_with_groq(csv_data):
    """Convert CSV invoice data to an Excel file using pandas."""
    try:
        csv_io = StringIO(csv_data)
        df = pd.read_csv(csv_io)
        excel_buffer = BytesIO()
        df.to_excel(excel_buffer, index=False, engine='openpyxl')
        excel_buffer.seek(0)
        return excel_buffer
    except Exception as e:
        return f"Error: {str(e)}"

def extract_text_from_pdf(pdf_bytes):
    """Extract text from a PDF file."""
    try:
        pdf_text = ""
        with pdfplumber.open(BytesIO(pdf_bytes)) as pdf:
            for page in pdf.pages:
                pdf_text += page.extract_text() + "\n" if page.extract_text() else ""
        return pdf_text.strip() if pdf_text else "No text found in PDF."
    except Exception as e:
        return f"Error extracting text from PDF: {str(e)}"

@app.post("/upload-invoice/")
async def upload_invoice(file: UploadFile = File(...), input_text: str = ''):
    """Receive invoice (PDF/Image), process, and return CSV."""
    try:
        file_extension = file.filename.split(".")[-1].lower()

        if file_extension == "pdf":
            # Extract text from PDF
            pdf_bytes = await file.read()
            response_text = extract_text_from_pdf(pdf_bytes)
        else:
            # Read image file and process using Gemini
            image_data = await file.read()
            input_prompt = "Extract all key information from this invoice image."
            response_text = get_gemini_response(input_text, [{"mime_type": file.content_type, "data": image_data}], input_prompt)

        # Extract structured JSON using Groq
        invoice_metadata = send_to_groq_llm(response_text)

        # Convert JSON to CSV using Groq
        csv_data = convert_json_to_csv_with_groq(invoice_metadata)

        # Convert CSV to Excel
        excel_buffer = convert_csv_to_excel_with_groq(csv_data)

        return Response(
            excel_buffer.getvalue(), 
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": "attachment; filename=invoice.xlsx"}
        )
    except Exception as e:
        return {"error": str(e)}

@app.post("/query-invoice/")
async def query_invoice(question: str = Form(...), file: UploadFile = File(...)):
    """Query the invoice (PDF/Image) and get the response."""
    try:
        file_extension = file.filename.split(".")[-1].lower()

        if file_extension == "pdf":
            # Extract text from PDF
            pdf_bytes = await file.read()
            response_text = extract_text_from_pdf(pdf_bytes)
            query_prompt = f"""
            Here is the extracted invoice information:
            {response_text}
        
            Answer the following user question based on the provided invoice data:
            {question}
            """
        
            chat_completion = groq_client.chat.completions.create(
                messages=[{"role": "user", "content": query_prompt}],
                model="llama-3.3-70b-versatile",
            )

            response_text = chat_completion.choices[0].message.content.strip()
        else:
            # Read image file and process using Gemini
            image_data = await file.read()
            input_prompt = "Extract all key information from this invoice image and answer the user's query."
            response_text = get_gemini_response(question, [{"mime_type": file.content_type, "data": image_data}], input_prompt)

        return {"answer": response_text}
    except Exception as e:
        return {"error": str(e)}
