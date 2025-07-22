import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register form submitted:', formData);
    // Clear form after submit
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#ffffff' }}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#ffffff' }}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#ffffff' }}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#ffffff' }}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
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
          Already have an account? <span className="text-white underline cursor-pointer" onClick={()=>navigate("/login")}>Login</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
