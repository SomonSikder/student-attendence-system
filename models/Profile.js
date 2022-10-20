const { model, Schema } = require("mongoose");

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  avater: String,
});

const Profile = model("Profile", profileSchema);
module.exports = Profile;
