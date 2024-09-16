export const getTaskNotificationHtml = (title, description) => {

    let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }

        img {
            width: 200px;
        }

        a {
            padding: 10px;
            border-radius: 10px;
            background-color: rgb(32, 192, 32);
            border: none;
            text-decoration: none;
            color: black;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <img src="https://i.pinimg.com/564x/0b/4b/37/0b4b377e424ce060bcb415aab6d54cbf.jpg" alt="" srcset="">

    <h1>Don't Miss Out</h1>
    <p>${title}</p>
    <p>${description}</p>


    <a href="https://arya-web-book.netlify.app">Visit WebBook</a>

</body>

</html>`

    return html;

}



export const getNewUserNotificationHtml = (name, email) => {

    let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
        }

        img {
            width: 200px;
        }

        a {
            padding: 10px;
            border-radius: 10px;
            background-color: rgb(32, 192, 32);
            border: none;
            text-decoration: none;
            color: black;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <img src="https://i.pinimg.com/564x/37/45/c7/3745c74779c298de86aa3fa65aba4016.jpg" alt="" srcset="">

    <h1>New User Joined</h1>
    <p>Name : ${name}</p>
    <p>Email : ${email}</p>


    <a href="https://arya-web-book.netlify.app">Visit WebBook</a>

</body>

</html>`

    return html;

}
