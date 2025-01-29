import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set the GroQ API key
api_key = os.getenv("GROQ_API_KEY")
if api_key is None:
    raise ValueError("GROQ_API_KEY environment variable is not set.")

# Initialize the GroQ client
client = Groq(api_key=api_key)

# Improved prompt asking for structured data extraction
invoice_prompt = """
You are provided with invoice details in plain text. Please extract and return the key information in structured JSON format with key-value pairs. The keys should include: 
Invoice Number, 
Invoice Date, 
Due Date, 
Bill To (with Name, Address), 
Ship To (with Name, Address), 
Items (with fields Quantity, Description, Unit Price, Amount), 
Totals (with Subtotal, Sales Tax, Total). 
Here is the invoice details:
Invoice Number: US-001
Invoice Date: 11/02/2019
Due Date: 26/02/2019
Bill To: John Smith, 2 Court Square, New York, NY 12210
Ship To: John Smith, 3787 Pineview Drive, Cambridge, MA 12210
Items: 
1. Quantity: 1, Description: Front and rear brake cables, Unit Price: $100.00, Amount: $100.00
2. Quantity: 2, Description: New set of pedal arms, Unit Price: $15.00, Amount: $30.00
3. Quantity: 3, Description: Labor 3hrs, Unit Price: $5.00, Amount: $15.00
Totals: Subtotal: $145.00, Sales Tax: $9.06, Total: $154.06
Please return the extracted data in JSON format. Only return the JSON structure, no additional text.
"""

# Make the request to the API with the structured prompt
try:
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": invoice_prompt}],
        model="llama-3.3-70b-versatile",
    )

    # Print the raw response
    print("GroQ Response:")
    print(chat_completion)

    # Extract the response content (assuming it is in JSON format)
    response_content = chat_completion.choices[0].message.content

    # Try to parse the content as JSON
    try:
        invoice_data = json.loads(response_content)
        print("Structured Invoice Data:")
        print(invoice_data)
    except json.JSONDecodeError:
        print("The response is not valid JSON. Here is the raw response:")
        print(response_content)

except Exception as e:
    print(f"Error: {e}")
