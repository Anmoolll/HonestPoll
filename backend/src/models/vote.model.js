import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema(
  {
    pollId: {
      type: Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    // Logged-in user identifier (if available)
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    // Anonymous/browser identifier to limit repeat voting without login
    clientId: {
      type: String,
      required: false,
      index: true,
    },
    // IP address used as an additional signal against abusive repeat voting
    ipAddress: {
      type: String,
      required: false,
      index: true,
    },
    optionId: {
      type: Schema.Types.ObjectId,
      ref: "Option",
      required: true,
    },
  },
  { timestamps: true }
);


const VoteModel = mongoose.model("Vote", voteSchema);
export default VoteModel;