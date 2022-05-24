window.onload = load_page()
function load_page() {
    getProfileImage();
    getTypes();
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

async function getTypes() {
    let response = await fetch('/api/type');
    if (response.ok) {
        div = document.getElementById('type_choice');
        json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            div.innerHTML += `<option value="${v.id}">${v.name}</option>`;
        }
    } else {
        console.log('error', response.status);
    }
}

async function getAllAdv() {
    response_ev = await fetch('/api/event_adv');
    response_ser = await fetch('/api/service_adv');

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

async function getEventAdv() {
    response_ev = await fetch('/api/event_adv');

    if (response_ev.ok) {
        div = document.querySelector('.cards-holder');
        div.innerHTML = '';

        json_data = await response_ev.json();
        json_data.sort(function (a, b) {
            var dateA = new Date(a.time_sort), dateB = new Date(b.time_sort)
            return dateA - dateB
        });
        for (var i in json_data) {
            var v = json_data[i];
            div.innerHTML += card_event(v)
        }
    } else {
        console.log('error', response_ev.status);
    }
}

async function getServiceAdv() {
    response_ser = await fetch('/api/service_adv');

    if (response_ser.ok) {
        div = document.querySelector('.cards-holder');
        div.innerHTML = '';

        json_data = await response_ser.json();
        json_data.sort(function (a, b) {
            var dateA = new Date(a.time_add), dateB = new Date(b.time_add)
            return dateB - dateA
        });
        for (var i in json_data) {
            var v = json_data[i];
            div.innerHTML += card_servise(v);
        }
    } else {
        console.log('error', response_ser.status);
    }
}

function selected_type(a) {
    var label = a.options[a.selectedIndex].text;
    if (label == 'Все') {
        getAllAdv();
    } else if (label == 'Мероприятие') {
        getEventAdv();
    } else if (label == 'Услуга') {
        getServiceAdv();
    }

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
            <div class="card-tag">
                Тэг: ${v.tag}
            </div>
            <div class="card-price">
                ${v.price} руб.
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
            <div class="card-tag">
                Тэг: ${v.tag}
            </div>
            <div class="down-line">
                <div class="card-time_end">
                    До: ${v.time_end}
                </div>
                <div class="card-people">
                    ${v.current_member} / ${v.count_member} чел.
                </div>
            </div>
        </a>
    </div>                
`
} 