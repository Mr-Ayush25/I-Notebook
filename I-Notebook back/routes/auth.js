const express = require("express");
const User = require("../models/User");
// impoerting jwt and bcrypt.
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Express validator methods.
const { check, validationResult } = require("express-validator");
// Importing Router.
const router = express.Router();
// Importing Middleware.
const fetchuser = require("../middleware/fetchuser");

//Route1: Create a User Data.Sign-In a User.No Login required {
router.post(
  "/createuser",
  [
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 4,
      max: 20,
    }),
    check("password", "Password length should be 8 to 10 characters").isLength({
      min: 8,
      max: 20,
    }),
  ],
  async (req, res) => {
    try {
      // Similar Email is used
      const query = User.where({ email: `${req.body.email}` });
      let user = await query.findOne();
      if (user) {
        res.status(400);
        return res.json({ errors: "Sorry user already exists." });
      }
      // If there are errors are availble.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400);
        return res.json(errors);
      }
      // If there is no error then we will
      // Using bcrypt to generate salt and hashed password.
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new use db using User Model.
      // saving user data to mongo db.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // Now we can't send user directly password for login instead we will send a token to login.
      // for creation of jwt and implementing signature on token.
      const data = {
        user: {
          id: user.id,
        },
      };
      // create token.
      const token = jwt.sign(data, process.env.JWT_SECRET);
      // Sending token to user.
      res.json({ token });
    } catch (error) {
      // If any error Occurred.
      res.status(500);
      res.send("Internal Server Error has occured:" + error);
    }
  }
);
// }

// Route2: Authenticating a User Data.Log-In a User.No Login required {
router.post(
  "/Login",
  [
    check("email", "Email length should be 10 to 30 characters.")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    // If there are errors availble.
    const success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return res.json({ success, errors });
    }

    // Taking data from user.
    const { email, password } = req.body;

    try {
      // Getting data from Mongo database.
      let user = await User.findOne({ email: email });
      // User credentional doesn't match .
      if (!user) {
        res.status(400);
        return res.json({
          success,
          error: "Please try to login with correct credential.",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      // If password is wrong.
      if (!passwordCompare) {
        res.status(400);
        return res.json({
          success,
          error: "Please try to login with correct credential",
        });
      }
      // If everything is Right.
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } catch (error) {
      // If any internal error has Occurred.
      res.status(500);
      res.send("Internal Server Error has occured:" + error);
    }
  }
);

// Route 3: Get LoggedIn user Deatils using post "/api/auth/getuser" .logIn is Required.
// fetchuser is middleware it will before the execution.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // getting id from req.user
    const { id } = req.user;
    // searching in database by id.& selecting the attributes of that entity except(password).
    const user = await User.findById(id).select("-password");
    res.send({ user });
  } catch (error) {
    // If any internal error has Occurred.
    res.status(500);
    res.send("Internal Server Error has occured:" + error);
  }
});

module.exports = router;
