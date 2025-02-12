const Player = require("../models/playerModel");
const Tree = require("../models/treeModel");
const cron = require("node-cron");

// Add player trees x Leafs every 15 min
const addLeafs = async (username) => {
  try {
    const player = await Player.findOne({ username: username });
    const playerTrees = await Tree.find({ owner: username });
    let leafAmount = player.leafs;
    let leafGained = 0;

    for (i = 0; i < playerTrees.length; i++) {
      leafGained += playerTrees[i].price;
    }
    const options = {
      allowDiskUse: false,
    };

    const newLeafAmount = Math.floor(leafAmount + leafGained / 2);

    console.log(newLeafAmount);
    console.log(player._id);
    // Inject new amount in player
    const updateLeafPlayer = await Player.updateOne(
      { _id: player._id },
      { $set: { leafs: newLeafAmount } }
    );
    console.log(updateLeafPlayer);
    return updateLeafPlayer;
  } catch (err) {
    console.log(err);
  }
};

// Take back half of leafs every hour
const takeLeafs = async (username) => {
  const player = await Player.findOne({ username: username });
  const leafAmount = player.leafs;
  const newLeafAmount = Math.floor(leafAmount / 2);

  const updateLeafPlayer = await Player.updateOne(
    { _id: player._id },
    { $set: { leafs: newLeafAmount } }
  );

  return updateLeafPlayer;
};

// Manage the leafs calculus combined
const leafWallet = async () => {
  let allPlayer = await Player.find();
  for (i = 0; i < allPlayer.length; i++) {
    let username = allPlayer[i].username;
    // Start the timer to receives and remove leaves
    let scheduledScore = cron.schedule("* */15 * * * *", () => {
      addLeafs(username);
      cron.schedule("* */60 * * * *", () => {
        takeLeafs(username);
      });
    });
    scheduledScore.start();
  }
};

// Export the function
module.exports = { leafWallet, addLeafs };
