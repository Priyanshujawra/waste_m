import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/register",
          values
        );
        alert("Registration successful");
      } catch (error) {
        console.error("Error during registration", error);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        className="flex w-10/12 max-w-5xl rounded-lg shadow-lg bg-white overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Create your account</h2>
          <p className="text-gray-600 mb-6">
            Let’s get started with your 30 days free trial
          </p>
          <Button
            variant="outlined"
            className="w-full mb-4"
            startIcon={
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google Logo"
                className="h-6 w-6"
              />
            }
          >
            Login with Google
          </Button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>
            <FormControlLabel
              control={<Checkbox name="terms" />}
              label="I agree to all Terms, Privacy Policy and Fees"
              className="text-gray-600 mb-4"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-2"
            >
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <motion.div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('/src/assets/homeplant.jpg')` }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col h-full justify-end p-8 bg-black bg-opacity-50">
            <h2 className="text-4xl text-white font-semibold mb-4">
              Join Us in Making a Difference
            </h2>
            <p className="text-white mb-4">
              Together, we can create a cleaner, greener planet through better
              waste management practices.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center text-white rounded-full border-white border p-2">
                <span>100% Community Support</span>
              </div>
              <div className="flex items-center text-white rounded-full border-white border p-2">
                <span>Eco-Friendly Initiatives</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
