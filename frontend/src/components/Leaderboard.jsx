import React, { useEffect, useState } from 'react';
import api from '../api';
import { UserRankItem } from './UserRankItem';
import { LuTrophy } from 'react-icons/lu';

const Leaderboard = ({ users }) => {
  const [data, setData] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await api.get('/leaderboard');
    setData(res.data);
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const rankedUsers = [...users]
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .map((user, index) => ({
    ...user,
    rank: index + 1,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">

      <div className='flex items-center gap-2'>
        <LuTrophy className='w-6 h-6 text-yellow-500' />
        <h2 className="text-2xl font-semibold text-gray-800">Leaderboard</h2>
      </div>

      <p className='text-gray-800 text-sm mb-4 font-semibold text-left'>Real-time rankings updated instantly</p>

      <div className="space-y-3 max-h-[468px] overflow-y-auto custom-scrollbar pr-2">
        {rankedUsers.map((user) => (
          <UserRankItem key={user.id} user={user} isNew={false} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
