import React from 'react';
import { auth } from '../firebase-config';
import { toast } from 'react-toastify';

const Navbar = ({ setLoggedIn }) => {
  const logout = () => {
    auth.signOut();
    setLoggedIn(false);
    toast.success("Logged out successfully");
  };

  return (
    <nav className="w-full flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
