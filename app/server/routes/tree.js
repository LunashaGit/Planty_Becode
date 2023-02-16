const express = require('express');
//import controllers functions 
const { getTree, 
    displayComments,
    getPrice, 
    buyTree, 
    lockTree, 
    unlockTree,
    getLockPrice } = require('../controllers/treeController');

//instance of the express router 
const router = express.Router();

//getAll tree
router.get('/all', getTree);

router.get(`/:name`, displayComments);

router.get(`/price/:name`, getPrice);

router.get(`/buy/:name`, buyTree);

router.get(`/lockprice/:name`, getLockPrice)

router.get(`/lock/:name`, lockTree);

router.get('/unlock/:name', unlockTree);

module.exports = router;