

window.onload = function () {
    document.getElementById('fSignUp').addEventListener('submit', function (event) {
        event.preventDefault();
        createNewUser();
    });
}
async function createNewUser() {
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    const url = 'http://localhost:3000/createNewUser';
    const data = { name, email, password };
    try {
        const response = await postData(url, data);
        
        if (response.ok) {
            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
           // alert("User created successfully!");
              window.location.href = "../html/privateArea.html";

            // Redirect to the private area or perform any necessary actions
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
    }
}
// async function createNewUser() {
//     let name = document.querySelector("#name").value;
//     let email = document.querySelector("#email").value;
//     let password = document.querySelector("#password").value;
//     const url = 'http://localhost:3000/createNewUser';
//     const data = { name, password, email };
//     try {
//         const response = await postData(url, data);
//         const json = await response.json();
        
//         localStorage.setItem('token', json.token);
//         alert("Form submitted successfully!");
//         let message = document.createElement("h1");
//         document.body.appendChild(message);
//         message.innerHTML = json.message;
//         console.log(json);
//         window.location.href = "../html/privateArea.html";
//     } catch (error) {
//         console.error('Error creating user', error);
//     }
// }
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (error) {
        throw new Error('Error posting data:', error);
    }
}
