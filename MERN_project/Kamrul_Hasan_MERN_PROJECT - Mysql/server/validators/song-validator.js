const { z } = require('zod');

const songSchema = z.object({
    title: z.string().min(1, "Title is required"),
    youtubeUrl: z.string().url("Must be a valid YouTube URL"),
    position: z
        .union([z.string(), z.number()])
        .optional()
        .transform((val) => val !== undefined ? Number(val) : 9999),
});

module.exports = songSchema;
