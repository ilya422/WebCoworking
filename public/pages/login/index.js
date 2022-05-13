async function login() {
    email = document.getElementById("email").value
    password = document.getElementById("password").value

    if (email == '' || password ==''){
        console.log("Введите логин и пароль")
        return
    }

    let body_json = {
        "email": email,
        "password": password
    }
    
    try {
        response = await fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body_json)
        });
        
        console.log(await response.json())
    }
    catch(err) {
        console.log(err)
        return
    }
}