import React, { useState } from 'react';
import { UserSelector } from './UserSelector';
import { LuSparkle, LuZap } from 'react-icons/lu';
import api from '../api';
import {  toast, Bounce } from 'react-toastify';

const ClaimButton = ({
  users,
  selectedUserId,
  onUserSelect,
  onClaimPoints,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    if (!selectedUserId) return;

    try {
      setIsLoading(true);
      await api.post(`/users/${selectedUserId}/claim`);
      await onClaimPoints();
      toast.success('Claim Point Succussfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.error('Error claiming points:', err);
    } finally {
      setIsLoading(false);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300); // Animate briefly
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100 transition-transform hover:scale-[1.02]">
   
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <LuZap className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-black">Claim Points</h2>
        </div>
        <p className="text-sm font-medium text-gray-700 mt-1">
          Select a user and claim random points
        </p>
      </div>

      {/* User Selector */}
      <div className="mb-6">
        <UserSelector
          users={users}
          selectedUserId={selectedUserId}
          onUserSelect={onUserSelect}
        />
      </div>

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        disabled={!selectedUserId || isLoading}
        className={`w-full h-12 rounded-md text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-md transition-all duration-300
          bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600
          ${isAnimating ? 'animate-pulse scale-105' : ''}
          ${!selectedUserId || isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Claiming...
          </>
        ) : (
          <>
            <LuSparkle className="w-5 h-5" />
            Claim Points
          </>
        )}
      </button>
    </div>
  );
};

export default ClaimButton;
