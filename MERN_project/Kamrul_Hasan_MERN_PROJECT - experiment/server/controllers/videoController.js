const videos = require('../models/videos');

exports.getVideos = async (req, res, next) => {
    try {
        const videos = await videos.find().populate('user', 'name email');
        res.status(200).json({ success: true, data: videos });
    } catch (err) {
        next(err);
    }
};

exports.getVideo = async (req, res, next) => {
    try {
        const video = await videos.findById(req.params.id).populate('user', 'name email');

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

exports.createVideo = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const video = await videos.create(req.body);
        res.status(201).json({ success: true, data: video });
    } catch (err) {
        next(err);
    }
};

exports.updateVideo = async (req, res, next) => {
    try {
        let video = await videos.findById(req.params.id);

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

        video = await videos.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: video });
    } catch (err) {
        next(err);
    }
};

exports.deleteVideo = async (req, res, next) => {
    try {
        const video = await videos.findById(req.params.id);

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