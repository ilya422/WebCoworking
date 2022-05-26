async function login() {
    email = document.getElementById("email").value
    password = document.getElementById("password").value

    if (email == '' || password == '') {
        console.log("Введите логин и пароль")
        return
    }

    let body_json = {
        "email": email,
        "password": password
    }

    try {
        response = await fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        }).then(
            setTimeout(function () {
                window.location.href = '/';
            }, 1000));
    }
    catch (err) {
        console.log(err)
        return
    }
}

async function forget_password() {
    let email = document.getElementById("email").value;
    if (email == '') {
        console.log("Введите логин")
        return
    }

    var password = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 7; i++)
        password += possible.charAt(Math.floor(Math.random() * possible.length));

    try {
        let body_json = {
            "email": email,
            "password": password
        }
        response = await fetch('/api/auth/forget/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        await response.ok;
    }
    catch (err) {
        console.log(err)
        return
    }

    let body_json = {
        "name": "Восстановление данных НетВоркинг-ИМИКН",
        "message": `Ваш логин: ${email}\nВаш пароль: ${password}`,
        "to": email
    }

    try {
        response = await fetch('/api/email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        return
    }
    catch (err) {
        console.log(err)
        return
    }
}