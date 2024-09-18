import { TaskNotification } from '../../models/notifications/taskNotificationModel.js'
import { sendingTaskMail } from '../../services/NodeMailer.js';
import async from "async"

export const createTaskNotification = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.body.reminder);

        if (req.body.reminder) {

            const date1 = new Date(new Date());
            const date2 = new Date(req.body.reminder);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");

            res.send("arya")
        } else {


            res.send("arya")
            console.log("in ithers else");


            // const doc = new TaskNotification(req.body);
            // const newDoc = await doc.save();
            // res.status(200).json({ data: newDoc, message: "Success" });
        }
    } catch (error) {
        console.log("ERROR IN MAKING NEW TaskNotification");
        console.log(error);
        res.status(400).json({ data: null, message: error });
    }
}


export const deleteTaskNotification = async (req, res) => {
    try {
        const doc = await TaskNotification.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: doc, message: "Success" });

    } catch (error) {
        console.log("ERROR IN DELETING TaskNotification");
        console.log(error);
        res.status(400).json({ data: null, message: error });
    }
}

export const getAllTaskNotification = async (req, res) => {
    try {
        const doc = await TaskNotification.find();
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all TaskNotification");
        res.status(400).json({ data: null, message: error });
    }
}


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
                    console.log("ERROR IN SENDING EMAIL AND DELETING NOTIFICATION FROM DATABSES");
                } else {
                    console.log(results);
                    console.log("EMAIL SENT AND TASK NOTIFICATION DELETED");
                }
                res.send(`Hello from Arya`);
            });

        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ data: null, message: "EMAIL CAN'T BE SEND AND TASKNOTIFICATION NOT DELETED FROM DATABSE" })
    }

}