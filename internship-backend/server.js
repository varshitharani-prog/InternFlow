const connectDB = require("./config/db");
const Application = require("./models/Application");
const User=require("./models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const express = require("express");
const cors=require("cors");
const upload = require("./middleware/upload");
const { verifyToken } = require("./middleware/authMiddleware");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/uploads", express.static("uploads"));
//POST API
app.post("/applications", verifyToken, async (req, res) => {
  try {
    const newApplication =
      await Application.create({
        ...req.body,
        userId: req.userId
      });

    res.json(newApplication);

  } catch (error) {
    res.status(500).json({
      message: "Error adding application"
    });
  }
});

//GET API
app.get("/applications", verifyToken, async (req, res) => {
  try {
    const applications =
      await Application.find({
        userId: req.userId
      });

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching applications"
    });
  }
});

//UPDATE API
app.put("/applications/:id", verifyToken, async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId
      },
      req.body,
      { returnDocument: "after" }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating application"
    });
  }
});

//DELETE API
app.delete("/applications/:id", verifyToken, async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Deleted successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting application"
    });
  }
});

app.get("/applications/:id", verifyToken, async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching application"
    });
  }
});
app.post("/register", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      message: "User registered successfully. Now user can login"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration failed(may be the account is already registered)"
    });
  }
});

app.post("/login",async (req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
  
    if(!user){
      return res.status(400).json({
        message:"User not found. Register to Login",
      });
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({
        message:"Invalid password",
      });
    }
    const token=jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );
    res.json({
      message:"Login successful",
      token,
    });
  }
  catch(error){
    res.status(500).json({
      message:"Login failed",
    });
  }
});


//Profile API

// GET PROFILE
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching profile"
    });
  }
});

// SAVE PROFILE
app.post(
  "/profile",
  verifyToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "cgpaSheet", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const userId = req.userId;

      const user = await User.findById(userId);

      const updateData = {
        ...req.body
      };

      // Update only if new file uploaded
      if (req.files?.resume) {
        updateData.resume = req.files.resume[0].path;
      }

      if (req.files?.cgpaSheet) {
        updateData.cgpaSheet = req.files.cgpaSheet[0].path;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { returnDocument: "after" }
      );

      res.json(updatedUser);

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Error saving profile"
      });
    }
  }
);

app.get("/analytics", verifyToken, async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.userId
    });

    const analytics = {
      total: applications.length,
      applied: 0,
      oa: 0,
      interview: 0,
      rejected: 0,
      selected: 0
    };

    applications.forEach((app) => {
      const status = app.status?.toLowerCase();

      if (status === "applied") analytics.applied++;
      else if (status === "oa scheduled") analytics.oa++;
      else if (status === "interview scheduled") analytics.interview++;
      else if (status === "rejected") analytics.rejected++;
      else if (status === "selected") analytics.selected++;
    });

    res.json(analytics);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching analytics"
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});