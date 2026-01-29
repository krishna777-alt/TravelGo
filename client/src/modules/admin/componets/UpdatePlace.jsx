import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Header() {
  return (
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Update Place</h1>
        <p class="text-sm text-gray-500">Modify destination details</p>
      </div>

      <NavLink
        to="/admin/managePlaces"
        class="px-4 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
      >
        ← Cancel
      </NavLink>
    </div>
  );
}

function FormHeader({ place }) {
  return (
    <div class="bg-white p-6 rounded-2xl shadow-sm grid md:grid-cols-2 gap-6">
      <div>
        <label class="text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={place.title}
          class="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label class="text-sm font-medium">State</label>
        <input
          type="text"
          name="state"
          value={place.state}
          class="mt-1 w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div class="md:col-span-2">
        <label class="text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows="4"
          class="mt-1 w-full border rounded-lg px-4 py-2"
          required
          value={place.description}
        ></textarea>
      </div>
    </div>
  );
}

function FormImageUpdate({ place, galleryImages }) {
  return (
    <div class="bg-white p-6 rounded-2xl shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Images</h2>

      <div class="mb-4">
        <p class="text-sm text-gray-500 mb-2">Current Main Image</p>
        <img
          src={`http://localhost:3000/uploads/places/${place.images} `}
          class="h-40 rounded-xl object-cover mb-2"
        />
        <input type="file" name="image" />
      </div>

      <div>
        <p class="text-sm font-medium text-gray-600 mb-4">Gallery Images</p>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <div class="group relative bg-white rounded-2xl shadow-sm overflow-hidden border hover:shadow-lg transition">
            {galleryImages.map((img) => (
              <img
                src={`http://localhost:3000/uploads/places/${img} `}
                class="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ))}
            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>

            <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
              <button
                type="button"
                onClick="openImage('/uploads/places/<%= i %>')"
                class="px-3 py-1.5 bg-white/90 text-sm rounded-lg hover:bg-white"
              >
                View
              </button>

              <a
                href="/admin/places/remove-gallery/<%= img._id %>?img=<%= i %>"
                class="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
              >
                Delete
              </a>
            </div>

            <div class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Gallery
            </div>
          </div>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium mb-2">Add more images</label>
          <input
            type="file"
            name="galleryImages"
            multiple
            class="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-indigo-50 file:text-indigo-700
      hover:file:bg-indigo-100"
          />
        </div>
      </div>
    </div>
  );
}

function SaveBtn() {
  return (
    <div class="flex justify-end gap-4">
      <button
        type="submit"
        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </div>
  );
}

function Form({ children }) {
  return (
    <form
      action="/admin/updateCurentPlace/ place._id "
      method="POST"
      enctype="multipart/form-data"
      class="space-y-6"
    >
      {children}
    </form>
  );
}

function UpdatePlace() {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [location, setLocation] = useState({});

  console.log("PaceId:", placeId);
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
          setLocation(data.place.location);
          console.log("DATAPlace:", data);
        } catch (err) {
          console.log(err);
        }
      }
      fetchPlaceData();
    },
    [placeId]
  );
  return (
    <>
      <Header />
      <Form>
        <FormHeader place={placeData} />
        <Location location={location} />
        <FormImageUpdate place={placeData} galleryImages={galleryImages} />
        <SaveBtn />
      </Form>

      <CloseBtn />
    </>
  );
}

function Location({ location }) {
  return (
    <div class="bg-white p-6 rounded-2xl shadow-sm grid grid-cols-2 gap-6">
      <div>
        <label class="text-sm font-medium">Latitude</label>
        <input
          type="lat"
          step="any"
          name="lat"
          value={location.lat}
          class="mt-1 w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label class="text-sm font-medium">Longitude</label>
        <input
          type="long"
          step="any"
          name="lng"
          value={location.lng}
          class="mt-1 w-full border rounded-lg px-4 py-2"
          required
        />
      </div>
    </div>
  );
}

function PlaceStatus({ place }) {
  return (
    <div class="bg-white p-6 rounded-2xl shadow-sm">
      <label class="text-sm font-medium">Status</label>
      <select name="status" class="mt-1 w-full border rounded-lg px-4 py-2">
        <option value="live" selected={place.status === "live"}>
          Live
        </option>
        <option value="draft" selected={place.status === "draft"}>
          Draft
        </option>
      </select>
    </div>
  );
}

function CloseBtn() {
  return (
    <div
      id="imageModal"
      class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded-lg max-w-3xl max-h-screen overflow-auto">
        {/* <img id="modalImage" src="" class="max-w-full max-h-full"> */}
        <button
          onclick="closeModal()"
          class="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UpdatePlace;
