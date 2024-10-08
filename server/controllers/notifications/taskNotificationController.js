import { TaskNotification } from '../../models/notifications/taskNotificationModel.js'
import { sendingTaskMail } from '../../services/NodeMailer.js';
import async from "async"
import AsyncHandler from '../../utilis/AsyncHandler.js';

export const createTaskNotification = AsyncHandler(async (req, res) => {
    if (req.body.reminder) {
        const date1 = new Date(new Date());
        const date2 = new Date(req.body.reminder);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        res.send("arya")
    } else {
        res.send("arya")
        console.log("in ithers else");
        // const doc = new TaskNotification(req.body);
        // const newDoc = await doc.save();
        // res.status(200).json({ data: newDoc, message: "Success" });
    }
}, "error in creating task notification")


export const deleteTaskNotification = AsyncHandler(async (req, res) => {
    const doc = await TaskNotification.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: doc, message: "Success" });
}, "error in deleting notification")

export const getAllTaskNotification = AsyncHandler(async (req, res) => {
    const doc = await TaskNotification.find();
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all task notification")


export const checkTaskNotification = async (req, res) => {
    console.log("CHECKING NOTIFICATIONS");

    try {
        let data = await TaskNotification.find();
        let notifications = data.filter((e) => (e.reminder == new Date().toISOString().split("T")[0]))
        console.log(notifications.length);

        if (notifications.length > 0) {
            let asyncFunctionArr = notifications.map((e) => {
                return function (callback) {
                    sendingTaskMail(e)
                        .then((data) => callback(null, data))
                        .catch((error) => callback(error, null))
                }
            })
            async.parallel(asyncFunctionArr, function (err, results) {
                // optional callback                
                if (err) {
                    console.log(err);
                    console.log("ERROR IN SENDING EMAIL AND DELETING NOTIFICATION FROM DATABASE");
                    res.status(500).json({ data: null, message: "EMAIL CAN'T BE SEND AND TASKNOTIFICATION NOT DELETED FROM DATABASE" })
                } else {
                    console.log("EMAIL SENT AND TASK NOTIFICATION DELETED");
                    res.status(200).json({ data: null, message: "EMAIL SENT AND TASK NOTIFICATION DELETED" })
                }
            });
        } else {
            res.status(200).json({ data: null, message: "NO EMAIL OR NOTIFICATION TO SEND TODAY" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ data: null, message: "EMAIL CAN'T BE SEND AND TASKNOTIFICATION NOT DELETED FROM DATABASE" })
    }
}
