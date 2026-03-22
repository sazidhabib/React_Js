const { z } = require("zod");

// Zod schema for video creation
const videoSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),

    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be less than 500 characters"),

    src: z
        .string()
        .min(1, "Video URL is required")
        .regex(
            /^(http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
            "Please enter a valid YouTube URL"
        ),
});

module.exports = videoSchema;
