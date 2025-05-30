// Logger
export const logger = (req, res, next) => {
  console.log(`\n${req.method} ${req.url} • ${new Date().toUTCString()}\n`);
  next();
};
