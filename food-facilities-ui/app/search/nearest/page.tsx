"use client";
import { useState } from "react";
import Button from "@/components/Button";

type FoodTruck = {
  locationid: string;
  Applicant: string;
  FacilityType: string;
  Address: string;
  Status: string;
  FoodItems: string;
  Latitude?: number;
  Longitude?: number;
};

export default function SearchNearest() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [status, setStatus] = useState("APPROVED");
  const [results, setResults] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams({ lat, lon, status });
    const res = await fetch(`http://localhost:8000/search/nearest?${params}`);
    setResults(await res.json());
    setLoading(false);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toString());
      setLon(pos.coords.longitude.toString());
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Find Nearest Food Trucks</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
        <div className="flex gap-2">
          <input
            className="rounded px-3 py-2 bg-[#16335b] text-white placeholder:text-blue-200 flex-1"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
            type="number"
            step="any"
          />
          <input
            className="rounded px-3 py-2 bg-[#16335b] text-white placeholder:text-blue-200 flex-1"
            placeholder="Longitude"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            required
            type="number"
            step="any"
          />
          <Button type="button" onClick={handleLocate}>
            Use My Location
          </Button>
        </div>
        <input
          className="rounded px-3 py-2 bg-[#16335b] text-white placeholder:text-blue-200"
          placeholder="Status (default: APPROVED)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button type="submit" disabled={loading || !lat || !lon}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>
      <ResultsList results={results} />
    </div>
  );
}

function ResultsList({ results }: { results: FoodTruck[] }) {
  if (!results.length)
    return <div className="text-blue-200">No results found.</div>;
  return (
    <ul className="space-y-4">
      {results.map((truck) => (
        <li key={truck.locationid} className="bg-[#16335b] rounded p-4">
          <div className="font-bold text-lg">{truck.Applicant}</div>
          <div className="text-blue-200">
            {truck.FacilityType} - {truck.Status}
          </div>
          <div>{truck.Address}</div>
          <div className="text-blue-300">{truck.FoodItems}</div>
        </li>
      ))}
    </ul>
  );
}
