import { GlobalMcq } from '../models/globalMcq.js';
import { Mcq } from '../models/mcqModel.js';
import AsyncHandler from '../utilis/AsyncHandler.js';


// MAKING INTERVIEW INTO GLOBAL
export const makeGlobalMcq = AsyncHandler(async (req, res) => {
    const doc1 = await Mcq.findByIdAndUpdate(req.body.mcqId, { isGlobal: true });
    const doc = new GlobalMcq(req.body);
    const newDoc = await doc.save();
    res.status(200).json({ data: newDoc, message: "Success" });
}, 'error in making global mcq')

// GETTING ALL GLOBAL INTERVIEW
export const getAllGlobalMcqs = AsyncHandler(async (req, res) => {
    const doc = await GlobalMcq.find().populate({
        path: 'userId',
        select: "name",
    }).populate({
        path: 'likes',
        select: "name",
    });
    res.status(200).json({ data: doc, message: "Success" })
}, 'error in getting all global mcq')

export const globalUpdateMcq = AsyncHandler(async (req, res) => {

    let updatedDoc;
    // BELOW REQ.BODY.LIKES CONTAINS USERID 
    if (req.query.category == "likes" && req.query.type == "add") {
        updatedDoc = await GlobalMcq.findByIdAndUpdate(req.params.id, { $push: { likes: req.body?.likes } }, { new: true });
    } else if (req.query.category == "likes" && req.query.type == "delete") {
        updatedDoc = await GlobalMcq.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.likes } }, { new: true });
    }
    res.status(200).json({ data: updatedDoc, message: "Success" });

}, 'error in updating interview')


// DELETING GLOBAL INTERVIEW
export const deleteGlobalMcq = AsyncHandler(async (req, res) => {
    const doc1 = await GlobalMcq.findById(req.params.id);
    const doc2 = await Mcq.findByIdAndUpdate(doc1.mcqId, { isGlobal: false }, { new: true });
    const doc = await GlobalMcq.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in deleting mcq')