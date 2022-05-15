window.onload = load_page()
function load_page() {
    getUser();
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

async function logout() {
    return await fetch('/api/auth/logout', {
        method: 'DELETE',
    }).then(
        setTimeout(function () {
            location.reload();
        }, 1000))
}