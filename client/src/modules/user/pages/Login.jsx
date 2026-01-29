import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthContext";

function Google() {
  return (
    <div class="w-full">
      <button class="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 font-medium text-gray-700">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          class="w-6 h-6"
          alt="Google Icon"
        />
        Sign in with Google
      </button>
    </div>
  );
}

function SignUpLink() {
  return (
    <p class="text-white text-center mt-4">
      Don’t have an account?
      <NavLink to="/signup" class="text-blue-300 font-semibold hover:underline">
        Sign Up
      </NavLink>
    </p>
  );
}

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setIsLoggedIn } = useContext(AuthContext);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    setFormData({ email: "example@gmail.com", password: "1234" });
  }, []);
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      switch (data.status) {
        case 200:
          setIsLoggedIn(true);
          return navigate("/");

        case 401:
          toast.error(data.message);
          break;
        case 500:
          toast.error(data.message);
          break;
        default:
          toast.error(data.message || "An error occurred");
      }
      console.log(data);
    } catch (error) {
      toast.error("Network error. Please try again.", error.message);
    }
  }

  // console.log("Form:", formData);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1513238164698-099ca7f34021?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div class="h-full w-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h2 class="text-3xl font-bold text-white text-center mb-6">
            Welcome Back 👋
          </h2>

          <br />
          <Google />
          <LoginForm
            formData={formData}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />

          <SignUpLink />
        </div>
      </div>
    </div>
  );
}

function LoginForm({ formData, onChange, onSubmit }) {
  return (
    <form autoComplete="off" onSubmit={onSubmit} class="space-y-4">
      <div>
        <label class="text-white font-medium">Email</label>
        <input
          onChange={onChange}
          value={formData.email}
          type="email"
          autoComplete="off"
          name="email"
          required
          class="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300 outline-none"
        />
      </div>

      <div>
        <label class="text-white font-medium">Password</label>
        <input
          onChange={onChange}
          value={formData.password}
          autoComplete="off"
          type="password"
          name="password"
          required
          class="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300 outline-none"
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 mt-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
