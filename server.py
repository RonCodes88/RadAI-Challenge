import csv
import uvicorn
from fastapi import FastAPI, Query
from typing import List, Optional
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from pathlib import Path
from math import radians, cos, sin, asin, sqrt
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SF Food Truck API",
    description="Search SF food trucks by name, street, or location",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_PATH = Path(__file__).parent / "Mobile_Food_Facility_Permit.csv"


class FoodTruck(BaseModel):
    locationid: str
    Applicant: str
    FacilityType: str
    Address: str
    Status: str
    FoodItems: str
    Latitude: Optional[float]
    Longitude: Optional[float]

def load_data() -> List[FoodTruck]:
    trucks = []
    with open(CSV_PATH, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                lat = float(row["Latitude"]) if row["Latitude"] else None
                lon = float(row["Longitude"]) if row["Longitude"] else None
            except Exception:
                lat, lon = None, None
            trucks.append(FoodTruck(
                locationid=row["locationid"],
                Applicant=row["Applicant"],
                FacilityType=row["FacilityType"],
                Address=row["Address"],
                Status=row["Status"],
                FoodItems=row["FoodItems"],
                Latitude=lat,
                Longitude=lon
            ))
    return trucks

def haversine(lat1, lon1, lat2, lon2):
    # Calculate the great circle distance between two points on the earth (in km)
    R = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    return R * c

@app.get("/search/applicant", response_model=List[FoodTruck])
def search_by_applicant(
    name: str = Query(..., description="Applicant name (partial match, case-insensitive)"),
    status: Optional[str] = Query(None, description="Status filter (optional, case-insensitive)")
):
    trucks = load_data()
    name = name.lower()
    results = [
        t for t in trucks
        if name in t.Applicant.lower() and (status is None or t.Status.lower() == status.lower())
    ]
    return results

@app.get("/search/street", response_model=List[FoodTruck])
def search_by_street(
    street: str = Query(..., description="Street name or part of address (case-insensitive)")
):
    trucks = load_data()
    street = street.lower()
    results = [
        t for t in trucks
        if street in t.Address.lower()
    ]
    return results

@app.get("/search/nearest", response_model=List[FoodTruck])
def search_nearest(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    status: Optional[str] = Query("APPROVED", description="Status filter (default: APPROVED, case-insensitive)")
):
    trucks = load_data()
    filtered = [
        t for t in trucks
        if t.Latitude is not None and t.Longitude is not None and (status is None or t.Status.lower() == status.lower())
    ]
    # Sort by distance
    filtered.sort(key=lambda t: haversine(lat, lon, t.Latitude, t.Longitude))
    return filtered[:5]

@app.get("/")
def root():
    return {"message": "Welcome to the SF Food Truck API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

