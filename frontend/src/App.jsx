import React, { useEffect, useState } from 'react';
import api from './api';
import { LuTrophy, LuSparkles, LuUsers, LuTrendingUp } from 'react-icons/lu';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import ClaimPointsCard from './components/ClaimButton';
import AddUserCard from './components/AddUserForm';
import LeaderboardCard from './components/Leaderboard';
import HistoryCard from './components/HistoryCard';


function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, totalPointsClaimed: 0 });
  const [claimHistory, setClaimHistory] = useState([]);


  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      const data = Array.isArray(res.data.user) ? res.data.user : [];
      console.log('Fetched users:', data);

      setUsers(data);
      setStats({
        totalUsers: data.length,
        totalPointsClaimed: data.reduce((acc, user) => acc + (user.points || 0), 0),
      });

      if (!selectedUserId && data.length > 0) {
        setSelectedUserId(data[0]._id);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchClaimHistory = async (userId) => {
    if (!userId) return;
    try {
      const res = await api.get(`/claim-history`);
      const history = Array.isArray(res.data) ? res.data : [];
      setClaimHistory(history.reverse()); // newest at top
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };


  const handleClaimPoints = async () => {
    if (!selectedUserId) return;
    setIsLoading(true);
    try {
      await api.post(`/users/${selectedUserId}/claim`);
      await fetchUsers();
      await fetchClaimHistory(selectedUserId);
    } catch (error) {
      console.error('Error claiming points:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (name) => {
    try {
      await api.post('/users', { name });
      await fetchUsers();
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchClaimHistory(selectedUserId);
  }, [selectedUserId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="relative z-10 p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <LuTrophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Leaderboard System
            </h1>
            <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-lg">
              <LuSparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select users, claim points, and watch the rankings change in real-time with our dynamic leaderboard system!
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
              <LuUsers className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-700">{stats.totalUsers} Users</span>
            </div>

          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <ClaimPointsCard
              users={users}
              selectedUserId={selectedUserId}
              onUserSelect={setSelectedUserId}
              onClaimPoints={handleClaimPoints}
              isLoading={isLoading}
            />
            <AddUserCard onAddUser={handleAddUser} />
          </div>

          {/* Leaderboard */}
          <div className="xl:col-span-3">
            <LeaderboardCard users={users} stats={stats} />
          </div>

          <div className='xl:col-span-4'>
            <HistoryCard claimHistory={claimHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
