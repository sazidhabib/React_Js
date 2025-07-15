const Video = require('../models/videos');

const getVideos = async (req, res, next) => {
    try {
        const videoList = await Video.find().populate('user', 'name email');
        res.status(200).json({ success: true, data: videoList });
    } catch (err) {
        next(err);
    }
};

const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id).populate('user', 'name email');

        if (!video) {
            return res.status(404).json({
                success: false,
                message: `Video not found with id of ${req.params.id}`
            });
        }

        res.status(200).json({ success: true, data: video });
    } catch (err) {
        next(err);
    }
};

const createVideo = async (req, res, next) => {
    try {
        console.log("🔥 Controller reached");
        console.log("Request received with files:", req.file);
        console.log("Request body:", req.body);

        const videoData = {
            title: req.body.title,
            description: req.body.description,
            src: req.body.src,
            user: req.user.id
        };

        // Add thumbnail path if file was uploaded
        if (req.file) {
            videoData.thumbnail = req.file.path;
        }

        const video = await Video.create(videoData);

        console.log("Video created:", video);
        res.status(201).json({
            success: true,
            data: video
        });
    } catch (err) {
        console.error("Full error:", err);
        next(err);
    }
};


const updateVideo = async (req, res, next) => {
    try {
        let video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: `Video not found with id of ${req.params.id}`
            });
        }

        if (video.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this video`
            });
        }

        video = await Video.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: video });
    } catch (err) {
        next(err);
    }
};

const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: `Video not found with id of ${req.params.id}`
            });
        }

        if (video.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this video`
            });
        }

        await video.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo
};