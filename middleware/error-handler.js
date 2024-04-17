const {CustomAPIError} = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
    // we can change msg:<yourErrorMsg> to use customized error message, or the express will use the default one.
    // return res.status(500).json({msg:err})
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(err.status).json({msg: `Something went wrong, please try again`})
}

module.exports = errorHandlerMiddleware;