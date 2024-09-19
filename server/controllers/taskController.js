import { TaskNotification } from '../models/notifications/taskNotificationModel.js';
import { Task } from '../models/taskModel.js'
import { User } from '../models/userModel.js';
import AsyncHandler from '../utilis/AsyncHandler.js';

export const createTask = AsyncHandler(async (req, res) => {
    const doc = new Task(req.body);
    const newDoc = await doc.save();
    await createTaskNotification(newDoc);
    res.status(200).json({ data: newDoc, message: "Success" });

}, "error in creating task")

export const updateTask = AsyncHandler(async (req, res) => {
    const doc = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await createTaskNotification(doc);
    res.status(200).json({ data: doc, message: "Success" });
}, 'error in updating task')

export const deleteTask = AsyncHandler(async (req, res) => {
    const doc = await Task.findByIdAndDelete(req.params.id);
    await TaskNotification.findByIdAndDelete(doc.notificationId);
    res.status(200).json({ data: doc, message: "Success" });
},"error in deleting task")

export const getAllTaskByUserId = AsyncHandler(async (req, res) => {
    const doc = await Task.find({ userId: req.params.userId });
    res.status(200).json({ data: doc, message: "Success" });
},"error in getting user task")

export const getSingleTask = AsyncHandler(async (req, res) => {
    const doc = await Task.findById(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
},"error in getting single task")

//  CREATING NOTIFICATION
const createTaskNotification = async (newTask) => {
    console.log("CREATING NEW TASK NOTIFICATION");

    if (newTask.reminder == "") {
        console.log("reminder absent");
        return null;
    }
    try {
        let userDetail = await User.findById(newTask.userId);
        let data = { taskId: newTask._id, userId: newTask.userId, name: userDetail.name, email: userDetail.email, title: newTask.title, description: newTask.description, reminder: newTask.reminder }
        const doc = new TaskNotification(data);
        const newDoc = await doc.save();
        console.log(newTask);
        console.log(newDoc);
        await Task.findByIdAndUpdate(newTask._id, { notificationId: newDoc._id });
        return true;
    } catch (error) {
        console.log("ERROR IN MAKING NEW TASK NOTIFICATION");
        console.log(error);
        return false;
    }

}