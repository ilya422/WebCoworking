let adv_for_del = []
window.onload = load_page()
function load_page() {
    getProfileImage();
    getAllAdv();
}

async function getProfileImage() {
    try {
        let response = await fetch('/api/user/id')
        if (response.ok) {
            json_data = await response.json();
            img = document.getElementById('profile_img');
            img.src = json_data[0].img;
    
        } else {
            console.log('error', response.status);
        }
    }
    catch {}
}


async function getAllAdv() {
    response_ev = await fetch('/api/event_adv/user/p');
    response_ser = await fetch('/api/service_adv/user/p');

    if (response_ev.ok && response_ser.ok) {
        div = document.querySelector('.cards-holder');
        div.innerHTML = '';

        json_data_ev = await response_ev.json();
        json_data_ser = await response_ser.json();
        json_data = [...json_data_ev, ...json_data_ser];
        json_data.sort(function (a, b) {
            var dateA = new Date(a.time_add), dateB = new Date(b.time_add)
            return dateB - dateA
        });

        for (var i in json_data) {
            var v = json_data[i];
            if (v.type == 'Мероприятие') {
                div.innerHTML += card_event(v);
            }
            else if (v.type == 'Услуга') {
                div.innerHTML += card_servise(v);
            }
        }
    } else {
        console.log('error', response_ev.status, response_ser.status);
    }
}


async function delete_adv(adv_for_del) {
    let body_json_sub = {
        "id": adv_for_del[0]
    }

    if (adv_for_del[1] == 'Услуга') {
        let response = await fetch('/api/service_adv', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json_sub)
        })
        await response.json();
    }
    else if (adv_for_del[1] == 'Мероприятие') {
        let response = await fetch('/api/event_adv', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json_sub)
        })
        await response.json();
    }
    location.reload()
}


function open_modal(id, name, type) {
    document.querySelector('.b-popup').style.display = 'block'
    document.getElementById('name_modal_adv').innerHTML = name
    adv_for_del = [id, type]
}

function close_modal(check) {
    if (check) {
        delete_adv(adv_for_del)
    }
    document.querySelector('.b-popup').style.display = 'none'
}



function card_servise(v) {
    return `
    <div class="card-service">
        <a href="/service/${v.id}">
            <div class="card-image">
                <img class="card-img" src="${v.img}">
            </div>
            <div class="card-title">
                ${v.name}
            </div>
            <div class="card-buttons">
                <div class="btn-edit">
                    <a class="button-edit" href="/service_edit/${v.id}">Редактировать</a>
                </div>
                <div class="btn-delete">
                    <a class="button-delete" onclick="open_modal(${v.id},'${v.name}', '${v.type}')">Удалить</a>
                </div>
            </div>
        </a>
    </div>
`
}

function card_event(v) {
    return `
    <div class="card-event">
        <a href="/event/${v.id}">
            <div class="card-image">
                <img class="card-img" src="${v.img}">
            </div>
            <div class="card-title">
                ${v.name}
            </div>
            <div class="card-buttons">
                <div class="btn-edit">
                    <a class="button-edit" href="/event_edit/${v.id}">Редактировать</a>
                </div>
                <div class="btn-delete">
                    <a class="button-delete" onclick="open_modal(${v.id},'${v.name}', '${v.type}')">Удалить</a>
                </div>
            </div>
        </a>
    </div>                
`
} 