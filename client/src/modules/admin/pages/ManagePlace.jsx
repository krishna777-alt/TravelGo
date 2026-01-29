import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AddPlacesBtn() {
  return (
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Manage Places</h1>
        <p class="text-sm text-gray-500">
          Create, update and manage travel places
        </p>
      </div>

      <NavLink
        to="/admin/createPlaces"
        class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow transition"
      >
        ➕ Add Place
      </NavLink>
    </div>
  );
}

function ManagePlaces() {
  const [places, setPlaces] = useState([]);

  useEffect(function () {
    async function fetchPlaceData() {
      try {
        const responce = await fetch(
          "http://localhost:3000/api/v1/admin/placesData"
        );
        const data = await responce.json();

        setPlaces(data.places);
      } catch (err) {
        console.log(err.messsage);
      }
    }
    fetchPlaceData();
  }, []);
  console.log("outside:", places);
  return (
    <>
      <AddPlacesBtn />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {places.map((place) => (
          <div class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden group">
            <div class="relative h-44 overflow-hidden">
              <img
                src={`http://localhost:3000/uploads/places/${place.images}`}
                alt="<%= place.title %>"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <span class="absolute top-3 left-3 px-3 py-1 text-xs rounded-full bg-emerald-600 text-white">
                {place.status}
              </span>
            </div>

            <div class="p-5 space-y-3">
              <h3 class="text-lg font-semibold text-gray-800 truncate">
                {place.title}
              </h3>

              <p class="text-sm text-gray-500 line-clamp-2">
                {place.description}
              </p>

              {/* <div class="flex text-xs text-gray-500 gap-4">
                <span>
                  🗓 {place.days} D / {place.nights} N
                </span>
                <span>📍 {place.state} || "India" </span>
              </div> */}

              <div class="flex items-center justify-between pt-3 border-t">
                <NavLink
                  to={`/admin/placesDetails/${place._id}`}
                  class="text-sm text-indigo-600 hover:underline"
                >
                  View
                </NavLink>

                <div class="flex gap-3">
                  <NavLink
                    to={`/admin/updateCurentPlace/${place._id}`}
                    class="text-sm text-amber-600 hover:underline"
                  >
                    Edit
                  </NavLink>
                  <DeletePlaceBtn />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function DeletePlaceBtn() {
  return (
    <form
      action="/admin/places/delete/<%= place._id %>"
      method="POST"
      onsubmit="return confirm('Delete this place?')"
    >
      <button type="submit" class="text-sm text-red-600 hover:underline">
        Delete
      </button>
    </form>
  );
}

function MobileAddBtn() {
  return (
    <div class="bg-white rounded-2xl p-12 text-center shadow-sm">
      <div class="text-5xl mb-4">📍</div>
      <h2 class="text-xl font-semibold text-gray-800">No places added yet</h2>
      <p class="text-gray-500 mt-2 mb-6">
        Start by adding your first travel destination
      </p>

      <a
        href="/admin/places/new"
        class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition"
      >
        ➕ Add Place
      </a>
    </div>
  );
}

export default ManagePlaces;
