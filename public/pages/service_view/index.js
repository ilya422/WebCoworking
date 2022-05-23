window.onload = load_page()
function load_page() {
    getProfileImage();
    getAdv();
}

async function getProfileImage() {
    try {
        let response = await fetch('/api/user/id')
        if (response.ok) {
            img = document.getElementById('profile_img');
            json_data = await response.json();
            img.src = json_data[0].img;
    
        } else {
            console.log('error', response.status);
        }
    }
    catch {}
}

async function getAdv() {
    let getURL = window.location.href.split("/")
    id = getURL[getURL.length-2]
    response = await fetch(`/api/service_adv/${id}`)

    if (response.ok) {
        json_data = await response.json();
        document.getElementById('service-img').src = json_data.img
        document.querySelector('.service-name').innerHTML = json_data.name
        document.querySelector('.service-tag').innerHTML = "#" + json_data.tag
        document.querySelector('.service-description').innerHTML = json_data.description
        document.querySelector('.price').innerHTML = json_data.price + " руб."
        document.querySelector('.email-user').innerHTML = json_data.email

    } else {
        console.log('error', response.status);
    }
}