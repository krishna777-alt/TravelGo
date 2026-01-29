import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../componets/LoadingSpinner";
// import { placeSearch } from "../../../../../server/controllers/userController";

function Header({ hotel }) {
  return (
    <section
      class="text-center py-20 text-white bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('http://localhost:3000/images/hotelDetails-header.jpg')",
      }}
    >
      <div class="absolute inset-0 bg-blue-700/50"></div>

      <div class="relative z-10">
        <h1 class="text-4xl font-bold">{hotel.name}</h1>
        <p class="mt-2 text-lg">Find the best tourist places across India</p>
      </div>
    </section>
  );
}

function BookingRules() {
  return (
    <div class="bg-white p-6 rounded-xl shadow-sm border fade-card">
      <h3 class="text-xl font-semibold">Booking Rules</h3>

      <div class="mt-6 grid grid-cols-2 gap-10">
        <div>
          <h4 class="font-medium mb-3">Check In</h4>
          <ul class="space-y-2 text-gray-600">
            <li>✔ ID required</li>
            <li>✔ Standard check-in timing</li>
            <li>✔ Early check-in on request</li>
          </ul>
        </div>

        <div>
          <h4 class="font-medium mb-3">Check Out</h4>
          <ul class="space-y-2 text-gray-600">
            <li>✔ Standard check-out time</li>
            <li>✔ Late check-out (charges apply)</li>
            <li>✔ Baggage storage available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function HotelImages({ hotel }) {
  const [hotelImageName, setHotelImageName] = useState("");

  function handleImageClick(img) {
    setHotelImageName(img);
  }
  return (
    <div class="grid grid-cols-3 gap-4">
      <div className="col-span-1 grid grid-cols-2 grid-rows-2 gap-4 h-72">
        {hotel.galleryImages?.slice(0, 4).map((img, index) => {
          const isLast = index === 3 && hotel.galleryImages.length > 4;

          return (
            <div
              key={img}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <img
                onClick={() => handleImageClick(img)}
                src={`http://localhost:3000/uploads/hotels/${img}`}
                alt="Hotel gallery"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay only for last image */}
              {isLast && (
                <>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-6 py-2 rounded-full bg-white/90 text-gray-900 text-sm font-semibold shadow-lg">
                      +{hotel.galleryImages.length - 3} more
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div class="col-span-2 h-72 rounded-xl shadow overflow-hidden cursor-pointer gallery-thumb">
        <img
          src={`http://localhost:3000/uploads/hotels/${hotel.image}`}
          onClick={() => handleImageClick(hotel.image)}
          data-index="0"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <Lightbox image={hotelImageName} onClose={() => setHotelImageName("")} />
    </div>
  );
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    // document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      // document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl hover:scale-110 transition"
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={`http://localhost:3000/uploads/hotels/${image}`}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl animate-fadeIn"
      />
    </div>
  );
}

function HotelFeatures({ hotel }) {
  return (
    <div class="flex justify-between items-start flex-wrap">
      <div>
        <h2 class="text-2xl font-bold">{hotel.name}</h2>
        <p class="text-sm text-gray-500 mt-2">
          {hotel.address}, {hotel.state}
        </p>
      </div>

      <div class="flex items-center gap-2 mt-3 lg:mt-0">
        <span class="text-amber-500 text-xl">★</span>
        <span class="font-semibold"> {hotel.rating}</span>
        <span class="text-gray-500">(245 Reviews)</span>
      </div>
    </div>
  );
}

function NavigateBtn({ hotel, navigate }) {
  return (
    <div class="mt-7 flex gap-4">
      <NavLink
        to={`/hotels/hotelDetails/${hotel._id}/rooms`}
        className={({ isActive }) =>
          `inline-flex items-center justify-center gap-2 
                    bg-indigo-600 text-white px-6 py-3 rounded-xl shadow 
                    hover:bg-indigo-700 transition-all duration-300
                    ${isActive ? "ring-2 ring-indigo-300 scale-[1.02]" : ""}`
        }
      >
        🛏️ Check out rooms
      </NavLink>

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 
             bg-gray-200 text-gray-700 px-6 py-3 rounded-xl 
             hover:bg-gray-300 transition-all duration-300"
      >
        ← Back
      </button>
    </div>
  );
}

function HotelDetails() {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState({});
  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchHotelDetailsData() {
        try {
          setIsLoading(true);
          const responce = await fetch(
            `http://localhost:3000/api/v1/displayHotelDetails/${hotelId}`
          );
          const data = await responce.json();
          setHotelDetails(data.hotel);
          setRoom(data.room);
          setIsLoading(false);
          console.log("DATA:", data);
        } catch (err) {
          console.log("ERROR:", err.message);
        }
      }
      fetchHotelDetailsData();
    },
    [hotelId]
  );
  //   console.log("sf:", hotelDetails.slug);
  return (
    <div class="bg-gray-50 text-gray-800">
      <Header hotel={hotelDetails} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div class="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div class="lg:col-span-2 space-y-10">
            <HotelImages hotel={hotelDetails} />

            <div class="bg-white p-6 rounded-xl shadow-sm border fade-card">
              <HotelFeatures hotel={hotelDetails} />

              <FetatureOne />

              <NavigateBtn hotel={hotelDetails} navigate={navigate} />
            </div>

            <HotelOverview hotel={hotelDetails} />
            <RoomAmenities hotel={hotelDetails} />

            <BookingRules />
            <Location hotel={hotelDetails} />
          </div>

          <RoomCard rooms={room} hotel={hotelDetails} />
        </div>
      )}
      <ImageModel />
    </div>
  );
}

function RoomCard({ rooms, hotel }) {
  return (
    <div class="lg:col-span-1">
      <div class="sticky top-24 space-y-6">
        <div class="bg-white rounded-xl shadow-sm border p-5">
          <h3 class="text-base font-semibold mb-4">Room Availability</h3>

          <div class="flex gap-4 text-xs text-gray-600 mb-4">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-blue-500"></span>
              Available
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-gray-900"></span>
              Booked
            </div>
          </div>

          <div class="grid grid-cols-6 gap-2 max-h-56 overflow-y-auto pr-1">
            {rooms.map((r) => (
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium
            ${
              r.isBooked
                ? "bg-gray-900 text-white cursor-not-allowed opacity-80"
                : "bg-blue-500 text-white hover:scale-110 transition cursor-pointer"
            } `}
                title={r.roomNum}
              >
                <NavLink
                  to={`/hotels/hotelDetails/${hotel._id}/rooms/roomDetails/${r._id}`}
                >
                  {r.roomNum}
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* hotel reviews */}
      </div>
      <ImageModel />
    </div>
  );
}

function RoomAmenities({ hotel }) {
  return (
    <div class="bg-white p-6 rounded-xl shadow-sm border fade-card">
      <h3 class="text-xl font-semibold">Room Amenities</h3>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {hotel?.amenities?.map((am) => (
          <div class="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border fade-card">
            <span class="text-indigo-600">✔</span>
            <span>{am} </span>
          </div>
        ))}
      </div>
    </div>
  );
}
function HotelOverview({ hotel }) {
  return (
    <div class="bg-white p-6 rounded-xl shadow-sm border fade-card">
      <h3 class="text-xl font-semibold">Overview</h3>
      <p class="mt-3 text-gray-700 leading-relaxed">{hotel.description}</p>
    </div>
  );
}

function Location({ hotel }) {
  return (
    <div class="bg-white p-6 rounded-xl shadow-sm border fade-card">
      <h3 class="text-lg font-semibold">Location</h3>

      <div class="mt-5">
        <iframe
          height="330"
          width="100%"
          class="rounded-xl border"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            hotel.address
          )}&output=embed`}
        ></iframe>
      </div>
    </div>
  );
}

function ImageModel() {
  return (
    <div
      id="galleryModal"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden z-50 flex items-center justify-center"
    >
      <div class="relative max-w-5xl w-full px-4">
        <button
          id="closeGallery"
          class="absolute -top-12 right-4 text-white text-3xl"
        >
          ✕
        </button>

        <div class="rounded-2xl overflow-hidden shadow-xl">
          <img
            id="galleryMainImage"
            src=""
            class="w-full h-[70vh] object-contain bg-black"
          />
        </div>

        <div class="flex gap-3 mt-4 overflow-x-auto justify-center">
          <img
            src="/uploads/hotels/image.jpg"
            class="w-20 h-14 object-cover rounded-lg cursor-pointer opacity-70 hover:opacity-100 border-2 border-transparent gallery-thumb-modal"
          />
        </div>
      </div>
    </div>
  );
}

function FetatureOne() {
  return (
    <div class="mt-6 flex flex-wrap gap-6 text-gray-600 text-sm">
      <div class="flex items-center gap-2">
        🛏 <span>1 Bed</span>
      </div>
      <div class="flex items-center gap-2">
        🚿 <span>1 Bath</span>
      </div>
      <div class="flex items-center gap-2">
        📏 <span>300 sqft</span>
      </div>
      <div class="flex items-center gap-2">
        👥 <span>2 Guests</span>
      </div>
    </div>
  );
}
export default HotelDetails;
