function LoadingSpinner() {
  return (
    <div class="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      {/* <div class="h-14 w-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div> */}

      <div
        class="h-14 w-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
}

export default LoadingSpinner;
