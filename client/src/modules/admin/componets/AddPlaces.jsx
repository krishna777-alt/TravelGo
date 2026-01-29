import GoBackLink from "./GoBackLink";

function AddPlaces() {
  return (
    <>
      <GoBackLink />
      <form
        action="http://localhost:3000/admin/createPlaces"
        method="POST"
        enctype="multipart/form-data"
        class="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label class="font-medium">Title</label>
          <input
            name="title"
            type="text"
            class="w-full p-3 border rounded-lg"
            placeholder="Kerala 3-Day Trip"
          />
        </div>

        <div>
          <label class="font-medium block mb-2">Location</label>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-gray-600">Longitude</label>
              <input
                name="long"
                type="text"
                class="w-full p-3 border rounded-lg"
                placeholder="75.12345"
              />
            </div>

            <div>
              <label class="text-sm text-gray-600">Latitude</label>
              <input
                name="lat"
                type="text"
                class="w-full p-3 border rounded-lg"
                placeholder="10.12345"
              />
            </div>
          </div>
        </div>
        <div>
          <label class="font-medium">Description</label>
          <textarea
            name="description"
            class="w-full p-3 border rounded-lg"
            rows="4"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="font-medium">Price Per Person</label>
            <input
              name="price"
              type="number"
              class="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label class="font-medium">Days</label>
            <input
              name="days"
              type="text"
              class="w-full p-3 border rounded-lg"
              placeholder="3D"
            />
          </div>
          <div>
            <label class="font-medium">State</label>
            <input
              name="state"
              type="text"
              class="w-full p-3 border rounded-lg"
              placeholder="Kerala"
            />
          </div>
        </div>
        <div>
          <label class="block mb-1 font-semibold">Nights</label>
          <input
            name="nights"
            type="number"
            class="w-full p-3 border rounded"
            placeholder="2N"
          />
        </div>
        <div>
          <label class="block mb-1 font-semibold">
            Includes (comma separated)
          </label>
          <input
            name="includes"
            placeholder="Hotel, Food, Taxi"
            class="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label class="block mb-1 font-semibold">
            Excludes (comma separated)
          </label>
          <input
            name="excludes"
            placeholder="Flights, Insurance"
            class="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label class="font-medium">Upload Images</label>
          <input
            name="image"
            type="file"
            multiple
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium">Upload galary Images</label>
          <input
            name="galleryImage"
            type="file"
            multiple
            class="w-full p-3 border rounded-lg"
          />
        </div>

        <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Publish Package
        </button>
      </form>
    </>
  );
}

export default AddPlaces;
