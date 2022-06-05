let select_tag = 0;
let select_type = '';
window.onload = load_page()
function load_page() {
    getAllAdv();
    getTypes();
    getProfile();
    getTags();
}

async function getProfile() {
    try {
        let response = await fetch('/api/user/id')
        if (response.ok && !response.redirected) {
            json_data = await response.json();
            img = document.getElementById('profile_img');
            img.src = json_data[0].img;
            document.querySelector(".header-subtitle").innerHTML += " - " + json_data[0].faculty;
        } else {
            document.querySelector(".header-subtitle").innerHTML += " - Гостевая"
            selector_type = document.getElementById('type_choice');
            for (var i in selector_type.options) {
                var type = selector_type.options[i];
                if (type.innerHTML != "Услуга") {
                    type.remove()
                }
            }
        }
    }
    catch { }
}

async function getTags() {
    let response = await fetch('/api/tag');
    if (response.ok) {
        selector_tag = document.getElementById('tag_choice');
        json_data_tag = await response.json();
        for (var i in json_data_tag) {
            var tag = json_data_tag[i];
            var option = document.createElement("option");
            option.setAttribute("value", tag.id);
            option.innerHTML = tag.name;
            selector_tag.appendChild(option);
        }
    } else {
        console.log('error', response.status);
    }
}

async function getTypes() {
    let response = await fetch('/api/type');
    if (response.ok) {
        selector_type = document.getElementById('type_choice');
        json_data_type = await response.json();
        for (var i in json_data_type) {
            var type = json_data_type[i];
            var option = document.createElement("option");
            option.setAttribute("value", type.id);
            option.innerHTML = type.name;
            selector_type.appendChild(option);
        }
    } else {
        console.log('error', response.status);
    }
}

async function getAllAdv() {
    let response_ev;
    let response_ser;
    if (select_tag == 0) {
        response_ev = await fetch('/api/event_adv');
        response_ser = await fetch('/api/service_adv');
    }
    else {
        response_ev = await fetch(`/api/event_adv/main/${select_tag}`);
        response_ser = await fetch(`/api/service_adv/main/${select_tag}`);
    }


    if (response_ev.ok && response_ser.ok) {
        let div = document.querySelector('.cards-holder');
        div.innerHTML = '';

        if (response_ev.redirected) {
            getServiceAdv()
            return
        }
        let json_data_ev = await response_ev.json();
        let json_data_ser = await response_ser.json();
        let json_data = [...json_data_ev, ...json_data_ser];
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
    let response_ev;
    if (select_tag == 0) {
        response_ev = await fetch('/api/event_adv/');
    }
    else {
        response_ev = await fetch(`/api/event_adv/main/${select_tag}`);
    }

    if (response_ev.ok) {
        let div = document.querySelector('.cards-holder');
        div.innerHTML = '';

        let json_data = await response_ev.json();
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
    let response_ser;
    if (select_tag == 0) {
        response_ser = await fetch('/api/service_adv');
    }
    else {
        response_ser = await fetch(`/api/service_adv/main/${select_tag}`);
    }

    if (response_ser.ok) {
        let div = document.querySelector('.cards-holder');
        div.innerHTML = '';

        let json_data = await response_ser.json();
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


function selected_check() {
    if (select_type == "Мероприятие") {
        getEventAdv()
    }
    else if (select_type == "Услуга") {
        getServiceAdv()
    }
    else {
        getAllAdv()
    }
}

function selected_type(a) {
    select_type = a.options[a.selectedIndex].text;
    selected_check()
}

function selected_tag(a) {
    select_tag = a.options[a.selectedIndex].value;
    selected_check()
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