async function registration() {
    info_div = document.querySelector('.attention')
    info_div.style.display='none'
    first_name = document.getElementById("first_name").value
    last_name = document.getElementById("last_name").value
    email = document.getElementById("email").value
    password1 = document.getElementById("password1").value
    password2 = document.getElementById("password2").value


    if (first_name.trim() == '' || last_name.trim() == '' || email.trim() == '' || password1.trim() == '' || password2.trim() == '') {
        info_div.innerHTML = "Заполните все поля!"
        info_div.style.display='flex'
        return
    }


    if (email.split("@")[1] != "study.utmn.ru") {
        info_div.innerHTML = "Email должен содержать @study.utmn.ru"
        info_div.style.display='flex'
        return
    }

    if (password1 != password2) {
        info_div.innerHTML = "Пароли отличаются!"
        info_div.style.display='flex'
        return
    }

    let body_json = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password1
    }

    try {
        response = await fetch('/api/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        json_data = await response.json();
        if (json_data.message == "Пользователь создан") {
            info_div.innerHTML = json_data.message
            info_div.style.display='flex'
            setTimeout(function () {
                window.location.href = '/login';
            }, 1000);
        }
        else {
            info_div.innerHTML = json_data.message
            info_div.style.display='flex'
        }
    }
    catch(err) {
        console.log(err)
        return
    }
}