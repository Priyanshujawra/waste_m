import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/login",
          values
        );
        login(data);
        navigate("/dashboard");
      } catch (error) {
        console.log("Login failed", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <form
          onSubmit={formik.handleSubmit}
          className=" p-8 rounded-2xl  max-w-md w-full"
        >
          <h2 className="text-2xl font-bold  text-white mb-6">
            Welcome to EcoWaste
          </h2>
          <p className=" text-gray-400 mb-4">
            Please enter your account details to manage your waste disposal and
            recycling.
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-green-500 focus:border-green-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400 text-sm mt-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:ring-green-500 focus:border-green-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-400 text-sm mt-2">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Forgot Password Link */}
          <div className="mb-4 text-right">
            <a
              href="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Sign in
            </button>
          </div>

          {/* Create Account Link */}
          <div className="mt-6 text-center">
            <a
              href="/register"
              className="text-sm text-green-400 hover:underline"
            >
              Create an account
            </a>
          </div>
        </form>
      </div>

      {/* Right Section: Promotional/Info Section */}
      <div className=" flex-1 bg-cover bg-[url('https://png.pngtree.com/thumb_back/fw800/background/20240727/pngtree-photo-tropical-leaves-background-jungle-rainforest-plants-wallpaper-image_16115972.jpg')]">
        <div className="flex-1  text-white bg-black bg-opacity-60 h-full flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            “At EcoWaste, we’re committed to a cleaner environment. Manage your
            waste pickups, track your recycling progress, and make an impact.”
          </p>
          <p className="text-sm">- Jane Doe, Environmental Specialist</p>

          {/* Call to Action */}
          <div className="mt-10 bg-white w-96 text-green-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Join the Movement</h3>
            <p className="text-sm mt-2">
              Become part of a sustainable community. Schedule waste
              collections, get recycling tips, and see the difference you make.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
