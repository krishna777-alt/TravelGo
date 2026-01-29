function AdminDashboard() {
  return (
    <div class="bg-gray-100">
      <div class="flex min-h-screen">
        {/* ///sidebar */}

        <main class="flex-1 p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            Dashboard Overview
          </h1>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="card">Total Places</div>
            <div class="card">Hotels Listed</div>
            <div class="card">User Reviews</div>
            <div class="card">Registered Users</div>
          </div>
        </main>
      </div>

      {/* <style>
    .sidebar-link {
    @apply flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition;
    }

    .sidebar-link.active {
    @apply bg-blue-600 text-white shadow;
    }

    .card {
    @apply bg-white rounded-xl shadow p-6 text-lg font-semibold text-gray-700 hover:shadow-lg transition;
    }
</style> */}
    </div>
  );
}

export default AdminDashboard;
