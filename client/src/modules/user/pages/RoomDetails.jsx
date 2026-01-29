import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../componets/LoadingSpinner";
import axios from "axios";

function RoomOverview() {
  return (
    <div class="flex gap-6 border-b pb-3 text-sm font-medium">
      <span class="text-indigo-600 border-b-2 border-indigo-600 pb-2">
        Overview
      </span>
      <span class="text-gray-500">Rooms</span>
      <span class="text-gray-500">Amenities</span>
      <span class="text-gray-500">Policies</span>
    </div>
  );
}

function Header({ room }) {
  return (
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <a
          href="javascript:history.back()"
          class="text-sm text-gray-500 hover:underline"
        >
          ← Back
        </a>

        <h1 class="text-3xl font-semibold mt-2"> {room.roomTypeCode} </h1>

        <div class="flex items-center gap-3 mt-1 text-sm text-gray-500">
          <span>
            Max {room.maxOccupancy} guests {room.adults} adults, {room.children}{" "}
            children
          </span>

          <span class="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
            {room.category}
          </span>
        </div>
      </div>

      <div class="text-right">
        <p class="text-sm text-gray-500">Price per night</p>
        <p class="text-3xl font-bold text-indigo-600">
          ₹ {room?.price?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function ImageLightBox({ images = [], startIndex = 0, isOpen, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % images.length),
    [images.length],
  );

  const prev = useCallback(
    () => setCurrent((prev) => (prev - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    setCurrent(startIndex);
  }, [startIndex]);

  useEffect(() => {
    function handleKey(e) {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, next, prev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0" />

      {/* Lightbox Card */}
      <div className="relative z-10 max-w-5xl w-full mx-4 animate-fadeIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white text-3xl"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
          <img
            src={images[current]}
            className="w-full max-h-[80vh] object-contain transition-transform duration-500"
          />

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 right-4 px-4 py-1.5 rounded-full bg-black/60 text-white text-sm backdrop-blur-md">
            {current + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomImages({ room }) {
  const totalImages = room.roomPhotos?.length || 0;
  const imagesDisplayed = 4;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const visibleImages = room.roomPhotos?.slice(0, imagesDisplayed);

  const handleImageClick = (index) => {
    setStartIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div id="gallery" class="grid grid-cols-4 grid-rows-2 gap-4">
      {/* Main Image */}
      <ImageLightBox
        images={room.roomPhotos?.map(
          (img) => `http://localhost:3000/uploads/hotels/${img}`,
        )}
        startIndex={startIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      <div
        onClick={() => handleImageClick(0)}
        class="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group cursor-pointer"
      >
        <img
          src={`http://localhost:3000/uploads/hotels/${room?.mainImage}`}
          data-index="0"
          class="gallery-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Gallery Thumbnails */}
      {visibleImages?.map((img, index) => (
        <div
          key={index}
          onClick={() => handleImageClick(index + 1)}
          class="relative overflow-hidden rounded-2xl group aspect-square cursor-pointer"
        >
          <img
            src={`http://localhost:3000/uploads/hotels/${img}`}
            class="gallery-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition"></div>

          {index === imagesDisplayed - 1 && totalImages > imagesDisplayed && (
            <div class="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
              +{totalImages - imagesDisplayed} photos
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RoomForm({ room, onChange, onSubmit, formData }) {
  return (
    <div class="bg-white p-6 rounded-xl shadow-sm border sticky top-10 h-fit">
      <h3 class="text-xl font-semibold mb-5">Book Room</h3>

      <form
        onSubmit={onSubmit}
        method="post"
        action="http://localhost:3000/bookingRoom"
        class="space-y-5"
      >
        <div>
          <input
            onChange={onChange}
            name="roomID"
            type="hidden"
            class="w-full p-3 mt-2 border rounded-lg"
            value={formData.roomID}
          />
        </div>
        <div>
          <label class="font-medium">Your Name</label>
          <input
            onChange={onChange}
            value={formData.name}
            name="name"
            type="text"
            class="w-full p-3 mt-2 border rounded-lg"
          />
        </div>

        <div>
          <label class="font-medium">Phone Number</label>
          <input
            onChange={onChange}
            value={formData.phone}
            name="phone"
            type="text"
            class="w-full p-3 mt-2 border rounded-lg"
          />
        </div>

        <div>
          <label class="font-medium">Check-in Date</label>
          <input
            onChange={onChange}
            value={formData.checkInDate}
            name="checkInDate"
            type="date"
            class="w-full p-3 mt-2 border rounded-lg"
          />
        </div>

        <div>
          <label class="font-medium">Check-out Date</label>
          <input
            onChange={onChange}
            value={formData.checkOutDate}
            name="checkOutDate"
            type="date"
            class="w-full p-3 mt-2 border rounded-lg"
          />
        </div>

        <div>
          <label class="font-medium">Adults</label>
          <select
            onChange={onChange}
            value={formData.adults}
            name="adults"
            class="w-full p-3 mt-2 border rounded-lg"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <div>
          <label class="font-medium">Children</label>
          <select
            onChange={onChange}
            value={formData.children}
            name="children"
            class="w-full p-3 mt-2 border rounded-lg"
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>

        <div>
          <label class="font-medium">Room Type</label>
          <select
            onChange={onChange}
            value={formData.roomTypeCode}
            name="roomTypeCode"
            class="w-full p-3 mt-2 border rounded-lg"
          >
            <option>{room.roomTypeCode}</option>
            {/* <option>DBL_STD</option> */}
          </select>
        </div>

        <div>
          <label class="font-medium">Room Number</label>
          <select
            onChange={onChange}
            value={formData.roomNum}
            name="roomNum"
            class="w-full p-3 mt-2 border rounded-lg"
          >
            <option> {room.roomNum}</option>
          </select>
        </div>

        <>
          <a
            href="/login"
            class="group relative w-full inline-flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-lg font-semibold shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-[1px] active:scale-[0.98]"
          >
            <svg
              class="w-5 h-5 opacity-90"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 11c1.657 0 3 1.343 3 3v3H9v-3c0-1.657 1.343-3 3-3zm6 0V8a6 6 0 10-12 0v3"
              />
            </svg>
            Login to Continue
          </a>

          <button class="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg hover:bg-indigo-700">
            Book Now
          </button>

          <button
            class="w-full bg-black text-white py-3 rounded-xl text-lg font-medium opacity-95 shadow-inner cursor-not-allowed"
            disabled
          >
            Reserved
          </button>
        </>
      </form>
    </div>
  );
}

function RoomDetails({ user }) {
  const { roomId } = useParams();
  console.log("use:", user);
  const [roomData, setRoomData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    roomID: "",
    name: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    adults: 0,
    children: 0,
    roomTypeCode: "",
    roomNum: 0,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const responce = await axios.post(
        "http://localhost:3000/api/v1/bookingRoom",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(responce);
    } catch (err) {
      console.log("ERROR:", err);
    }
  }

  useEffect(
    function () {
      async function fetchRoomData() {
        try {
          setIsLoading(true);
          const responce = await fetch(
            `http://localhost:3000/api/v1/displayRooms/${roomId}`,
          );
          const data = await responce.json();
          setRoomData(data.room);
          setIsLoading(false);
          // console.log("DATA:", data.room.mainImage);
        } catch (err) {
          console.log(err);
        }
      }
      fetchRoomData();
    },
    [roomId],
  );
  // console.log("RRO:", roomData.mainImage);
  return (
    <div class="bg-gray-100">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div class="max-w-7xl mx-auto px-6 py-10">
          <Header room={roomData} />
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
              <RoomImages room={roomData} />
              <RoomOverview />

              <RoomProperty room={roomData} />
            </div>

            <div class="lg:col-span-1">
              <RoomForm
                room={roomData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                formData={formData}
              />
            </div>
          </div>

          <RoomAvailablity room={roomData} />
        </div>
      )}
    </div>
  );
}

function RoomProperty({ room }) {
  return (
    <div class="bg-white rounded-xl p-6 shadow-sm space-y-5">
      <h2 class="text-xl font-semibold">Property overview</h2>

      <Includes />
      <Description />

      <RoomAttributes room={room} />
    </div>
  );
}

function Description() {
  return (
    <p class="text-gray-600 leading-relaxed">
      This spacious luxury room offers modern comfort with premium interiors,
      soft lighting, and a calm atmosphere. Ideal for couples, families, or
      business travelers looking for a relaxing stay.
    </p>
  );
}

function RoomAttributes({ room }) {
  return (
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-4">Room Details</h2>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <div>
          <p class="text-gray-500">Room Size</p>
          <p class="font-medium">
            {room.sizeSqM ? room.sizeSqM + " m²" : "Not specified"}
          </p>
        </div>

        <div>
          <p class="text-gray-500">Max Occupancy</p>
          <p class="font-medium"> {room.maxOccupancy} Guests</p>
        </div>

        <div>
          <p class="text-gray-500">Air Conditioning</p>
          <p class="font-medium"> {room.ac} </p>
        </div>

        <div>
          <p class="text-gray-500">Adults</p>
          <p class="font-medium"> {room.adults} </p>
        </div>

        <div>
          <p class="text-gray-500">Children</p>
          <p class="font-medium">{room.children} </p>
        </div>

        <div>
          <p class="text-gray-500">Hotel ID</p>
          <p class="font-medium truncate"> {room.hotelID} </p>
        </div>
      </div>
    </div>
  );
}

function RoomAvailablity({ room }) {
  return (
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Room Availability</h2>
        <span class="text-sm text-gray-500">
          {/* totalRooms - bookedRooms of totalRooms rooms available */}
        </span>
      </div>

      <div class="flex gap-4 text-sm mb-4">
        <span> Rooms: {room.roomNum} </span>

        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded-full bg-gray-900"></span>
          Unavailable
        </div>

        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded-full bg-blue-500"></span>
          Available
        </div>
      </div>
    </div>
  );
}

function Includes() {
  return (
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
      <div class="flex items-center gap-2">✔ Free Wi-Fi</div>
      <div class="flex items-center gap-2">✔ Air conditioning</div>
      <div class="flex items-center gap-2">✔ Private bathroom</div>
      <div class="flex items-center gap-2">✔ Free parking</div>
      <div class="flex items-center gap-2">✔ 24-hour front desk</div>
      <div class="flex items-center gap-2">✔ Key card access</div>
    </div>
  );
}

export default RoomDetails;
