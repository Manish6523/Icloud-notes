const express = require("express");
const router = express.Router();
const { query, body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "manish6523@sharma";
let success = false
//Route 1---------------Create a user in ""post"" method : ""/api/auth/createUsers"" .no login required
router.post(
  "/createUsers",
  async (req, res) => {
    // Check for errors
    let success=false
    const result = validationResult(req);
    // if (result.isEmpty()) {
    //   return res.send(`Hello, ${req.query.name}!`);
    // }
    // res.send({ errors: result.array() });

    // checks for user with same email alaready exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false
        return res.status(400).json({ errors: "this user is already exists " });
      }

      // create password securith with hash and salt
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create new users
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      console.log(req.body);
      const data = {
        user: {
          id: user.id,
          name: user.name
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      console.log(success,user, authToken);
      res.json({ success,user, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('error Occured')
    }
  }
);

//Route 2---------------login a user in ""post"" method : ""/api/auth/login""

router.post(
  "/login",
  [body("email", 'enter a valid Email').isEmail(), body("password", 'Password cannot be Empty').exists()],
  async (req, res) => {
    let success=false
    // Check for errors
    const result = validationResult(req);
    // if (result.isEmpty()) {
    //   return res.send(`Hello, ${req.query.name}!`);
    // }

    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: 'invalid Credentials' })
      }
      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ error: 'invalid Credentials' })
      }
      const data = {
        user: {
          id: user.id,
          name: user.name
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      console.log(success)
      res.json({ success,user, authToken })
    } catch (error) {
      console.error(error.message);
      res.status(500).send('internal error Occured')
    }
  }
);

//Route 3---------------Get user Details in ""post"" method : ""/api/auth/getuser""
router.post("/getuser", fetchuser,async (req, res) => {
try {
  userId = req.user.id
  const user = await User.findById(userId).select('-password')
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send('internal error Occured')
}
});

module.exports = router;
