# InvoiceIQ

## Running Backend Locally

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Start the FastAPI backend:
   ```sh
   uvicorn invoiceIQ:app --host 0.0.0.0 --port 8000--reload
   ```

## Running Streamlit Dashboard Locally

1. Start the Streamlit app:
   ```sh
   streamlit run ./backend/streamlit.py
   ```

## Environment Variables Required for Backend

Ensure the following environment variables are set:

```sh
export GOOGLE_API_KEY="your_google_api_key"
export GROQ_API_KEY="your_groq_api_key"
```

## Running Frontend Locally

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Running the Entire Application with Docker

1. Build and start the application using Docker Compose:
   ```sh
   docker-compose up -d --build
   ```

## Running the Application on Minikube

### 1. Start Minikube
Ensure Minikube is installed and running:
```sh
minikube start
```

### 2. Apply Kubernetes Configurations
```sh
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

### 3. Expose Services via Minikube
Since we are using LoadBalancer services, expose them:
```sh
minikube tunnel
```

Use the generated URLs to access the application.

## Stopping Minikube
To stop and delete Minikube:
```sh
minikube stop
minikube delete
```

