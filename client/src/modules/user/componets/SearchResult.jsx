import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function NoResult({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 text-5xl text-gray-400">🔍</div>

      <h2 className="text-xl font-semibold text-gray-800">No results found</h2>

      <p className="mt-2 max-w-md text-gray-500">
        We couldn’t find any matches for
        <span className="mx-1 font-medium text-gray-700">“{query}”</span>. Try
        adjusting your search or exploring other options.
      </p>
    </div>
  );
}

function Header({ query }) {
  return (
    <div class="mb-10">
      <h2 class="text-2xl font-bold text-gray-800">
        Search results for "<span class="text-indigo-600"> {query} </span>"
      </h2>
      <p class="text-gray-500 mt-1">
        Found hotels.length hotels and places.length places
      </p>
    </div>
  );
}

function SearchResult() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const [places, setPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(
    function () {
      async function fetchSearchData() {
        try {
          if (!query) return;
          const result = await fetch(
            `http://localhost:3000/api/v1/search?q=${query}`
          );
          const data = await result.json();
          setPlaces(data.places);
          setHotels(data.hotels);

          console.log("Data:", data);
        } catch (err) {
          console.log("ERROR:", err.message);
        }
      }
      fetchSearchData();
    },
    [query]
  );
  console.log("Place:", places);
  return (
    <>
      {places.length > 0 || hotels.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <Header query={query} />
          <PlaceBox places={places} />
          <hr className="my-8 border-gray-300" />
          <HotelBox hotels={hotels} />
        </section>
      ) : (
        <NoResult query={query} />
      )}
    </>
  );
}

function PlaceBox({ places }) {
  return (
    <div class="mb-14">
      <h3 class="text-xl font-semibold text-gray-800 mb-6">📍 Places</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.map((place) => (
          <div class="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition">
            <img
              src={`http://localhost:3000/uploads/places/${place.images}`}
              alt={place.title}
              class="h-52 w-full object-cover"
            />

            <div class="p-5">
              <h4 class="text-lg font-semibold capitalize"> {place.title} </h4>

              <p class="text-sm text-gray-500 mt-1 capitalize">{place.state}</p>

              <p class="text-gray-600 text-sm mt-3 line-clamp-3">
                {place.description}
              </p>

              <div class="flex justify-between items-center mt-5">
                {/* <div>
                  <span class="text-indigo-600 font-semibold">
                    {place.days} Days
                  </span>
                  <span class="text-indigo-600 font-semibold">
                    {place.nights} nights
                  </span>
                </div> */}
                <a
                  href={`/placeDetails/${place._id}`}
                  class="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelBox({ hotels }) {
  return (
    <div>
      <h3 class="text-xl font-semibold text-gray-800 mb-6">🏨 Hotels</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <div class="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition">
            <img
              src={`http://localhost:3000/uploads/hotels/${hotel.image}`}
              alt={hotel.name}
              class="h-52 w-full object-cover"
            />

            <div class="p-5">
              <div class="flex justify-between items-start">
                <h4 class="text-lg font-semibold">{hotel.name}</h4>

                <div class="flex items-center gap-1 text-sm text-amber-500">
                  ★<span class="text-gray-700 font-medium">{hotel.rating}</span>
                </div>
              </div>

              <p class="text-sm text-gray-500 mt-1">
                {hotel.place}, {hotel.state}
              </p>

              <p class="text-gray-600 text-sm mt-3 line-clamp-2">
                {hotel.description}
              </p>

              <div class="flex justify-between items-center mt-5">
                <span class="text-indigo-600 font-semibold">
                  ₹{hotel.price} / night
                </span>

                <a
                  href={`/displayHotelDetails/${hotel._id}`}
                  class="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  View Hotel
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
