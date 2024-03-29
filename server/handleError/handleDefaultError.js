export default (err, req, res) => {
    console.log(err);
    const errorStatus = err.status || 500;
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: err.message || "Что-то пошло не так!",
        details: err.details,
    });
}