const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callBack) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // true means that the origin will be sent back and is allowed
      callBack(null, true);
    } else {
      callBack(new Error("Not allowed By CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
