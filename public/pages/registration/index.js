async function registration() {
    first_name = document.getElementById("first_name").value
    last_name = document.getElementById("last_name").value
    email = document.getElementById("email").value
    pass1 = document.getElementById("password1").value
    pass2 = document.getElementById("password2").value

    if (first_name == '' || last_name == '' || email == '' || pass1 == '' || pass2 == '') {
        console.log(`Заполните все поля!`)
        return
    }

    try {
        response = await fetch(`/api/user_email`);
        if (response.ok) {
            json_data = await response.json();
            for (var i in json_data) {
                if (json_data[i].email == email) {
                    console.log("Пользователь с таким email уже существует")
                    return
                }
            }
        }
    }
    catch(err) {
        console.log(err)
        return
    }

    if (email.split("@")[1] != "study.utmn.ru") {
        console.log("Email должен содержать @study.utmn.ru")
        return
    }

    if (pass1 != pass2) {
        console.log(`Пароли отличаются!`)
        return
    }

    let body_json = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "pass": pass1
    }

    try {
        response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        });
        await response.json();
        console.log("Пользователь создан")
    }
    catch(err) {
        console.log(err)
        return
    }
}