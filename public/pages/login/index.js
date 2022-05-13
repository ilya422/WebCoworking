async function login() {
    email = document.getElementById("email").value
    pass = document.getElementById("password").value

    if (email != '' && pass !=''){
        response = await fetch(`/api/user_for_login/${email}`);
        if (response.ok) {
            json_data = await response.json();
            json_data = json_data[0];
            if (json_data != null) {
                if (json_data.password == pass){
                    console.log("Вход выполнен")
                }
                else {
                    console.log("Неверный пароль")
                }
            }
            else {
                console.log("Пользователь не найден")
                console.log(json_data.password)
            }
        }
    }
    else {
        console.log("Введите логин и пароль")
    }
}