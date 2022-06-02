let getURL = window.location.href.split("/")
id_adv = getURL[getURL.length - 2]
window.onload = load_page()
function load_page() {
    getProfileImage();
    getTags();
    getAdv();
}

async function checkUser(user_id, role) {
    response = await fetch(`/api/service_adv/${id_adv}`)

    if (response.ok) {
        json_data = await response.json();
        if (user_id != json_data.id_user_add) {
            if (role != 'Администратор') {
                window.location.href = '/'
            }
        }
    } else {
        console.log('error', response.status);
    }
}

async function getProfileImage() {
    try {
        let response = await fetch('/api/user/id')
        if (response.ok) {
            img = document.getElementById('profile_img');
            json_data = await response.json();
            img.src = json_data[0].img;
            checkUser(json_data[0].id, json_data[0].role);

        } else {
            console.log('error', response.status);
        }
    }
    catch { }
}

async function getTags() {
    let response = await fetch('/api/tag');
    if (response.ok) {
        selector = document.querySelector('.service-tag');
        json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            selector.innerHTML += `<option value="${v.id}">${v.name}</option>`;
        }
    } else {
        console.log('error', response.status);
    }
}

async function getAdv() {
    response = await fetch(`/api/service_adv/${id_adv}`)

    if (response.ok) {
        json_data = await response.json();
        document.querySelector('.service-img').src = json_data.img
        document.querySelector('.service-name').value = json_data.name
        document.querySelector('.service-tag').value = json_data.id_tag
        new_description = json_data.description.replace('</p><p>', String.fromCharCode(13, 10))
        document.querySelector('.service-description').value = new_description
        document.querySelector('.service-price').value = json_data.price

    } else {
        console.log('error', response.status);
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
                let lable = document.querySelector('.service-img')
                lable.src = imageLocalIcon.src
            };
        }
    }
}

async function update_adv() {
    let name = document.querySelector('.service-name').value
    let description = document.querySelector('.service-description').value
    new_description = description.replace(/</g, '').replace(/\n/g, '</p><p>');
    let tag = document.querySelector('.service-tag').value
    let price = document.querySelector('.service-price').value
    let img = document.querySelector('.service-img').src

    let body_json = {
        "id": id_adv,
        "name": name,
        "description": new_description,
        "price": price,
        "img": img,
        "id_tag": tag
    }
    try {
        let response = await fetch(`/api/service_adv/:${id_adv}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        await response.ok;
    }
    catch(e) { console.log(e) }
}