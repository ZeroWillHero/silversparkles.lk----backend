const db = require('../../../model/mysql/index');
const Ads = db.ads;
const cloudinary = require("../../../manager/cloudnary");

const ads = async (req, res) => {
    const {
        videoUrl
    } = req.body;

    console.log("run")
    console.log('req.body', req.body);
    console.log('req.files', req.files);
    // const images = req.files.map(file => {
    //     return {
    //         url: '/uploads/' + file.filename 
    //     };
    // });

    // Upload images to Cloudinary
    const images = await Promise.all(req.files.map(file => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) return reject(error);
                resolve({ url: result.secure_url });
            }).end(file.buffer);
        });
    }));


    try {
        const media = await Ads.create({
            videoUrl,
            images: JSON.stringify(images),
        });

        res.status(201).json(media);
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = ads;
