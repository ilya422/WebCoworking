const respond_btn = document.getElementById("respond_btn")
const getURL = window.location.href.split("/")
const id_event_adv = getURL[getURL.length-2]
let current_member, count_member;
let id_user;

window.onload = load_page()
function load_page() {
    getUser();
    getAdv();
}

async function getUser() {
    try {
        let response_user = await fetch('/api/user/id')
        if (response_user.ok) {
            json_data_user = await response_user.json();
            img = document.getElementById('profile_img');
            img.src = json_data_user[0].img;
            id_user = json_data_user[0].id

            let response_sub = await fetch(`/api/sub_events/user_adv/${id_event_adv}`)
            if (response_sub.ok){
                json_data_sub = await response_sub.json();
                if (json_data_sub.length != 0) {
                    respond_btn.innerHTML = "Отменить участие"
                    respond_btn.style.backgroundColor = 'rgb(128,128,128)';
                }
                else if (json_data_sub.length == 0 && current_member >= count_member ) {
                    respond_btn.remove()
                }
            }
            else {
                console.log('error', response_sub.status);
            }
        } else {
            console.log('error', response_user.status);
        }
    }
    catch(e){
        console.log(e)
        respond_btn.remove()
    }
}

async function getAdv() {
    let response = await fetch(`/api/event_adv/${id_event_adv}`)

    if (response.ok) {
        let json_data = await response.json();
        document.getElementById('event-img').src = json_data.img
        document.querySelector('.event-name').innerHTML = json_data.name
        document.querySelector('.event-tag').innerHTML = "#" + json_data.tag
        document.querySelector('.event-description').innerHTML = json_data.description
        document.getElementById('event-data').innerHTML = json_data.time_end
        document.querySelector('.count-people').innerHTML = json_data.current_member + " / " + json_data.count_member

        current_member = json_data.current_member;
        count_member = json_data.count_member;
        
        if (json_data.id_user_add == id_user) {
            getAdvRespond()
        }
    } else {
        console.log('error', response.status);
    }
}

async function getAdvRespond()
{
    let response = await fetch(`/api/sub_events/${id_event_adv}`)
    if (response.ok) {
        let json_data = await response.json();
        let list = document.querySelector('.list-member')
        for (var i in json_data) {
            var u = json_data[i];
            list.innerHTML += `<div class="member-mail">${u.email}</div>`
        }
        list.style.display = 'flex'
    } else {
        console.log('error', response.status);
    }
}

async function respond() {
    if (respond_btn.innerHTML == "Откликнуться") {
        let body_json_sub = {
            "id_event_adv": id_event_adv,
            "current_member": current_member + 1,
            "count_member": count_member
        }

        let response_sub = await fetch('/api/sub_events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json_sub)
        })
        await response_sub.json();
        respond_btn.innerHTML = "Отменить участие"
        respond_btn.style.backgroundColor = 'rgb(128,128,128)';
        location.reload()
    }
    else {
        let body_json_sub = {
            "id_event_adv": id_event_adv
        }

        let response_sub = await fetch('/api/sub_events', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json_sub)
        })
        await response_sub.json();
        respond_btn.innerHTML = "Откликнуться"
        respond_btn.style.backgroundColor = 'rgb(34, 76, 118)';
        location.reload()
    }
}