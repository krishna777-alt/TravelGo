function PageNotFound() {
  return (
    <div class="bg-gray-50 text-gray-800">
      <div class="min-h-screen flex items-center justify-center px-6">
        <div class="max-w-xl w-full text-center bg-white rounded-2xl shadow-lg p-10">
          <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl">
            🚧
          </div>

          <h1 class="text-3xl font-bold tracking-tight mb-3">Page not found</h1>

          <p class="text-gray-600 leading-relaxed mb-8">
            The page you’re looking for doesn’t exist or may have been moved.
            Don’t worry, even the best journeys take a wrong turn sometimes.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Go to Home
            </a>

            <a
              href="/places"
              class="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Browse Places
            </a>
          </div>

          <p class="mt-8 text-sm text-gray-400">Error 404 · Page Not Found</p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
