async function recovery() {
    info_div = document.querySelector('.attention')
    info_div.style.display='none'
    password1 = document.getElementById("password").value
    password2 = document.getElementById("repeat-password").value

    if (password1 == '' || password2 == '') {
        info_div.innerHTML = "Заполните все поля"
        info_div.style.display='flex'
        return
    }

    if (password1 != password2) {
        info_div.innerHTML = "Пароли отличаются"
        info_div.style.display='flex'
        return
    }

    let url = window.location.href;
    token = url.split('/')[4]
    
    try {
        let body_json = {
            "password": password1
        }

        response = await fetch(`/api/user/recovery/${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        json_data = await response.json();
        if (json_data.message == "Пароль обновлён") {
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
    catch (err) {
        console.log(err)
        return
    }
}