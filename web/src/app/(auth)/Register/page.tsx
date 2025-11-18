"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import { useAuthStore } from "../../../../store/useAuthStore";
import Image from "next/image";

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, user, isLoading, error } = useAuthStore();

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length > 30) {
      errors.name = "Must be 30 characters or less";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      await register(values.name, values.email, values.password);
      resetForm();
    },
  });

  return (
    <section className="min-h-screen bg-base px-4">
      <p className="text-xl md:text-2xl text-center text-primary font-semibold font-open-sans p-10">
        Begin your adventure!
      </p>
      <div className="w-full h-fit flex items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-base rounded-lg p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-semibold text-dark mb-6 text-center">
            SignUp
          </h1>

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`mt-1 block w-full border-b px-3 py-2 text-sm focus:outline-none ${
                formik.touched.name && formik.errors.name
                  ? "border-error"
                  : "border-gray-300 focus:border-b-primary"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-xs text-error">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-1 block w-full border-b px-3 py-2 text-sm focus:outline-none ${
                formik.touched.email && formik.errors.email
                  ? "border-error"
                  : "border-gray-300 focus:border-b-primary"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-xs text-error">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <span
                className="cursor-pointer absolute top-2 border-r px-1 border-r-dark/50"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
              </span>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 block w-full border-b px-9 py-2 text-sm focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-b-primary"
                }`}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-md font-open-sans hover:bg-primary-lighter transition-colors cursor-pointer"
          >
            Get Started
          </button>
          {error && (
            <p className="mt-4 text-center text-sm text-error">{error}</p>
          )}
          <p className="text-small text-center py-3">
            Got an Account?{" "}
            <Link href="/Login" className="text-blue-700 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
