const e = require("express");

//validate-middleware
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        const status = 422;
        const message = error.errors[0].message;
        const errors = {
            status,
            message
        }
        // res.status(400).json({
        //     msg: error.errors[0].message
        // });
        next(errors);
    }
};

module.exports = validate;