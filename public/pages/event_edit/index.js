let getURL = window.location.href.split("/")
id_adv = getURL[getURL.length - 2]
window.onload = load_page()
function load_page() {
    getAdv();
    getProfileImage();
    getTags();
}

async function checkUser(user_id, role) {
    response = await fetch(`/api/event_adv/${id_adv}`)

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
        selector = document.querySelector('.event-tag');
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
    response = await fetch(`/api/event_adv/${id_adv}`)

    if (response.ok) {
        json_data = await response.json();
        document.querySelector('.event-img').src = json_data.img
        document.querySelector('.event-name').value = json_data.name
        new_description = json_data.description.replace('</p><p>', String.fromCharCode(13, 10))
        document.querySelector('.event-description').value = new_description
        document.querySelector('.event-tag').value = json_data.id_tag
        document.querySelector('.event-people').value = json_data.count_member
        var date = json_data.time_end.split('-')
        date = date[2] + "-" + date[1] + "-" + date[0]
        document.querySelector('.event-date').value = date

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }
        const min_date = new Date()
        min_date.setDate(min_date.getDate() + 1)
        const tomorrow = min_date.toLocaleString("ru", options).split('.').reverse().join('-')
        document.querySelector('.event-date').setAttribute('min', tomorrow)
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
                let lable = document.querySelector('.event-img')
                lable.src = imageLocalIcon.src
            };
        }
    }
}

async function update_adv() {
    let name = document.querySelector('.event-name').value
    let description = document.querySelector('.event-description').value
    new_description = description.replace(/</g, '').replace(/\n/g, '</p><p>');
    let tag = document.querySelector('.event-tag').value
    let count_member = document.querySelector('.event-people').value
    let date = document.querySelector('.event-date').value
    let img = document.querySelector('.event-img').src

    let body_json = {
        "id": id_adv,
        "name": name,
        "description": new_description,
        "count_member": count_member,
        "time_end": date,
        "img": img,
        "id_tag": tag
    }
    console.log(tag)
    try {
        let response = await fetch(`/api/event_adv/:${id_adv}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        await response.ok;
    }
    catch (e) { console.log(e) }
}