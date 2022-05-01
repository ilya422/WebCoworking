window.onload = load_page()
function load_page() {
    getUser();
}

async function getUser() {
    response = await fetch('/api/user/1');

    if (response.ok) {
        json_data = await response.json();
        json_data = json_data[0];

        document.getElementById('first_name').value = json_data.first_name
        document.getElementById('last_name').value = json_data.last_name
        document.getElementById('email').value = json_data.email
        if (json_data.status) {
            document.getElementById('status').innerHTML = "Разрешено"
        } else {
            document.getElementById('status').innerHTML = "Запрещено"
        }
        document.getElementById('img').src = json_data.img

    } else {
        console.log('error', response.status);
    }
}

async function update_User() {
    let first_name = document.getElementById('first_name').value
    let last_name = document.getElementById('last_name').value
    let email = document.getElementById('email').value
    let img = document.getElementById('img').src
    // let img = '/public/content/img/profile.png'

    let success_info = document.getElementById("success_info")
    if (first_name == '' || last_name == '' || email == '' || img == '') {
        success_info.innerHTML = `Заполните все поля!`
        success_info.style.display = 'flex'
        return
    }

    let body_json = {
        "id": 1,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "img": img
    }

    try {
        success_info.innerHTML = `Данные сохранены!`
        success_info.style.display = 'flex'
        let response = await fetch('/api/user/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        });
        await response.json()
    }
    catch {
        success_info.innerHTML = `Неизвестная ошибка!`
        success_info.style.display = 'flex'
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
            context.drawImage(imageLocalFull, 0, 0, 256, 256);
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