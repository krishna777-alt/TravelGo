import { useNavigate } from "react-router-dom";

function GoBackLink() {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="
        inline-flex items-center gap-2 mb-6
        text-sm font-medium text-gray-600
        hover:text-blue-600
        transition-colors
      "
    >
      <span className="text-lg">←</span>
      Go back
    </button>
  );
}

export default GoBackLink;
