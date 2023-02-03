const { default: mongoose } = require('mongoose');
const Player = require('../models/playerModel')

// Get all info of a player
const getAccount = async(req,res) => {
    const { username } = req.params;
    const player = await Player.findOne({username: username}).select('-password');

    try {
    if(!player){
        throw Error(`This username doesn't exist`);
    }
    
    res.status(200).json(player);

    return player;
    
    } catch(error) {
    res.status(400).json({error: error.message});
}
}

//Failed attempt
    // const player = await Player.findOne({username: req.params.username}, function(err, username) {
    //     if(err){
    //         return res.status(404).json({error: 'Username does not exist'});
    //     } else {
    //         res.status(200).json(player);
    //     }});
//}

// Get all players in a list
const getPlayers = async(req,res) => {
    try {
    const players = await Player.find({}).sort({leafs: -1});

    res.status(200).json(players);
    // console.log(players);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// Update the player

// Delete the player

// Export all the function

module.exports = { 
    getAccount,
    getPlayers
};