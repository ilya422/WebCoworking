window.onload = load_page()
function load_page() {
    getUser();;
    getUserSubEvTag();
}

async function getUser() {
    response = await fetch(`/api/user/id`);

    if (response.ok) {
        json_data = await response.json();
        json_data = json_data[0];

        document.getElementById('first_name').innerHTML = json_data.first_name
        document.getElementById('last_name').innerHTML = json_data.last_name
        document.getElementById('email').innerHTML = json_data.email
        document.getElementById('role').innerHTML = json_data.role
        document.getElementById('img').src = json_data.img


    } else {
        console.log('error', response.status);
    }
}

async function getTags() {
    let response = await fetch('/api/tag');
    if (response.ok) {
        let selector = document.getElementById('tag_choice');
        selector.innerHTML = `<option value="0"></option>`
        let json_data = await response.json();
        for (var i in json_data) {
            var v = json_data[i];
            selector.innerHTML += `<option value="${v.id}">${v.name}</option>`;
        }
    } else {
        console.log('error', response.status);
    }
}

async function getUserSubEvTag() {
    let response = await fetch('/api/sub_events_tag/user');
    if (response.ok) {
        list = document.querySelector('.list-tags');
        list.innerHTML = ""
        let json_data = await response.json();
        await getTags()
        let selector = document.getElementById('tag_choice');
        if (json_data.length != 0) {
            for (var i in json_data) {
                var v = json_data[i];
                selector.querySelector(`[value="${v.id_tag}"]`).remove()
                list.innerHTML += `
                <div class="element-tags">
                    <div class="name-tag">${v.name}</div>
                    <div>
                        <a href="" onclick="unsubTag(${v.id_tag})">
                            <img class="delete-tag" src="/public/content/img/delete.png" alt="">
                        </a>
                    </div>
                </div> `;
                
            }
        }
        else {
            document.querySelector('.no-tags').style.display='block'
        }

    } else {
        console.log('error', response.status);
    }
}

async function logout() {
    return await fetch('/api/auth/logout', {
        method: 'DELETE',
    }).then(
        setTimeout(function () {
            location.reload();
        }, 1000))
}

async function logoutAll() {
    return await fetch('/api/auth/logout_all', {
        method: 'DELETE',
    }).then(
        setTimeout(function () {
            location.reload();
        }, 1000))
}

async function selected_tag(a) {
    var label = a.options[a.selectedIndex].value;
    if (label != 0) {
        try {
            let body_json = {
                "id_tag": label
            }
    
            response = await fetch('/api/sub_events_tag/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body_json)
            })
            document.querySelector('.no-tags').style.display='none'
            getUserSubEvTag();
            return
        }
        catch (err) {
            console.log(err)
            return
        }
    }
}

async function unsubTag(id){
    try {
        let body_json = {
            "id_tag": id
        }

        response = await fetch('/api/sub_events_tag/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        })
        getUserSubEvTag();
        return
    }
    catch (err) {
        console.log(err)
        return
    }
}