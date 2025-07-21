const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ message: "List of User", user });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.addUser = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(404).json({ error: "Name is Required" })
        }
        const user = new User({ name });
        await user.save();
        res.status(201).json({ message: "User Added Successfully...", user })
    } catch (error) {
        console.error('Error Adding users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.claimPoints = async (req, res) => {
    try {
        const { id } = req.params;
        const points = Math.floor(Math.random() * 10) + 1;

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not Found" })
        }

        user.totalPoints += points;
        await user.save();

        const history = new ClaimHistory({
            userId: user._id,
            userName: user.name,
            pointsclaimed: points
        });
        await history.save();

        res.status(200).json({ user, pointsclaimed: points })
    } catch (error) {
        console.error('Error Claiming points:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getLeaderBoard = async (req, res) => {
    try {
        const users = await User.find().sort({ totalPoints: -1 })
        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            totalPoints: user.totalPoints,
        }));
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching LeaderBoard:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getclaimedHistory = async (req, res) => {
    try {
        const history = await ClaimHistory.find().sort({claimedAt: -1});
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching claim History:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}