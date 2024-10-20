const db = require('./../../../model/mysql/index');
const Collabs = db.collabs;
const cloudinary = require("../../../manager/cloudnary");


const getCollabs = async (req, res) => {
    try{
        const collab = await Collabs.findAll();
    res.status(200).json(collab);
    }catch(error){
        console.error('Error fetching Collabs:', error);
        res.status(500).json({ message: 'An error occurred while fetching Collabs.' });
    }
}

module.exports = getCollabs;