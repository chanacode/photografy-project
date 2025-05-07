let username, password, loginForm;

document.addEventListener("DOMContentLoaded", function () {
    loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        username = document.getElementById("username").value.trim();
        password = document.getElementById("password").value.trim();

        if (username === '' || password === '') {
            alert('אנא מלא את כל השדות.');
            return;
        }

        // קריאה לפונקציה לבדיקה האם זו התחברות כמנהל
        ifMaster(username, password);

        // קריאה לפונקציה לאימות המשתמש על פי הסיסמה
        authenticateUser(username, password);
    });
});

async function authenticateUser(username, password) {
    try {
        const response = await fetch(`http://localhost:3000/getUserByPassword/${password}`, {
            method: 'GET', // שים לב שהשיטה היא GET
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)


        if (data.token) {
            localStorage.setItem('token', data.token);
             window.location.href = `../html/privateArea.html?user=${encodeURIComponent(username)}`;
        } else {
            alert("שם משתמש וסיסמה לא תואמים!");
        }

    } catch (error) {
        console.error('אירעה שגיאה:', error);
      //  alert("משתמש לא נמצא או אירעה שגיאה.");
    }
}

function ifMaster(username, password) {
    const User = {
        "name": username,
        "password": password
    };

    fetch('http://localhost:3000/ifMaster', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', 'master'); // לדוגמה: אחסון סטטוס מנהל באופן מאובטח
            window.location.href = `../html/meneger.html?user=${encodeURIComponent(username)}`;
        } else {
            console.log('ההתחברות נכשלה');
        }
    })
    .catch(error => {
        console.error('שגיאה:', error);
    });
}


// let username, password, loginForm, user = "";

// document.addEventListener("DOMContentLoaded", function () {
//     loginForm = document.getElementById("loginForm");

//     loginForm.addEventListener("submit", function (event) {
//         event.preventDefault(); // למנוע מהטופס לשלוח את הבקשה

//         // קבלת ערכי השדות
//         username = document.getElementById("username").value.trim();
//         password = document.getElementById("password").value.trim();

//         if (username === '' || password === '') {
//             alert('אנא מלא את כל השדות.');
//             return;
//         }
      
//         ifMaster(username,password)
//         // אם הגענו לכאן, ניתן לשלוח את הטופס
      
//         getUserByPassword(password)
//             .then(user => {
//                 console.log(user.user.name);
//                 let name = user.user.name;
//                 if (name !== username) {
//                     alert("Name and password do not match!");
//                 } else {
//                     // חסר תוקן
//                     username = "user"
//                     window.location.href = `../html/privateArea.html?user=${encodeURIComponent(username)}`;
//                 }

//             })
//             .catch(error => {
//                 console.log("user not find");
//                 alert("user not find!");
//                 console.error('There was an error:', error);
//             });

//         // alert("Form submitted successfully!");
//         // form.reset(); // לאפס את הטופס לאחר שליחתו

//         // בדיקת אם השם משתמש והסיסמה קיימים

//     });
// });




// const getUserByPassword = async (password) => {
//     try {
//         // מבצע בקשת fetch לשרת בכתובת המסוימת
//         const response = await fetch(`http://localhost:3000/getUserByPassword/${password}`, {
//             method: 'GET', // שיטת הבקשה היא GET
//             headers: {
//                 'Content-Type': 'application/json', // תוכן הבקשה הוא JSON
//             },
//         });

//         // בדיקת תקינות התגובה
//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.statusText}`);
//         }

//         // ממתין לפענוח תגובת JSON ושמירת הנתונים במשתנה user
//         const user = await response.json();
//         return user; // מחזיר את האובייקט המפוענח
//     } catch (error) {
//         console.error('There was an error:', error);
//         throw error; // זורק את השגיאה כדי שהקריאה לפונקציה תדע על הכישלון
//     }
// }


// function ifMaster(username, password) {
//     console.log(username);
//     console.log(password);
//     const User = {
//         "name": username,
//         "password": password
//     };
//     console.log(User)
//     fetch('http://localhost:3000/ifMaster', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(User),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             username = "master"
//             window.location.href = `../html/meneger.html?user=${encodeURIComponent(username)}`;
//         } else {
//             console.log('Login failed');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

