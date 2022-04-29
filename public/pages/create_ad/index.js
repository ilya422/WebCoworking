window.onload = load_page()
function load_page() {
    getTypes();
}

async function getTypes() {
    let response = await fetch('/api/type');
    if (response.ok) {
        div = document.getElementById('form-type');
        json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            div.innerHTML += `<option value="${v.id}">${v.name}</option>`;
        }
    } else {
        alert('error', response.status);
    }
}

async function getTags() {
    let response = await fetch('/api/tag');
    if (response.ok) {
        div = document.getElementById('tag');
        json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            div.innerHTML += `<option value="${v.id}">${v.name}</option>`;
        }
    } else {
        alert('error', response.status);
    }
}

function selected_type(a) {
    var label = a.options[a.selectedIndex].text;
    if (label == '') {
        document.getElementById('view_form').innerHTML = ''
    } else if (label == 'Мероприятие') {
        viewEventFrom();
    } else if (label == 'Услуга') {
        viewServiceFrom();
    }
}

async function create_serAdv() {
    let name = document.getElementById('name').value
    let description = document.getElementById('desc').value
    let price = document.getElementById('price').value
    // let img = document.getElementById('img').src
    let img = '/public/content/img/usluga.png'
    let type = document.getElementById('form-type').selectedIndex
    let tag = document.getElementById('tag').selectedIndex

    let success_info = document.getElementById("success_info")
    if (name == '' || description == '' || price == '0' || img == '' || type == '0' || tag == '0') {
        success_info.innerHTML = `Заполните все поля!`
        success_info.style.display='flex'
        return
    }

    let body_json = {
        "name": name,
        "description": description,
        "price": price,
        "img": img,
        "id_type": type,
        "id_tag": tag,
        "id_user_add": 2
    }

    try {
        success_info.innerHTML = `Объявление успешно создано!`
        success_info.style.display='flex'
        let response = await fetch('/api/service_adv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        });
        await response.json();
    }
    catch {
        success_info.innerHTML = `Неизвестная ошибка!`
        success_info.style.display='flex'
    }
}

async function create_evAdv() {
    let name = document.getElementById('name').value
    let description = document.getElementById('desc').value
    let count_member = document.getElementById('count_mem').value
    let time_end = document.getElementById('time_end').value
    // let img = document.getElementById('img').src
    let img = '/public/content/img/mero.png'
    let type = document.getElementById('form-type').selectedIndex
    let tag = document.getElementById('tag').selectedIndex


    let success_info = document.getElementById("success_info")
    if (name == '' || description == '' || count_member == '0' || time_end == '' || img == '' || type == '0' || tag == '0') {
        success_info.innerHTML = `Заполните все поля!`
        success_info.style.display='flex'
        return
    }

    let body_json = {
        "name": name,
        "description": description,
        "count_member": count_member,
        "time_end": time_end,
        "img": img,
        "id_type": type,
        "id_tag": tag,
        "id_user_add": 2
    }

    try {
        success_info.innerHTML = `Объявление успешно создано!`
        success_info.style.display='flex'
        let response = await fetch('/api/event_adv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        });
        await response.json();
    }
    catch {
        success_info.innerHTML = `Неизвестная ошибка!`
        success_info.style.display='flex'
    }
}





function viewEventFrom() {
    document.getElementById('view_form').innerHTML = `
            <div id="create_event" style='display: flex;'>
                <div class="answer">
                    <a class="title"><b>Название мероприятия:</b></a><br>
                    <input class="form-name" id="name" type="text" size="30"><br>
                    <a class="title"><b>Описание мероприятия:</b></a><br>
                    <textarea class="form-desc" id="desc"></textarea><br>
                    <a class="title"><b>Тег:</b></a><br>
                    <select class="form-name" id="tag">
                        <option value="0"></option>
                    </select><br>
                    <a class="title"><b>Количество требуемых помощников:</b></a><br>
                    <input class="form-name" id="count_mem" min="0" type="number" value="0"><br>
                    <a class="title"><b>Дата окончания набора:</b></a><br>
                    <input class="form-name" id="time_end" type="date"><br>
                    <div class="btn">
                        <div id="success_info" style="display: none"></div><br>
                        <a class="button" onclick="create_evAdv()">Создать</a>
                    </div>
                </div>     

                <div class="img-choice">
                    <img class="form-img" src="http://cdn.onlinewebfonts.com/svg/img_103323.png">
                    <input id="img" type="file">
                </div>
            </div>
    `
    getTags();
}

function viewServiceFrom() {
    document.getElementById('view_form').innerHTML = `
            <div id="create_service" style='display: flex;'>
                <div class="answer">
                    <a class="title"><b>Название услуги:</b></a><br>
                    <input class="form-name" id="name" type="text" size="30" value=""><br>
                    <a class="title"><b>Описание услуги:</b></a><br>
                    <textarea class="form-desc" id="desc" value=""></textarea><br>
                    <a class="title"><b>Тег:</b></a><br>
                    <select class="form-name" id="tag">
                        <option value="0"></option>
                    </select><br>
                    <a class="title"><b>Стоимость (руб.):</b></a><br>
                    <input class="form-name" id="price" min="0" type="number" value="0"><br>
                    <div class="btn">
                    <div id="success_info" style="display: none"></div><br>
                    <a class="button" onclick="create_serAdv()">Создать</a>
                </div>
            </div>     

            <div class="img-choice">
                <img class="form-img" src="http://cdn.onlinewebfonts.com/svg/img_103323.png">
                <input id="img" type="file">
            </div>
    `;
    getTags();
}