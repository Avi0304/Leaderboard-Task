import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export function UserSelector({ users, selectedUserId, onUserSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedUser = Array.isArray(users)
    ? users.find((user) => user._id === selectedUserId)
    : null;

  const rankedUsers = [...users]
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  return (
    <div className="space-y-2 relative w-full max-w-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-12 px-4 border-2 border-gray-200 rounded-md shadow-sm hover:border-blue-400 bg-transparent transition-colors backdrop-blur"
      >
        <span className="text-gray-800 text-sm truncate">
          {selectedUser ? selectedUser.name : "Select a user..."}
        </span>
        <LuChevronDown
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && Array.isArray(rankedUsers) && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-200 shadow-lg backdrop-blur bg-white/20">
          {rankedUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                onUserSelect(user._id);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100/40 cursor-pointer rounded-md"
            >
              {/* Avatar Fallback */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center text-xs font-bold">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">Rank #{user.rank ?? "-"}</div>
              </div>

              {/* Points Badge */}
              <div className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                {user.totalPoints ?? 0} pts
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
