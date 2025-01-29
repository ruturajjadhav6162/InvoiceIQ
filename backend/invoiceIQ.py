from fastapi import FastAPI, UploadFile, File, Form
import os
import json
from groq import Groq
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set the GroQ API key and Gemini API key
groq_api_key = os.getenv("GROQ_API_KEY")
gemini_api_key = os.getenv("GEMINI_API_KEY")

# Configure Gemini with the provided API key
genai.configure(api_key=gemini_api_key)

# Initialize the GroQ client with the correct key
groq_client = Groq(api_key=groq_api_key)

app = FastAPI()

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
    """Pass JSON invoice data to Groq and get CSV-formatted text."""
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

@app.post("/upload-invoice/")
async def upload_invoice(file: UploadFile = File(...), input_text: str = ''):
    """Receive invoice image file, process, and return CSV."""
    try:
        # Read the uploaded image file
        image_data = await file.read()

        # Process the image data to extract text from the invoice using Gemini
        input_prompt = "Extract all key information from this invoice image and answer the user's query."
        response_text = get_gemini_response(input_text, [{"mime_type": file.content_type, "data": image_data}], input_prompt)
        
        # Extract structured JSON using Groq
        invoice_metadata = send_to_groq_llm(response_text)

        # Convert JSON to CSV using Groq
        csv_data = convert_json_to_csv_with_groq(invoice_metadata)

        # Send CSV as a file response
        return Response(csv_data, media_type="text/csv",
                        headers={"Content-Disposition": "attachment; filename=invoice.csv"})

    except Exception as e:
        return {"error": str(e)}

@app.post("/query-invoice/")
async def query_invoice(question: str = Form(...), file: UploadFile = File(...)):
    """Query the invoice and get the response."""
    try:
        # Read the uploaded image file
        image_data = await file.read()

        # Process the image data to extract text from the invoice using Gemini
        input_prompt = "Extract all key information from this invoice image and answer the user's query.Only respond to what the user has asked"
        response_text = get_gemini_response(question, [{"mime_type": file.content_type, "data": image_data}], input_prompt)
        
        return {"answer": response_text}

    except Exception as e:
        return {"error": str(e)}