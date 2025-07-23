import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import LightRays from '../../light/LightRays/LightRays';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (userData) => {
    // check if passwords match
    if (userData.password !== userData.cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const success = registerUser(userData);
    if (success) {
      toast.success('Registered successfully!');
      navigate('/login');
    } else {
      toast.error('User already exists!');
    }
    reset();
  };

  // watch password value for confirming password match
  const password = watch("password", "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* 🔥 LightRays animated background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.input
            {...register("username", { required: "Username is required" })}
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          {errors.username && (
            <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
          )}

          <motion.input
            {...register("email", { required: "Email is required" })}
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}

          <motion.input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
          )}

          <motion.input
            {...register("cpassword", {
              required: "Confirm password is required",
              validate: value =>
                value === password || "Passwords do not match"
            })}
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          {errors.cpassword && (
            <p className="text-red-400 text-xs mt-1">{errors.cpassword.message}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white/10 text-white p-3 rounded-md border border-white/20 hover:bg-white/20 transition"
          >
            Register
          </motion.button>
        </form>
        <p className="mt-5 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <span
            className="text-white underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
