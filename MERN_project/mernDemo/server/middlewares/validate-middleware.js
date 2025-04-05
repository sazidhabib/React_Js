const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body); // validate the body against the schema
        next();
    } catch (error) {
        console.log("Validation error:", error);
        // Check if it's a ZodError with issues
        if (error.errors && Array.isArray(error.errors)) {
            const message = error.errors[0].message;
            res.status(400).json({ msg: message });
        } else {
            // Fallback for unexpected errors
            res.status(500).json({ msg: "Something went wrong during validation." });
        }
    }
};

module.exports = validate;
