async function registration() {
    first_name = document.getElementById("first_name").value
    last_name = document.getElementById("last_name").value
    email = document.getElementById("email").value
    password1 = document.getElementById("password1").value
    password2 = document.getElementById("password2").value


    if (first_name.trim() == '' || last_name.trim() == '' || email.trim() == '' || password1.trim() == '' || password2.trim() == '') {
        console.log(`Заполните все поля!`)
        return
    }


    if (email.split("@")[1] != "study.utmn.ru") {
        console.log("Email должен содержать @study.utmn.ru")
        return
    }

    if (password1 != password2) {
        console.log(`Пароли отличаются!`)
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
        }).then(
            setTimeout(function () {
                window.location.href = '/login';
            }, 1000));
    }
    catch(err) {
        console.log(err)
        return
    }
}