const express = require('express');
const router = express.Router();

const {getUser, addUser, claimPoints, getLeaderBoard, getclaimedHistory} = require('../controllers/UserController');

router.get('/users', getUser);
router.post('/users', addUser);
router.post('/users/:id/claim', claimPoints);
router.get('/leaderboard', getLeaderBoard);
router.get('/claim-history', getclaimedHistory);

module.exports = router