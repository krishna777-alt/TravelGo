import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Header({ place }) {
  return (
    <section
      class="text-center py-20 text-white bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('http://localhost:3000/images/julian-timmerman-Fn27DlI8bZ8-unsplash.jpg')",
      }}
    >
      <div class="absolute inset-0 bg-blue-700/50"></div>

      <div class="relative z-10">
        <h1 class="text-4xl font-bold">{place.title} </h1>
        <p class="mt-2 text-lg"> {place.state} , India</p>
      </div>
    </section>
  );
}

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [gallaryImages, getGallaryImages] = useState([]);

  useEffect(() => {
    async function fetchPlaceData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/placeDetails/${placeId}`
        );
        const data = await response.json();

        setPlace(data.place);
        getGallaryImages(data.gimg || []);

        if (data.place?.location) {
          setLocation({
            lat: data.place.location.lat,
            lng: data.place.location.lng,
          });
        }
      } catch (err) {
        console.log("ERR:", err.message);
      }
    }

    fetchPlaceData();
  }, [placeId]);
  console.log("Loaction:", location);
  return (
    <div class="bg-gray-100">
      <Header place={place} />
      <PlaceContent
        place={place}
        gallaryImages={gallaryImages}
        location={location}
      />
    </div>
  );
}

function PlaceContent({ place, gallaryImages, location }) {
  const [imageName, setImageName] = useState("");
  function handleImageClick(img) {
    console.log("imageName:", img);
    setImageName(img);
  }
  return (
    <div class="max-w-7xl mx-auto px-6 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2">
          <img
            onClick={() => handleImageClick(place.images)}
            src={`http://localhost:3000/uploads/places/${place.images}`}
            class="w-full h-80 object-cover rounded-xl cursor-pointer shadow-lg"
          />

          <br />
          <p class="text-xl font-bold text-gray-900 mb-4 pl-3 border-l-4 border-blue-600">
            Related Images
          </p>

          <div class="flex gap-4 mt-4 overflow-x-auto pb-2">
            {gallaryImages.map((image, index) => (
              <img
                onClick={() => handleImageClick(image)}
                key={image || index}
                src={`http://localhost:3000/uploads/places/${image}`}
                class="w-24 h-20 rounded-lg border object-cover cursor-pointer hover:opacity-80 flex-shrink-0"
              />
            ))}
          </div>

          <p class="mt-6 text-gray-700 text-lg leading-7">
            {place.description}
          </p>
        </div>
        <PlaceLocation location={location} />
      </div>

      <hr class="my-10 border-gray-300" />

      <h2 class="text-2xl font-bold mb-6">Hotels in place.state </h2>

      {/* include("hotelCard") */}
      <Lightbox image={imageName} onClose={() => setImageName("")} />
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
        src={`http://localhost:3000/uploads/places/${image}`}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl animate-fadeIn"
      />
    </div>
  );
}

function PlaceLocation({ location }) {
  console.log("From placeLod:", location);
  if (!location?.lat || !location?.lng) {
    return <MapSkeleton />;
  }
  const { lat, lng } = location;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Location Map</h2>

      <iframe
        width="100%"
        height="300"
        className="rounded-xl shadow-lg"
        loading="lazy"
        src={`https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`}
      />

      <p className="text-gray-700 mt-3">
        <strong>Latitude:</strong> {lat}
        <br />
        <strong>Longitude:</strong> {lng}
      </p>
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>

      {/* Map box */}
      <div className="w-full h-[300px] rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 shadow-lg relative overflow-hidden">
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Coordinates */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-56 bg-gray-300 rounded"></div>
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default PlaceDetails;
