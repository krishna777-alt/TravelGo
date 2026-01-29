import { useState } from "react";
import LoadingSpinner from "../componets/LoadingSpinner";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";

function PaginationBtn() {
  return (
    <div class="flex items-center justify-between mt-8">
      <p id="page-text" class="text-sm text-gray-500">
        Page 1 of 1
      </p>
      <div>
        <button
          id="prev-btn"
          class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled
        >
          Previous
        </button>
        <button
          id="next-btn"
          class="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50 ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function RoomSort() {
  return (
    <div class="flex items-center justify-between mb-8">
      <p id="items-text" class="text-sm text-gray-500">
        Items 1 to 6 of 6 items
      </p>

      <div class="flex items-center gap-4 text-sm">
        <div>
          Show
          <select id="show-select" class="border rounded px-2 py-1">
            <option>2</option>
            <option>12</option>
          </select>
          per page
        </div>

        <div>
          Sort by:
          <select id="sort-select" class="border rounded px-2 py-1">
            <option>Price</option>
            <option>AC</option>
            <option>NON-AC</option>
            <option>Executive</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Rooms() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchRoomData() {
        setIsLoading(true);
        const responce = await fetch(
          `http://localhost:3000/api/v1/rooms/${hotelId}`
        );
        const data = await responce.json();
        setRooms(data.rooms);
        setIsLoading(false);
        console.log("data:", data);
      }
      fetchRoomData();
    },
    [hotelId]
  );

  return (
    <div class="bg-gray-100">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <RoomSort />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <RoomCard room={rooms} id={hotelId} />
            {/* <RoomCard /> */}
          </div>
        )}
        <PaginationBtn />
      </div>
    </div>
  );
}

function RoomCard({ room, id }) {
  return (
    <>
      {room.map((r) => (
        <div
          class="bg-white shadow-sm rounded-xl overflow-hidden group hover:shadow-lg transition duration-300"
          data-price="<%= room.price %>"
          data-ac="<%= room.ac %>"
          data-type="<%= room.roomTypeCode %>"
        >
          <div class="relative overflow-hidden">
            <div
              class="absolute top-3 left-3 bg-black/80 text-white text-xs font-semibold
          px-3 py-1 rounded-full backdrop-blur z-10"
            >
              Room{r.roomNum}
            </div>

            <div
              class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold z-10
          <%=  !r.isBooked
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-800 text-gray-300' %>"
            >
              {!r.isBooked ? "Available" : "Booked"}
            </div>

            <div
              class="absolute bottom-3 left-3 bg-white text-gray-900 text-sm font-semibold
          px-4 py-2 rounded-full shadow z-10"
            >
              ₹ {r.price}/ night
            </div>

            <img
              src={`http://localhost:3000/uploads/hotels/${r.mainImage}`}
              class="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          <div class="p-6 text-center">
            <h3 class="text-lg font-semibold mb-1">{r.roomTypeCode}</h3>

            <div class="flex justify-center gap-4 text-sm text-gray-500 mb-3">
              <span>🛏 {r.bedConfiguration?.[0] || "Comfort Bed"} </span>
              <span>❄ {r.ac} </span>
              <span>👥 {r.maxOccupancy} Guests</span>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed mb-4">
              {r.description ||
                "Modern room with premium comfort, ideal for a relaxing stay."}
            </p>

            {/* <% if (availableRooms > 0 && availableRooms <= 3) { %> */}
            <p class="text-sm text-red-600 font-medium mb-3">
              Only availableRooms rooms left
            </p>
            {/* // <% } %> */}

            <NavLink
              to={`/hotels/hotelDetails/${id}/rooms/roomDetails/${r._id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5
             rounded-lg bg-indigo-600 text-white text-sm font-semibold
             shadow-md hover:bg-indigo-700 hover:shadow-lg
             transition-all duration-300 group"
            >
              View Details
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
}

export default Rooms;
