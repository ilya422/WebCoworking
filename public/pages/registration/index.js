window.onload = load_page()
function load_page() {
    getFaculty()
    //Закрытие модального окна при клике в не его контента
    const div = document.querySelector('.b-popup');
    document.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(div.querySelector('.b-popup-content'));
        if (!withinBoundaries) {
            div.style.display = 'none';
        }
    })
}

async function getFaculty() {
    let response = await fetch('/api/faculty');
    if (response.ok) {
        let selector = document.getElementById('faculty');
        let json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            if (v.name != 'Все') {
                selector.innerHTML += `<option value="${v.id}">${v.name}</option>`;
            }
        }
    } else {
        console.log('error', response.status);
    }
}

async function registration() {
    let info_div = document.querySelector('.attention')
    info_div.style.display = 'none'
    let info_div_pop = document.getElementById('popup-attention')
    info_div_pop.style.display = 'none'

    const {first_name, last_name, email, id_faculty, password1} = await checkValues(1)
    const code = document.querySelector(".code").value

    let body_json = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "id_faculty": id_faculty,
        "password": password1,
        "code": code
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
        if (json_data.message == "Пользователь успешно создан") {
            document.querySelector('.b-popup').style.display = 'none'
            info_div.innerHTML = json_data.message
            info_div.style.backgroundColor = 'RGB(152,251,74)'
            info_div.style.display = 'flex'
            setTimeout(function () {
                window.location.href = '/login';
            }, 1000);
        }
        else {
            info_div_pop.innerHTML = json_data.message
            info_div_pop.style.display = 'flex'
        }
    }
    catch (err) {
        console.log(err)
        return
    }
}

async function generateCode(email) {
    let body_json_code = {
        "email": email
    }
    response = await fetch('/api/regcode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_json_code)
    })
    json_data = await response.json();

    try {
        let body_json = {
            "name": "Регистрация на сайте",
            "message": `Никому не сообщайте этот код\nКод подтверждения регистрации: ${json_data.code}\nДействителен в течении 10 минут`,
            "to": email
        }

        response = await fetch('/api/email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        }).then(
            document.querySelector('.b-popup').style.display = 'block'
        )
        return
    }
    catch (err) {
        console.log(err)
        return
    }
} 

async function checkValues(type) {
    let info_div = document.querySelector('.attention')
    info_div.style.display = 'none'
    let first_name = document.getElementById("first_name").value
    let last_name = document.getElementById("last_name").value
    let email = document.getElementById("email").value
    let faculty_selecter = document.getElementById("faculty")
    var id_faculty = faculty_selecter.options[faculty_selecter.selectedIndex].value;
    let password1 = document.getElementById("password1").value
    let password2 = document.getElementById("password2").value


    if (first_name.trim() == '' || last_name.trim() == '' || email.trim() == '' || id_faculty == "0" || password1.trim() == '' || password2.trim() == '') {
        info_div.innerHTML = "Заполните все поля!"
        info_div.style.display = 'flex'
        return
    }


    if (email.split("@")[1] != "study.utmn.ru") {
        info_div.innerHTML = "Email должен содержать @study.utmn.ru"
        info_div.style.display = 'flex'
        return
    }

    if (password1 != password2) {
        info_div.innerHTML = "Пароли отличаются!"
        info_div.style.display = 'flex'
        return
    }

    let response = await fetch(`/api/user/email/${email}`)
    if (response.ok) {
        json_data = await response.json();
        if (json_data.length != 0) {
            info_div.innerHTML = "Пользователь существует!"
            info_div.style.display = 'flex'
            return
        }
    } else {
        console.log('error', response.status);
        return
    }

    if (type == 0) {
        generateCode(email)
        document.querySelector('.b-popup').style.display = 'block'
        return
    }
    else {
        return {first_name, last_name, email, id_faculty, password1}
    }

}