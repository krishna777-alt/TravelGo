import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import LoadingSpinner from "../componets/LoadingSpinner";

function PlaceHeader() {
  return (
    <section
      class="text-center py-20 text-white bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('http://localhost:3000/images/julian-timmerman-Fn27DlI8bZ8-unsplash.jpg')",
      }}
    >
      <div class="absolute inset-0 bg-blue-700/50">
        <div class="relative z-10">
          <h1 class="text-4xl font-bold">Explore Places</h1>
          <p class="mt-2 text-lg">Find the best tourist places across India</p>
        </div>
      </div>
    </section>
  );
}

function Soritng({ states, selectedState, setSelectedState }) {
  console.log("sTate:", selectedState);
  return (
    <div class="flex flex-col md:flex-row gap-4 justify-between mb-8">
      <div>
        <label className="font-semibold mr-2">Sort by State:</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          id="sortState"
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All States</option>
          {states.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PlaceBox({ places, loadingBox, searchResult }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {loadingBox && <LoadingSpinner />}

      {/* 2️⃣ Not loading & no places */}
      {!loadingBox && places.length === 0 && (
        <div className="w-full min-h-[65vh] flex items-center justify-center">
          <NoMatchFound query={searchResult} />
        </div>
      )}

      {/* 3️⃣ Not loading & places exist */}
      {!loadingBox && places.length > 0 && (
        <div
          id="placeContainer"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {places.map((place) => (
            <div
              key={place._id}
              className="bg-white shadow rounded-xl overflow-hidden border"
            >
              <img
                src={`http://localhost:3000/uploads/places/${place.images}`}
                className="h-48 w-full object-cover"
                alt={place.title}
              />

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{place.title}</h3>

                <p className="text-sm text-blue-600 font-semibold mb-2">
                  {place.state}
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {place.description?.substring(0, 110)}...
                </p>

                <NavLink
                  to={`/places/${place._id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Places() {
  const [placeData, getPlaceData] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(function () {
    async function fetchPlaceData() {
      try {
        setLoading(true);
        const responce = await fetch("http://localhost:3000/api/v1/places");
        const data = await responce.json();
        getPlaceData(data.places);
        setStates(data.states);
        console.log("eef", data.places);
        setLoading(false);
      } catch (err) {
        console.log("ERROR:", err.message);
      }
    }
    fetchPlaceData();
  }, []);

  const filteredPlaces = placeData.filter((place) => {
    // ✅ state filter
    const matchState = selectedState === "all" || place.state === selectedState;

    // ✅ search filter (safe)
    const search = searchTerm?.toLowerCase() || "";

    const matchesSearch =
      place?.title?.toLowerCase().includes(search) ||
      place?.place?.toLowerCase().includes(search);

    return matchState && matchesSearch;
  });

  return (
    <>
      <PlaceHeader />
      <div class="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <Soritng
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          states={states}
        />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <PlaceBox
        places={filteredPlaces}
        loadingBox={loading}
        searchResult={searchTerm}
      />
    </>
  );
}

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div class="relative flex-1 max-w-lg">
      <div class="relative flex-1">
        <span class="absolute inset-y-0 left-4 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </span>

        <input
          type="text"
          name="q"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search places, beaches, temples..."
          class="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
        />
      </div>
    </div>
  );
}

function NoMatchFound({ query }) {
  return (
    <div className="text-center max-w-md">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl">
        🔍
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">No matches found</h2>

      <p className="mt-3 text-gray-500 leading-relaxed">
        We couldn’t find any places matching
        {query && (
          <span className="mx-1 font-medium text-gray-700">“{query}”</span>
        )}
        . Try adjusting your search or exploring popular destinations.
      </p>
    </div>
  );
}

export default Places;
