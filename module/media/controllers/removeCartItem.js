const db = require('../../../model/mysql/index');
const Ads = db.ads;
const cloudinary = require("../../../manager/cloudnary");

const AdsRemove = async (req, res) => {
    try {
        const Id = req.params.id;

        // Fetch the media entry to get the image paths
        const mediaEntry = await Ads.findOne({
            where: {
                id: Id
            }
        });

        if (!mediaEntry) {
            return res.status(404).json({ error: 'Item not found' });
        }

        //const images = JSON.parse(mediaEntry.images);
        //const imagePaths = images.map(image => path.join(__dirname, '../../../uploads', path.basename(image.url)));

        // Function to extract public_id from secure_url
        const getPublicIdFromUrl = (url) => {
            const parts = url.split('/');
            const fileName = parts.pop();
            const publicId = parts.slice(7).join('/') + fileName.split('.')[0];
            //console.log('publicId:', publicId);
            return publicId;
        };

        // Delete existing images from Cloudinary
        if (mediaEntry.images) {
            const existingImages = JSON.parse(mediaEntry.images);
            await Promise.all(existingImages.map(image => {
                const publicId = getPublicIdFromUrl(image.url);
                return cloudinary.uploader.destroy(publicId);
            }));
        }

        // Delete the media entry from the database
        const deletedItem = await Ads.destroy({
            where: {
                id: Id
            }
        });

        if (deletedItem === 1) {
            // Delete the image files from the upload folder
            // imagePaths.forEach(filePath => {
            //     fs.unlink(filePath, err => {
            //         if (err) {
            //             console.error(`Failed to delete file: ${filePath}`, err);
            //         }
            //     });
            // });

            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = AdsRemove;
