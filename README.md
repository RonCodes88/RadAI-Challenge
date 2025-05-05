# RadAI-Challenge
# SF Food Truck Finder (Backend Focused, but I also built an UI)

## Description

This project is a full-stack web application for searching and discovering food trucks in San Francisco. The backend is built with FastAPI and serves endpoints to search food trucks by applicant name, street, or proximity to a location, using data from the official SF Mobile Food Facility Permit CSV. The frontend is a modern, responsive Next.js app styled with Tailwind CSS, providing a beautiful and interactive user experience.

## Problem and Solution

**Problem:**  
San Francisco has hundreds of mobile food vendors, but finding a specific truck or discovering what's nearby is difficult for residents and visitors. The city provides open data, but it's not user-friendly for the general public.

**Solution:**  
This project provides a fast, searchable API and a visually appealing web interface to:
- Search food trucks by applicant (vendor) name
- Search by street or address
- Find the nearest food trucks to a given location

## Technical & Architectural Decisions

- **FastAPI** was chosen for its speed, modern Python async support, and automatic OpenAPI documentation.
- **Next.js** was selected for the frontend for its performance, developer experience, and easy integration with React and Tailwind CSS.
- **Tailwind CSS** enables rapid, consistent, and responsive UI development.
- **CSV Data** is loaded into memory on each request for simplicity, as the dataset is small. This avoids the need for a database for this prototype.
- **Docker** is used for easy deployment and reproducibility, bundling both backend and frontend in a single container.

## Critique

### What would you have done differently with more time?
- Implement persistent storage (e.g., PostgreSQL) for faster queries and scalability.
- Add authentication and user accounts for favorites, reviews, etc.
- Add automated CI/CD and production-grade Docker orchestration.
- Write more comprehensive unit and integration tests, especially for edge cases.

### Trade-offs Made
- **In-memory CSV loading**: Simple and fast for small datasets, but not scalable for large data or frequent updates.
- **No database**: Avoids complexity but limits query performance and flexibility.
- **Single Docker container**: Easiest for demo, but not ideal for scaling or separation of concerns.

### Things Left Out
- Real-time updates or notifications.
- Mobile app or PWA features.
- Accessibility (a11y) improvements.
- Advanced search/filtering (e.g., by cuisine, open hours).
- Map-based UI.

### Problems & Scaling Solutions
- **Performance**: Loading and parsing the CSV on every request is inefficient. For scale, use a database and cache frequent queries.
- **Concurrency**: FastAPI is async, but the current CSV loading is synchronous. For high load, move to async DB queries.
- **Deployment**: For many users, split frontend and backend into separate containers/services, use a reverse proxy, and add monitoring/logging.
- **Security**: Add rate limiting, input validation, and authentication for sensitive endpoints.

## Running the Solution

### Prerequisites

- Docker (recommended), or Python 3.11+ and Node.js 20+ if running locally

### Steps

#### 1. Clone the repository

```sh
git clone https://github.com/RonCodes88/RadAI-Challenge.git
cd RadAI-Challenge
```

#### 2. Run with Docker
```sh
docker-compose up
```

#### 3. Run locally (without Docker)
##### Backend (Recommended to first initialize a virtual environment)
```sh
pip install -r requirements.txt
```
##### Frontend (In a separate terminal)
```sh
cd food-facilities-ui
npm install
npm run dev
```

#### 4. Run tests
```sh
pytest test_server.py
```


#### 5. API Documentation
- Go to http://localhost:8000/docs
