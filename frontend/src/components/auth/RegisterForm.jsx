"use client";

import Button from "@/components/libs/Button";
import { useRegisterMutation } from "@/hooks/useAuthMutations";
import Link from "next/link";
import { useEffect, useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const registerMutation = useRegisterMutation();

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [registerMutation.isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    registerMutation.reset();

    if (!name || !email || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    registerMutation.mutate({
      name,
      email,
      password,
      confirm_password: confirmPassword,
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg'>
        <div>
          <img
            className='mx-auto h-16 w-auto'
            src='/logo.png' // Assuming logo is in public folder
            alt='Platform Logo'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-primary'>
            Create your account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='name' className='sr-only'>
                Full name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='confirm-password' className='sr-only'>
                Confirm password
              </label>
              <input
                id='confirm-password'
                name='confirm-password'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {formError && (
            <div className='text-red-500 text-sm text-center py-2'>
              {formError}
            </div>
          )}

          {registerMutation.isError && (
            <div className='text-red-500 text-sm text-center py-2'>
              {registerMutation.error?.message ||
                "Registration failed. Please try again."}
            </div>
          )}

          {registerMutation.isSuccess && (
            <div className='text-green-500 text-sm text-center py-2'>
              {registerMutation.data?.message ||
                "Registration successful! You are now logged in."}
            </div>
          )}

          <div>
            <Button
              type='submit'
              variant='contain'
              className='w-full'
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Create account"}
            </Button>
          </div>
        </form>
        <div className='text-sm text-center'>
          <p className='text-gray-600'>
            Already have an account?{" "}
            <Link
              href='/login'
              className='font-medium text-primary hover:text-primary-dark'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
