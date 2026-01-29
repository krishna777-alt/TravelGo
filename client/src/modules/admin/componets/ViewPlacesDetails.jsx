import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function PlaceLocation({ location }) {
  return (
    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Location</h2>

      <div class="grid grid-cols-2 gap-6 text-sm">
        <div>
          <p class="text-gray-500">Latitude</p>
          <p class="font-medium"> {location.lat} </p>
        </div>
        {/* ManagePlaces */}
        <div>
          <p class="text-gray-500">Longitude</p>
          <p class="font-medium"> {location.lng} </p>
        </div>
      </div>
    </div>
  );
}

function PlaceHeader({ place }) {
  return (
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800 capitalize">
          {place.title}
        </h1>
        <p class="text-sm text-gray-500">Detailed destination overview</p>
      </div>
      <TopBtns />
    </div>
  );
}

function PlaceDetails({ place }) {
  return (
    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Trip Information</h2>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        {/* <div>
          <p class="text-gray-500">Days</p>
          <p class="font-medium"> place.days </p>
        </div>

        <div>
          <p class="text-gray-500">Nights</p>
          <p class="font-medium"> place.nights </p>
        </div> */}

        <div>
          <p class="text-gray-500">State</p>
          <p class="font-medium capitalize"> {place.state}</p>
        </div>

        <div>
          <p class="text-gray-500">Slug</p>
          <p class="font-medium"> {place.place} </p>
        </div>

        <div>
          <p class="text-gray-500">Status</p>
          <span class="inline-block px-3 py-1 text-xs rounded-full <%= place.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700' %>">
            {place.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function ViewPlacesDetails() {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [location, setLocation] = useState({});

  console.log("placeID:", placeId);
  useEffect(
    function () {
      async function fetchPlaceData() {
        try {
          const responce = await fetch(
            `http://localhost:3000/api/v1/admin/currentPlace/${placeId}`
          );
          const data = await responce.json();
          setPlaceData(data.place);
          setGalleryImages(data.gallaryPhotos);
          console.log("DATAGalary:", data.place.location);
          setLocation(data.place.location);
        } catch (err) {
          console.log("Error", err.message);
        }
      }
      fetchPlaceData();
    },
    [placeId]
  );
  console.log("PlaceDAL:", location);
  return (
    <>
      <PlaceHeader place={placeData} />
      <PlaceImage place={placeData} galleryImages={galleryImages} />

      <PlaceDescription place={placeData} />

      <PlaceDetails place={placeData} />
      <PlaceLocation location={location} />
      <PalceDeleteBtn />
    </>
  );
}

function PlaceImage({ place, galleryImages }) {
  return (
    <div class="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <img
        src={`http://localhost:3000/uploads/places/${place.images}`}
        class="w-full h-72 object-cover rounded-xl mb-4"
      />

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((img) => (
          <img
            src={`http://localhost:3000/uploads/places/${img}`}
            class="h-32 w-full object-cover rounded-xl hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
}

function TopBtns() {
  return (
    <div class="flex gap-3">
      <NavLink
        to="/admin/managePlaces"
        class="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
      >
        ← Back
      </NavLink>
      <NavLink
        to="/admin/places/edit/<%= place._id %>"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
      >
        Edit Place
      </NavLink>
    </div>
  );
}

function PalceDeleteBtn() {
  return (
    <div class="bg-white rounded-2xl shadow-sm p-6 border border-red-200">
      <h2 class="text-xl font-semibold text-red-600 mb-3">Danger Zone</h2>

      <form
        action="/admin/places/delete/<%= place._id %>"
        method="POST"
        onsubmit="return confirm('This action cannot be undone. Delete this place?')"
      >
        <button class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Delete Place
        </button>
      </form>
    </div>
  );
}

function PlaceDescription({ place }) {
  return (
    <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 class="text-xl font-semibold mb-3">Description</h2>
      <p class="text-gray-600 leading-relaxed">{place.description} </p>
    </div>
  );
}
export default ViewPlacesDetails;
