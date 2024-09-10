import { Options } from '../models/optionsModel.js'

export const createOptions = async (req, res) => {
    try {
        console.log(req.body);
        const doc = new Options(req.body);
        const newDoc = await doc.save();
        res.status(200).json({ data: newDoc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN MAKING NEW Options");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const getAllOptions = async (req, res) => {
    try {
        console.log(req.params);
        const doc = await Options.find({ mcqId: req.params.mcqId });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN GETTING OptionsS");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const getOption = async (req, res) => {
    try {
        console.log(req.params);
        const doc = await Options.findById(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN GETTING OptionsS");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const updateOptions = async (req, res) => {
    try {
        console.log(req.body);
        const doc = await Options.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN UPDATING OptionsS");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}


export const deleteOptions = async (req, res) => {
    try {
        console.log(req.body);
        const doc = await Options.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("ERROR IN DELETING Options");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}