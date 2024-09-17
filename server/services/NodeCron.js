import { TaskNotification } from '../models/notifications/taskNotificationModel.js';
import { sendMail } from './NodeMailer.js';
import { getTaskNotificationHtml } from './Template.js';

const customPromise = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("arya")
        }, 5000);
    })
}

// SENDING MAIL AND DELETING TASKNOTIFICATION FROM DATABASE
const sendingMail = async (task) => {
    try {
        console.log("SENDING NOTIFICATIONS");
        // await customPromise();
        await sendMail(`${task.email}`, "WebBook Task", "Hii User", `${getTaskNotificationHtml(task.title, task.description)}`)

        // deleting notification from databse
        await TaskNotification.findByIdAndDelete(task._id)
        console.log("SENT EMAIL AND DELETED");
    } catch (error) {
        console.log(error);
        console.log("ERROR IN SENDING EMAIL AND DELETING NOTIFICATION FROM DATABSES");
    }

}


export const checkNotifications = async () => {
    console.log("CHECKING NOTIFICATIONS");

    try {
        let data = await TaskNotification.find();

        let notifications = data.filter((e) => (e.reminder == new Date().toISOString().split("T")[0]))
        console.log(notifications.length);

        if (notifications.length > 0) {

            notifications.forEach((e) => {
                sendingMail(e);
            })

        }

    } catch (error) {
        console.log(error);
    }

}