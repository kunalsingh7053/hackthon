import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const { currentUser, logout, updateProfilePhoto, updateProfile } = useContext(AppContext);
  const fileInputRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || ''
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white  gap-5 text-red-400">
        <p className="text-xl">No user logged in. Please log in first.</p>
        <button className='px-4 py-2 rounded bg-gray-700 text-white' onClick={()=>navigate("/login")}>Login-First</button>
      </div>
    );
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    updateProfile({ username: form.username, email: form.email });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>

        <div className="flex justify-center mb-6">
          <img
            src={currentUser.photo || 'https://i.pinimg.com/1200x/a1/e4/d4/a1e4d4d0a35d0b1bca7d7e6b830d4e27.jpg'}
            alt="Profile"
            className="size-24 rounded-full object-cover border border-white/30"
          />
        </div>

        <div className="space-y-4 mb-6">
          {editMode ? (
            <>
              <input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full p-2 bg-transparent border border-white/30 rounded-md text-white"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2 bg-transparent border border-white/30 rounded-md text-white"
              />
            </>
          ) : (
            <>
              <p><span className="font-semibold">Username:</span> {currentUser.username}</p>
              <p><span className="font-semibold">Email:</span> {currentUser.email}</p>
            </>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-white/10 text-white p-2 rounded-md border border-white/20 hover:bg-white/20 transition"
          >
            Add / Change Picture
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            ref={fileInputRef}
            className="hidden"
          />

          {editMode ? (
            <button
              onClick={handleUpdate}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-white/10 text-white p-2 rounded-md border border-white/20 hover:bg-white/20 transition"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
