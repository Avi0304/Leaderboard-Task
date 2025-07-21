import React from "react"
import { LuHistory, LuActivity } from "react-icons/lu"
import HistoryItem from "./HistoryItem"

export default function HistoryCard({ claimHistory = [] }) {
  console.log(claimHistory);

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-800">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LuHistory className="w-5 h-5 mr-2 text-indigo-500" />
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5">
        Latest point claims and achievements
      </p>

      {/* Content box */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
        {claimHistory.length === 0 ? (
          <div className="text-center py-8">
            <LuActivity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No activity yet</p>
            <p className="text-sm text-gray-400">
              Start claiming points to see history
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {claimHistory.map((entry, index) => (
              <HistoryItem key={entry.id || index} entry={entry} isLatest={index === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
