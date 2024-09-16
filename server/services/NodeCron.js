import cron from 'node-cron'
import { TaskNotification } from '../models/notifications/taskNotificationModel.js';
import { sendMail } from './NodeMailer.js';
import { getTaskNotificationHtml } from './Template.js';

export const checkNotifications = () => {

    const sendNotifications = async () => {

        let data = await TaskNotification.find();

        let notifications = data.filter((e) => (e.reminder == new Date().toISOString().split("T")[0]))

        if (notifications.length > 0) {

            notifications.forEach((e) => {
                sendMail(`${e.email}`, "WebBook Task", "Hii User", `${getTaskNotificationHtml(e.title, e.description)}`)
            })

            // deleting notification from databse
            try {
                await TaskNotification.deleteMany({ _id: { $in: notifications.map((e) => (e._id)) } })
            } catch (error) {
                console.log("ERROR IN DELETING NOTIFICATION FROM DATABSES");
            }

        }


    }

    cron.schedule('* 9 * * *', sendNotifications);

}