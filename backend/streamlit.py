import streamlit as st
import requests

# Streamlit App Initialization
st.set_page_config(page_title="GroQ Invoice Parser")
st.header("Invoice Information Extractor with GroQ LLM")

# File uploader for the invoice image
uploaded_file = st.file_uploader("Choose an invoice image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    if st.button("Extract Information and Download CSV"):
        try:
            # Send the uploaded file and input text to FastAPI
            files = {"file": (uploaded_file.name, uploaded_file.getvalue(), uploaded_file.type)}

            # Make a POST request to FastAPI endpoint for invoice extraction
            response = requests.post("http://127.0.0.1:8000/upload-invoice/", files=files, data=data)

            if response.status_code == 200:
                # If response is successful, provide a download button for CSV
                st.success("Download your extracted CSV below.")
                st.download_button(
                    label="Download CSV",
                    data=response.content,
                    file_name="invoice.csv",
                    mime="text/csv"
                )
            else:
                st.error(f"Error: {response.json().get('error', 'An error occurred')}")
        except Exception as e:
            st.error(f"Error: {str(e)}")
    
    # Query Section
    question = st.text_input("Ask a question about the invoice:")

    if question:
        try:
            # Send the question to FastAPI
            files = {"file": (uploaded_file.name, uploaded_file.getvalue(), uploaded_file.type)}
            response = requests.post("http://127.0.0.1:8000/query-invoice/", files=files, data={"question": question})

            if response.status_code == 200:
                st.write("Answer: ", response.json().get('answer', 'No answer provided'))
            else:
                st.error(f"Error: {response.json().get('error', 'An error occurred')}")
        except Exception as e:
            st.error(f"Error: {str(e)}")
