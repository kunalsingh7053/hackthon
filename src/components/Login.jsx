import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import LightRays from '../../light/LightRays/LightRays';

const Login = () => {
  const navigate = useNavigate();
  const { users, setCurrentUser } = useContext(AppContext);  

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const foundUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (foundUser) {
      setCurrentUser(foundUser);   
      toast.success('Logged in successfully!');
      navigate('/products');       
    } else {
      toast.error('Invalid email or password!');
      navigate('/register');       
    }

    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* 🔥 Add LightRays effect in background */}
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
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.input
            {...register('email', { required: true })}
            whileFocus={{ scale: 1.02, borderColor: '#ffffff' }}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          <motion.input
            {...register('password', { required: true })}
            whileFocus={{ scale: 1.02, borderColor: '#ffffff' }}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-transparent border border-white/30 rounded-md text-white placeholder-gray-400 outline-none focus:border-white transition"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-white/10 text-white p-3 rounded-md border border-white/20 hover:bg-white/20 transition"
          >
            Login
          </motion.button>
        </form>
        <p className="mt-5 text-sm text-center text-gray-400">
          Don’t have an account?{' '}
          <span
            className="text-white underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
