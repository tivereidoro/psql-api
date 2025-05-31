/**
 * Error handling middleware..
 * Catches errors that occur during request processing
 * and sends a generic error response to the client.
 * It logs the error stack to the console for debugging purposes.
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: "An unexpected error occurred.",
    error: err.message,
    // error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
