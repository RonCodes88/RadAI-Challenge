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

export default function SearchByStreet() {
  const [street, setStreet] = useState("");
  const [results, setResults] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams({ street });
    const res = await fetch(`http://localhost:8000/search/street?${params}`);
    setResults(await res.json());
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search by Street</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
        <input
          className="rounded px-3 py-2 bg-[#16335b] text-white placeholder:text-blue-200"
          placeholder="Street name or address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading || !street}>
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
