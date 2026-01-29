import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../componets/LoadingSpinner";

function Header() {
  return (
    <section
      class="text-center py-20 text-white bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/hotel-room-1447201_1280.jpg')" }}
    >
      <div class="absolute inset-0 bg-blue-700/50"></div>

      <div class="relative z-10">
        <h1 class="text-4xl font-bold">Find the Best Hotels</h1>
        <p class="mt-2 text-lg">Comfortable stays at the best prices</p>
      </div>
    </section>
  );
}

function RatingSort({ sort, setSort }) {
  return (
    <div>
      <label class="font-semibold">Rating</label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        id="filterRating"
        class="w-full mt-1 p-3 border rounded-lg bg-gray-50"
      >
        <option value="all">All Ratings</option>
        <option value="4">4★ & above</option>
        <option value="3">3★ & above</option>
        <option value="2">2★ & above</option>
      </select>
    </div>
  );
}

function RatingPlace({ placeSort, setPlaceSort, hotels }) {
  return (
    <div>
      <label class="font-semibold">Place</label>
      <select
        value={placeSort}
        onChange={(e) => setPlaceSort(e.target.value)}
        id="filterPrice"
        class="w-full mt-1 p-3 border rounded-lg bg-gray-50"
      >
        <option value="all">All Places</option>

        {hotels.map((p) => (
          <option value={p.place}>{p.place}</option>
        ))}
        {/* <option value="3000">₹1500 - ₹3000</option>
        <option value="8000">₹3000+</option> */}
      </select>
    </div>
  );
}

function HotelSorting({ sort, setSort, placeSort, setPlaceSort, hotels }) {
  return (
    <div class="bg-white shadow p-5 rounded-xl mb-8 border grid grid-cols-1 md:grid-cols-3 gap-6">
      <RatingSort sort={sort} setSort={setSort} />

      <RatingPlace
        placeSort={placeSort}
        setPlaceSort={setPlaceSort}
        hotels={hotels}
      />
    </div>
  );
}

function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [selectedRate, setSelectedRate] = useState("all");
  const [selectedPlace, setSelectPlace] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchHotelData() {
      setIsLoading(true);
      const responce = await fetch("http://localhost:3000/api/v1/hotels");
      const data = await responce.json();
      setHotels(data.hotels);
      setIsLoading(false);
      console.log("DATA:", data);
    }
    fetchHotelData();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const matchRate =
      selectedRate === "all" || hotel.rating >= Number(selectedRate);

    const matchPlace = hotel.place === "all" || hotel.place === selectedPlace;
    console.log(matchPlace);
    return matchRate || matchPlace;
  });
  //   selectedRate === "all"
  //     ? hotels
  //     : hotels.filter((hotel) => hotel.rating >= Number(selectedRate));
  //   console.log(filteredHotels);
  return (
    <>
      <div class="bg-gray-100">
        <Header />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div class="max-w-7xl mx-auto px-6 py-10 ">
            <HotelSorting
              hotels={hotels}
              sort={selectedRate}
              setSort={setSelectedRate}
              placeSort={selectedPlace}
              setPlaceSort={setSelectPlace}
            />
            <div className="grid  md:grid-cols-3 grid-row-4 gap-2">
              <HotelCard hotels={filteredHotels} />
              {/* <HotelCard />
            <HotelCard />
            <HotelCard /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function HotelCard({ hotels }) {
  return (
    <>
      {hotels.map((hotel) => (
        <div
          class="bg-white border rounded-xl shadow overflow-hidden"
          key={hotel._id}
        >
          <img
            src={`http://localhost:3000/uploads/hotels/${
              hotel.images ? hotel.images[0] : hotel.image
            }`}
            class="h-48 w-full object-cover"
          />

          <div class="p-5">
            <h3 class="text-xl font-bold">{hotel.name}</h3>
            <p class="text-yellow-500 font-semibold mb-1">
              ⭐ {hotel.rating} /5
            </p>
            <p class="text-gray-700 mb-2 font-medium">
              Address {hotel.address}
            </p>
            <p class="text-sm mb-4">
              <span
                class={`px-3 py-1 rounded-full text-white ${
                  hotel.place ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {hotel.place}
              </span>
            </p>

            <HotelCardBtns hotel={hotel} />
          </div>
        </div>
      ))}
    </>
  );
}

function HotelCardBtns({ hotel }) {
  return (
    <div className="flex gap-3 mt-5">
      {/* Book Now */}
      <NavLink
        to={`/hotels/hotelDetails/${hotel._id}`}
        className="
          w-1/2 text-center
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white py-2.5 rounded-xl font-semibold
          shadow-md
          hover:from-blue-700 hover:to-indigo-700
          hover:shadow-lg hover:-translate-y-0.5
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        "
      >
        Book Now
      </NavLink>

      {/* Details */}
      <NavLink
        to={`/hotels/hotelDetails/${hotel._id}`}
        className="
          w-1/2 text-center
          border border-blue-600 text-blue-600 py-2.5 rounded-xl font-semibold
          bg-white
          hover:bg-blue-50
          hover:-translate-y-0.5
          shadow-sm hover:shadow-md
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
        "
      >
        View Details
      </NavLink>
    </div>
  );
}

export default Hotel;
