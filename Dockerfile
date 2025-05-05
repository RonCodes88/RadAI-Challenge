# ---- Base Python image for FastAPI backend ----
FROM python:3.11-slim AS backend

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and CSV
COPY server.py .
COPY Mobile_Food_Facility_Permit.csv .

# ---- Node image for Next.js frontend ----
FROM node:20-alpine AS frontend

WORKDIR /app

# Copy frontend files
COPY food-facilities-ui ./food-facilities-ui

# Install dependencies and build Next.js app
WORKDIR /app/food-facilities-ui
RUN npm install
RUN npm run build

# ---- Final image ----
FROM python:3.11-slim

WORKDIR /app

# Copy backend from backend stage
COPY --from=backend /app/server.py .
COPY --from=backend /app/Mobile_Food_Facility_Permit.csv .
COPY --from=backend /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy frontend build from frontend stage
COPY --from=frontend /app/food-facilities-ui/.next ./food-facilities-ui/.next
COPY --from=frontend /app/food-facilities-ui/public ./food-facilities-ui/public
COPY --from=frontend /app/food-facilities-ui/package.json ./food-facilities-ui/package.json
COPY --from=frontend /app/food-facilities-ui/next.config.ts ./food-facilities-ui/next.config.ts

# Install Node.js for serving Next.js
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Install serve for static Next.js
RUN npm install -g serve

# Expose ports
EXPOSE 8000 3000

# Start both backend and frontend
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port 8000 & cd food-facilities-ui && npx next start -p 3000 && wait"]