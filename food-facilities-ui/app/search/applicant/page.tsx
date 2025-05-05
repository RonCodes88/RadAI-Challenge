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

export default function SearchByApplicant() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams({ name });
    if (status) params.append("status", status);
    const res = await fetch(`http://localhost:8000/search/applicant?${params}`);
    setResults(await res.json());
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search by Applicant</h2>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
        <input
          className="rounded px-3 py-2 bg-[#16335b] text-white placeholder:text-blue-200"
          placeholder="Applicant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="rounded px-3 py-2 bg-[#16335b] text-white placeholder:text-blue-200"
          placeholder="Status (optional)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button type="submit" disabled={loading || !name}>
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
