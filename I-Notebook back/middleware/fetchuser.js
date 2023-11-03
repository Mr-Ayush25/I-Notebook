const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  // Get the userId from jwt token and add id to req object
  const token = req.header("token");
  if (!token) {
    res.status(401);
    return res.send({ error: "Please authenticate using a valid token" });
  }
  // From jwt token extracting the user Id inherited from it.
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) {
      res.status(401);
      return res.send({ error: "Please authenticate using a valid token" });
    }
    // assign req.user value to id.
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401);
    return res.send({ error: error.message });
  }
};

module.exports = fetchuser;
