/**
 * Middleware to log requests to the console.
 * Logs the HTTP method, URL, and timestamp of each request.
 * Useful for debugging and API requests monitoring.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const logger = (req, res, next) => {
  console.log(`\n${req.method} ${req.url} • ${new Date().toUTCString()}\n`);
  next();
};
