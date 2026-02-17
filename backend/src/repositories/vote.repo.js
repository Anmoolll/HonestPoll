import VoteModel from "../models/vote.model.js";

export async function findVoteByPollIdAndUserId(pollId, userId) {
    try {
        const vote  = VoteModel.findOne({pollId : pollId, userId : userId});
        return vote;
    }
    catch(err){
        throw err;
    }
}


export async function findVoteByPollIdAndClientId(pollId, clientId) {
    try {
        const vote = await VoteModel.findOne({ pollId, clientId });
        return vote;
    } catch (err) {
        throw err;
    }
}

export async function countVotesByPollIdAndIp(pollId, ipAddress) {
    try {
        const count = await VoteModel.countDocuments({ pollId, ipAddress });
        return count;
    } catch (err) {
        throw err;
    }
}


export async function createVote(pollId, userId, optionId, clientId, ipAddress) {
    try{
        const vote = VoteModel.create({
            pollId,
            userId,
            optionId,
            clientId,
            ipAddress,
        });

        return vote;
    }
    catch(err){
        throw err;
    }
}