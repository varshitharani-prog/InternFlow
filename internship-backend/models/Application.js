const mongoose=require("mongoose");
const applicationSchema =new mongoose.Schema({
    company: String,
    role: String,
    status: String,
    location: String,
    oaDateTime: String,
    interviewDateTime: String,
    notes: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Application=mongoose.model("Application",applicationSchema);

module.exports=Application;