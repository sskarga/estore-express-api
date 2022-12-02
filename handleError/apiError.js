export const apiError = (status, message, details) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    err.details = details || '';
    return err;
};