import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
// components/Toast.jsx

function Google() {
  return (
    <div className="w-full">
      <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 font-medium text-gray-700">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-6 h-6"
          alt="Google Icon"
        />
        Sign in with Google
      </button>
    </div>
  );
}

function LoginAllReady() {
  return (
    <p className="text-white text-center mt-4">
      Already registered?
      <NavLink
        to="/login"
        className="text-green-300 font-semibold hover:underline"
      >
        Login
      </NavLink>
    </p>
  );
}

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const response = await axios.post(
        "http://localhost:3000/api/v1/signup",
        formData
      );

      const { data, status: st } = response;
      if (st >= 200 && st < 300) {
        toast.success(data?.message || "Account created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      } else {
        toast.error(data?.message || "Failed to create account!");
      }
      console.log("DATA:", data);
    } catch (err) {
      console.log("ERROR:", err);
      toast.error(
        err?.response?.data?.message || err.message || "Signup failed"
      );
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900/60 backdrop-blur-sm py-12">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800/90 border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Your Account ✨
        </h2>
        <Google />
        <div className="my-4" />
        <Form
          onChange={handleChange}
          onSubmit={handleSubmit}
          formData={formData}
        />
        <LoginAllReady />
      </div>
    </div>
  );
}

function Form({ onSubmit, onChange, formData }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-white font-medium">Full Name</label>
        <input
          onChange={onChange}
          value={formData.name}
          type="text"
          name="name"
          required
          className="w-full mt-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-300 outline-none"
        />
      </div>
      <div>
        <label className="text-white font-medium">Email</label>
        <input
          onChange={onChange}
          value={formData.email}
          type="email"
          name="email"
          required
          className="w-full mt-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-300 outline-none"
        />
      </div>
      <div>
        <label className="text-white font-medium">Password</label>
        <input
          onChange={onChange}
          value={formData.password}
          type="password"
          name="password"
          required
          className="w-full mt-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-300 outline-none"
        />
      </div>
      <div>
        <label className="text-white font-medium">Confirm Password</label>
        <input
          onChange={onChange}
          value={formData.confirm_password}
          type="password"
          name="confirm_password"
          required
          className="w-full mt-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-300 outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-4 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
      >
        Create Account
      </button>
    </form>
  );
}

export default Signup;
