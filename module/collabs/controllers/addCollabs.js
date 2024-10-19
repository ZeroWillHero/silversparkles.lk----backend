const db = require('./../../../model/mysql/collabsModel');
const Collabs = db.collabs;
const cloudinary = require("../../../manager/cloudnary");

const addCollabs = async (req, res) => {
    const { name } = req.body;
    const image = req.file; // Assuming single file upload
    let imageUrl = '';

    console.log(image);

    if (image) {
        try {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }).end(image.buffer);
            });
            imageUrl = result.secure_url;
        } catch (error) {
            return res.status(400).json({ error: 'Image upload failed' });
        }
    }

    try {
        const collabs = await Collabs.create({
            name,
            image: imageUrl,
        });

        res.status(201).json(collabs);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = addCollabs;