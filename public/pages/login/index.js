async function login() {
    info_div = document.querySelector('.attention')
    info_div.style.display='none'
    email = document.getElementById("email").value
    password = document.getElementById("password").value

    if (email == '' || password == '') {
        info_div.innerHTML = "Введите логин и пароль"
        info_div.style.display='flex'
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
        })
        json_data = await response.json();
        if (json_data.message == "Вход выполнен успешно") {
            info_div.innerHTML = json_data.message
            info_div.style.backgroundColor = 'RGB(152,251,74)'
            info_div.style.display='flex'
            setTimeout(function () {
                window.location.href = '/';
            }, 1000);
        }
        else {
            info_div.innerHTML = json_data.message
            info_div.style.display='flex'
        }
    }
    catch (err) {
        console.log(err)
        return
    }
}

async function forget_password() {
    info_div = document.querySelector('.attention')
    info_div.style.display='none'
    let email = document.getElementById("email").value;
    if (email == '') {
        info_div.innerHTML = "Введите логин"
        info_div.style.display='flex'
        return
    }

    var code = "";
    var possible = "0123456789";
    for (var i = 0; i < 6; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    let url = window.location.href;
    url = 'http://' + url.split('/')[2]

    try {
        let body_json = {
            "email": email,
            "code": code
        }
        response = await fetch('/api/auth/recoverytoken/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        json_data = await response.json();
        if (json_data.message == "Пользователь найден") {
            url_code = JSON.stringify(json_data.tokenRecovery).replace(/\"/g, "")
            url += '/recovery_pass/' + url_code
        }
        else {
            info_div.innerHTML = json_data.message
            info_div.style.display='flex'
            return
        }
    }
    catch (err) {
        console.log(err)
        return
    }

    try {
        let body_json = {
            "name": "Восстановление пароля",
            "message": `Ссылка на изменение пароля:\n${url}\nСсылка действует в течении 10-ти минут`,
            "to": email
        }

        response = await fetch('/api/email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        info_div.innerHTML = "Сообщение было отправлено на почту"
        info_div.style.display='flex'
        return
    }
    catch (err) {
        console.log(err)
        return
    }
}