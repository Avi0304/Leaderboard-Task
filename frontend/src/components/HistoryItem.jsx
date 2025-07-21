import React from "react"
import { LuClock, LuZap } from "react-icons/lu"

export default function HistoryItem({ entry, isLatest = false }) {
  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-300 hover:shadow-md
        ${isLatest ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-200 animate-pulse" : "bg-white border-gray-200"}
      `}
    >
      {isLatest && (
        <div className="absolute -top-2 -right-2">
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full animate-bounce">
            New!
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar circle */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
            {entry.userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-gray-900">{entry.userName}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <LuClock className="w-3 h-3" />
              {new Date(entry.claimedAt).toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            <LuZap className="w-3 h-3 mr-1" /> +{entry.pointsclaimed}
          </span>
        </div>
      </div>
    </div>
  )
}
