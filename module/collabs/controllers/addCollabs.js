const db = require('./../../../model/mysql/index');
const Collabs = db.collabs;
const cloudinary = require("../../../manager/cloudnary");

const addCollabs = async (req, res) => {
    const { name } = req.body;
    

    const images = await Promise.all(req.files.map(file => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) return reject(error);
                resolve({ url: result.secure_url });
            }).end(file.buffer);
        });
    }));

    try {
        const collabs = await Collabs.create({
            name,
            images: JSON.stringify(images),
        });

        res.status(201).json(collabs);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = addCollabs;