import { permissionAndTokenGeneration } from "../services/Firebase";

export const getColor = (task) => {
    if (task == "completed") {
        return "green"
    } else {
        return 'red';
    }
}


export const getRandomColor = () => {
    const colorArr = ["#1058FF", "#0C8CBA", "#05C5C6", "#4CC4ED", "#14305E", "#F31EF1", "#07C50C", "#002D86", "#B80550", "#3112BE"]
    return colorArr[Math.floor(Math.random() * 10)];
}