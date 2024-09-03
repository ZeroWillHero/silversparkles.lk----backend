const db = require('../../../model/mysql/index');
const Ads = db.ads;

const getAds = async (req, res) => {
    try {

        const media = await Ads.findAll();

        res.status(200).json(media);
    } catch (error) {
        console.error('Error fetching Media:', error);
        res.status(500).json({ message: 'An error occurred while fetching Media.' });
    }
};

module.exports = getAds;
