const path = require("path");

const express = require("express");

const transporter = require("../configs/mail");

const User = require("../models/user.model");

const router = express.Router();
 
router.get("/", async (req, res) => {
  try {
    

    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10; 

     

    const skip = (page - 1) * pagesize;  

    const users = await User.find().skip(skip).limit(pagesize).lean().exec();

    const totalPages = Math.ceil(
      (await User.find().countDocuments()) / pagesize
    );

    return res.status(200).send({ users, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    transporter.sendMail({
      from: '"Amazon admin" <admin@amazon.com>',  
      to: user.sellerEmail,  
      subject: "Welcome to masai school" + " " + req.body.firstName + " " + req.body.lastName,  
      text: " Hi" + " " + req.body.firstName + " " +  "Please confirm your email", 
       
      alternatives: [
        {
          contentType: "text/html",
          path: path.join(__dirname, "../mailers/user-created.mail.html"),
        },
        {
          filename: "user.txt",
          path: path.join(__dirname, "../mailers/user-details.txt"),
        },
      ],
    });

    return res.status(201).send({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
