import Link from "next/link";
import { FaSearch, FaMapMarkerAlt, FaTruck } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-4xl font-bold mb-2">SF Food Truck Finder</h1>
      <p className="text-lg text-blue-200 mb-6 text-center">
        Search San Francisco food trucks by applicant, street, or your current
        location.
      </p>
      <nav className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/search/applicant">
          <button className="w-full bg-blue-400 hover:bg-blue-300 text-[#0a2342] font-semibold px-4 py-2 rounded transition-colors">
            <span className="text-2xl font-bold flex items-center gap-2 mb-0">
              <FaSearch className="text-blue-300" /> Search by Applicant
            </span>
          </button>
        </Link>
        <Link href="/search/street">
          <button className="w-full bg-blue-400 hover:bg-blue-300 text-[#0a2342] font-semibold px-4 py-2 rounded transition-colors">
            <span className="text-2xl font-bold flex items-center gap-2 mb-0">
              <FaMapMarkerAlt className="text-blue-300" /> Search by Street
            </span>
          </button>
        </Link>
        <Link href="/search/nearest">
          <button className="w-full bg-blue-400 hover:bg-blue-300 text-[#0a2342] font-semibold px-4 py-2 rounded transition-colors">
            <span className="text-2xl font-bold flex items-center gap-2 mb-0">
              <FaTruck className="text-blue-300" /> Find Nearest Trucks
            </span>
          </button>
        </Link>
      </nav>
    </div>
  );
}
