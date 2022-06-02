window.onload = load_page()
function load_page() {
    getProfileImage();
    getTypes();
}

async function getProfileImage() {
    let response = await fetch('/api/user/id')
    if (response.ok) {
        json_data = await response.json();
        img = document.getElementById('profile_img');
        img.src = json_data[0].img;

    } else {
        console.log('error', response.status);
    }
}

async function getTypes() {
    let response = await fetch('/api/type/create_ad');
    if (response.ok) {
        selector = document.getElementById('form-type');
        json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            selector.innerHTML += `<option value="${v.id}">${v.name}</option>`;
        }
        selector.onchange()
    } else {
        console.log('error', response.status);
    }
}

async function getTags() {
    let response = await fetch('/api/tag');
    if (response.ok) {
        selector = document.getElementById('tag');
        json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            selector.innerHTML += `<option value="${v.id}">${v.name}</option>`;
        }
    } else {
        console.log('error', response.status);
    }
}

function selected_type(a) {
    var label = a.options[a.selectedIndex].text;
    if (label == 'Мероприятие') {
        viewEventFrom();
    } else if (label == 'Услуга') {
        viewServiceFrom();
    }
}

async function create_serAdv() {
    let name = document.getElementById('name').value
    let description = document.getElementById('desc').value
    let price = document.getElementById('price').value
    let img = document.getElementById('form-img').src
    let type = document.getElementById('form-type').value
    let tag_selecter = document.getElementById('tag')
    var tag = tag_selecter.options[tag_selecter.selectedIndex].value;

    let success_info = document.getElementById("success_info")
    let img_split = img.split("/")
    if (name == '' || description == '' || img_split[img_split.length - 1] == 'image_add.png' || type == '0' || tag == '0') {
        success_info.innerHTML = `Заполните все поля!`
        success_info.style.display = 'flex'
        return
    }

    let new_description = description.replace(/</g, '').replace(/\n/g, '</p><p>');
    let body_json = {
        "name": name,
        "description": new_description,
        "price": price,
        "img": img,
        "id_type": type,
        "id_tag": tag
    }

    try {
        document.getElementById("create_btn").remove()
        success_info.innerHTML = `Объявление успешно создано!`
        success_info.style.display = 'flex'
        let response = await fetch('/api/service_adv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        }).then(
            setTimeout(function () {
                window.location.href = '/';
            }, 1000));
    }
    catch {
        success_info.innerHTML = `Неизвестная ошибка!`
        success_info.style.display = 'flex'
        console.log(e)
    }
}

async function create_evAdv() {
    let name = document.getElementById('name').value
    let description = document.getElementById('desc').value
    let count_member = document.getElementById('count_mem').value
    let time_end = document.getElementById('time_end').value
    let img = document.getElementById('form-img').src
    let type = document.getElementById('form-type').value
    let tag_selecter = document.getElementById('tag')
    var tag = tag_selecter.options[tag_selecter.selectedIndex].value;


    let success_info = document.getElementById("success_info")
    let img_split = img.split("/")
    if (name == '' || description == '' || count_member == '0' || time_end == '' ||
        img_split[img_split.length - 1] == 'image_add.png' || type == '0' || tag == '0') {
        success_info.innerHTML = `Заполните все поля!`
        success_info.style.display = 'flex'
        return
    }

    let new_description = description.replace(/</g, '').replace(/\n/g, '</p><p>');

    let body_json = {
        "name": name,
        "description": new_description,
        "count_member": count_member,
        "time_end": time_end,
        "img": img,
        "id_type": type,
        "id_tag": tag
    }

    try {
        document.getElementById("create_btn").remove()
        success_info.innerHTML = `Объявление успешно создано!`
        success_info.style.display = 'flex'
        let response = await fetch('/api/event_adv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })

        if (response.ok) {
            json_data = await response.json();
            sendMainForSubEvTag(name, tag, json_data.id),
                setTimeout(function () {
                    window.location.href = '/';
                }, 1000)
        };
    }
    catch (e) {
        success_info.innerHTML = `Неизвестная ошибка!`
        success_info.style.display = 'flex'
        console.log(e);
    }
}

async function sendMainForSubEvTag(name, id_tag, id_ev) {
    let response = await fetch(`/api/sub_events_tag/${id_tag}`);
    if (response.ok) {
        users = await response.json();
        let url = window.location.href;
        ev_url = 'http://' + url.split('/')[2] + "/event/" + id_ev
        let body_json_send = {
            "name": name,
            "users": users,
            "url": ev_url
        }

        fetch('/api/email/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json_send)
        })
    } else {
        console.log('error', response.status);
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
                let lable = document.getElementById('form-img')
                lable.src = imageLocalIcon.src
            };
        }
    }
}

function viewEventFrom() {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    const date = new Date()
    date.setDate(date.getDate() + 1)
    const tomorrow = date.toLocaleString("ru", options).split('.').reverse().join('-')
    document.getElementById('view_form').innerHTML = `
            <div id="create_event" style='display: flex;'>
                <div class="answer">
                    <a class="title"><b>Название мероприятия:</b></a>
                    <input class="form-name" id="name" type="text" size="30">
                    <a class="title"><b>Описание мероприятия:</b></a>
                    <textarea class="form-desc" id="desc"></textarea>
                    <a class="title"><b>Тег:</b></a>
                    <select class="form-name" id="tag">
                        <option value="0"></option>
                    </select>
                    <a class="title"><b>Количество требуемых помощников:</b></a>
                    <input class="form-name" id="count_mem" min="0" type="number" value="0">
                    <a class="title"><b>Дата окончания набора:</b></a>
                    <input class="form-name" id="time_end" type="date" min="${tomorrow}"><br>
                    <div class="btn">
                        <div id="success_info" style="display: none"></div><br>
                        <a class="button" id="create_btn" onclick="create_evAdv()">Создать</a>
                    </div>
                </div>     

                <div class="img-choice">
                    <img id="form-img" src="/public/content/img/image_add.png">
                    <input type="file" id="img_inp" accept="image/*" onchange="showIMG(this)">
                </div>
            </div>
    `
    getTags();
}

function viewServiceFrom() {
    document.getElementById('view_form').innerHTML = `
            <div id="create_service" style='display: flex;'>
                <div class="answer">
                    <a class="title"><b>Название услуги:</b></a>
                    <input class="form-name" id="name" type="text" size="30" value="">
                    <a class="title"><b>Описание услуги:</b></a>
                    <textarea class="form-desc" id="desc" value=""></textarea>
                    <a class="title"><b>Тег:</b></a>
                    <select class="form-name" id="tag">
                        <option value="0"></option>
                    </select>
                    <a class="title"><b>Стоимость (руб.):</b></a>
                    <input class="form-name" id="price" min="0" type="number" value="0"><br>
                    <div class="btn">
                    <div id="success_info" style="display: none"></div><br>
                    <a class="button" id="create_btn" onclick="create_serAdv()">Создать</a>
                </div>
            </div>     

            <div class="img-choice">
                <img id="form-img" src="/public/content/img/image_add.png">
                <input type="file" id="img_inp" accept="image/*" onchange="showIMG(this)">
            </div>
    `;
    getTags();
}