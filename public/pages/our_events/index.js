let id_event_adv_for_unsub = 0;
window.onload = load_page()
function load_page() {
    getYourEvents();
    getProfileImage();
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
    catch { }
}

async function getYourEvents() {
    let response_ev = await fetch(`/api/sub_events/user/sub`);
    if (response_ev.ok) {
        div = document.querySelector('.card-event');
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

async function respond(id_event_adv) {
        let body_json_sub = {
            "id_event_adv": id_event_adv
        }

        let response_sub = await fetch('/api/sub_events', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json_sub)
        }).then(
            location.reload()
        )
}

function open_modal(v) {
    document.querySelector('.b-popup').style.display = 'block'
    id_event_adv_for_unsub = v
}

function close_modal(check) {
    if (check) {
        respond(id_event_adv_for_unsub)
    }
    document.querySelector('.b-popup').style.display = 'none'
}

function card_event(v) {
    return `
    <div class="event-form">
    <a class="link" href="/event/${v.id}">
        <div class="event-text">
            <div class="event-name">${v.name}</div>
            <div class="event-tag">${v.tag}</div>
            <div class="event-time">
                <div><b>Дата окончания набора:</b></div>
                <div class="time">${v.time_end}</div>
            </div>
        </div>
    </a>
        <div class="click-item">
            <a class="button" id="btn-refuse" onclick="open_modal(${v.id})">Отказаться</a>
        </div>
</div>`
} 