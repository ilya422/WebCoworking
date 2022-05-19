window.onload = load_page()
function load_page() {
    getProfileImage();
    getAdv();
}

async function getProfileImage() {
    let response = await fetch('/api/user/id')
    if (response.ok) {
        img = document.getElementById('profile_img');
        json_data = await response.json();
        console.log(json_data[0])
        img.src = json_data[0].img;

    } else {
        console.log('error', response.status);
    }
}

async function getAdv() {
    let getURL = window.location.href.split("/")
    id = getURL[getURL.length-2]
    response = await fetch(`/api/event_adv/${id}`)

    if (response.ok) {
        json_data = await response.json();
        document.getElementById('event-img').src = json_data.img
        document.querySelector('.event-name').innerHTML = json_data.name
        document.querySelector('.event-tag').innerHTML = "#" + json_data.tag
        document.querySelector('.event-description').innerHTML = json_data.description
        document.getElementById('event-data').innerHTML = json_data.time_end
        document.querySelector('.event-people').innerHTML = "Количество откликнувшихся: " + 
        json_data.current_member + "/" + json_data.count_member

    } else {
        console.log('error', response.status);
    }
}