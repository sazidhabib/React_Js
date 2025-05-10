const { z } = require('zod');

const songSchema = z.object({
    title: z.string().min(1, "Title is required"),
    youtubeUrl: z.string().url("Must be a valid YouTube URL"),
    position: z.number().optional(), // optional with default in model
});

module.exports = songSchema;
