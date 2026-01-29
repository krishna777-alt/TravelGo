function HotelDashBoard() {
  return (
    <div class="flex min-h-screen">
      <main class="flex-1 p-6 md:ml-0">
        <section id="dashboard" class="content-section">
          <h1 class="text-3xl font-semibold mb-6">
            Welcome, Manager manager?.name || "manager"
          </h1>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl shadow">
              <h3>Total Rooms</h3>
              <p class="text-3xl font-bold mt-2"> totalRooms</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow">
              <h3>Total Bookings</h3>
              <p class="text-3xl font-bold mt-2"> bookingCount</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow">
              <h3>Total Earnings</h3>
              <p class="text-3xl font-bold mt-2">₹ account</p>
            </div>
          </div>
        </section>

        <section id="hotel" class="content-section hidden">
          <h2 class="text-2xl font-semibold mb-4">Manage Hotel</h2>
          <div class="bg-white p-6 rounded-xl shadow">
            include("manageHotel")
          </div>
        </section>

        <section id="rooms" class="content-section hidden">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-semibold">Rooms</h2>
            <a
              href="/hotel/rooms/addRoom"
              class="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              + Add Room
            </a>
          </div>

          <div class="bg-white p-6 rounded-xl shadow">include("rooms")</div>
        </section>

        <section id="bookings" class="content-section hidden">
          <h2 class="text-2xl font-semibold mb-4">Bookings</h2>
          <div class="bg-white p-6 rounded-xl shadow">Booking list here</div>
        </section>

        <section id="earnings" class="content-section hidden">
          <h2 class="text-2xl font-semibold mb-4">Earnings</h2>
          <div class="bg-white p-6 rounded-xl shadow">
            Earnings analytics here
          </div>
        </section>

        <section id="profile" class="content-section hidden">
          <h2 class="text-2xl font-semibold mb-4">Profile</h2>
          <div class="bg-white p-6 rounded-xl shadow">
            Manager profile details
          </div>
        </section>
      </main>
    </div>
  );
}

export default HotelDashBoard;
