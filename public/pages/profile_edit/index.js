let old_faculty;
window.onload = load_page()
function load_page() {
    getFaculty();
    getUser();
}

async function getUser() {
    response = await fetch('/api/user/id');

    if (response.ok) {
        json_data = await response.json();
        json_data = json_data[0];

        document.getElementById('first_name').value = json_data.first_name
        document.getElementById('last_name').value = json_data.last_name
        document.getElementById('email').innerHTML = json_data.email
        document.getElementById('faculty').value = json_data.id_faculty
        old_faculty = json_data.id_faculty
        document.getElementById('role').innerHTML = json_data.role
        document.getElementById('img').src = json_data.img

    } else {
        console.log('error', response.status);
    }
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

async function NormalUpdate(first_name, last_name, id_faculty, img) {
    let success_info = document.getElementById("success_info")
    let body_json = {
        "first_name": first_name,
        "last_name": last_name,
        "id_faculty": id_faculty,
        "img": img
    }

    try {
        success_info.innerHTML = `Данные сохранены!`
        success_info.style.display = 'flex'
        let response = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        });
        await response.json()
        if (id_faculty != old_faculty) {
            success_info.innerHTML += "</br>Перезайдите в профиль для обновления факультета"
        }
        else {
            setTimeout(function () {
                window.location.href = '/profile';
            }, 1000);
        }
    }
    catch {
        success_info.innerHTML = `Неизвестная ошибка!`
        success_info.style.display = 'flex'
    }
}

async function UpdateWithPassword(first_name, last_name, id_faculty, img, old_pass, new_pass_repeat) {
    let success_info = document.getElementById("success_info")

    let body_json = {
        "first_name": first_name,
        "last_name": last_name,
        "id_faculty": id_faculty,
        "img": img,
        "old_password": old_pass,
        "new_password": new_pass_repeat
    }

    try {
        success_info.innerHTML = `Данные сохранены!`
        success_info.style.display = 'flex'
        let response = await fetch('/api/user/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        });
        json_data = await response.json()
        if (json_data.message == 'Неверный пароль') {
            success_info.innerHTML = `Неверный пароль!`
            success_info.style.display = 'flex'
            return
        }
        if (id_faculty != old_faculty) {
            success_info.innerHTML += "</br>Перезайдите в профиль для обновления факультета"
        }
        else {
            setTimeout(function () {
                window.location.href = '/profile';
            }, 1000);
        }
        return
    }
    catch {
        success_info.innerHTML = `Неизвестная ошибка!`
        success_info.style.display = 'flex'
    }
}

function update_User() {
    let first_name = document.getElementById('first_name').value
    let last_name = document.getElementById('last_name').value
    let faculty_selecter = document.getElementById("faculty")
    var id_faculty = faculty_selecter.options[faculty_selecter.selectedIndex].value;
    let img = document.getElementById('img').src

    let success_info = document.getElementById("success_info")
    success_info.style.display = 'none'
    if (first_name == '' || last_name == ''|| id_faculty == '0' || img == '') {
        success_info.innerHTML = `Заполните все поля!`
        success_info.style.display = 'flex'
        return
    } 

    let old_pass  = document.getElementById('old_pass').value
    let new_pass  = document.getElementById('new_pass').value
    let new_pass_repeat = document.getElementById('new_pass_repeat').value

    if (old_pass != '' || new_pass != '' || new_pass_repeat != '') {
        if (old_pass != '' && new_pass != '' && new_pass_repeat != '') {
            if (new_pass == new_pass_repeat) {
                UpdateWithPassword(first_name, last_name, id_faculty, img, old_pass, new_pass_repeat)
                return
            }
            else {
                success_info.innerHTML = `Новые пароли отличаются!`
                success_info.style.display = 'flex'
                return
            }
        }
        else {
            success_info.innerHTML = `Заполните все поля смены пароля!`
            success_info.style.display = 'flex'
            return
        }
    }
    else {
        NormalUpdate(first_name, last_name, id_faculty, img)
        return
    }
}

function showIMG(input) {
    var file = input.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        var imageUrlFull = reader.result;

        var imageLocalFull = new Image();
        imageLocalFull.src = imageUrlFull;

        imageLocalFull.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = 256; canvas.height = 256;
            var context = canvas.getContext('2d');
            var imgWidth = imageLocalFull.naturalWidth;
            var screenWidth = canvas.width;
            var scaleX = 1;
            if (imgWidth > screenWidth)
                scaleX = screenWidth / imgWidth;
            var imgHeight = imageLocalFull.naturalHeight;
            var screenHeight = canvas.height;
            var scaleY = 1;
            if (imgHeight > screenHeight)
                scaleY = screenHeight / imgHeight;
            var scale = scaleY;
            if (scaleX < scaleY)
                scale = scaleX;
            if (scale < 1) {
                imgHeight = imgHeight * scale;
                imgWidth = imgWidth * scale;
            }

            canvas.height = imgHeight;
            canvas.width = imgWidth;

            context.drawImage(imageLocalFull, 0, 0, imageLocalFull.naturalWidth, imageLocalFull.naturalHeight, 0, 0, imgWidth, imgHeight);
            var imageUrlIcon = canvas.toDataURL(file.type);

            var imageLocalIcon = new Image();
            imageLocalIcon.src = imageUrlIcon;

            imageLocalIcon.onload = function () {
                let lable = document.getElementById('img')
                lable.src = imageLocalIcon.src
            };
        }
    }
}