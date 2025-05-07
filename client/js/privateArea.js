

document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const logoutButton = document.getElementById("logoutButton");
    const beakButton = document.getElementById("beakButton");
    const fetchOrdersBtn = document.getElementById('fetchOrdersBtn');

    // הצגת מידע מהתוקן
    const token = localStorage.getItem('token');
    console.log(token)
    const data = atob(token.split('.')[1]);
    const dataJ = JSON.parse(data);
    welcomeMessage.textContent = `ברוך הבא לאזור האישי שלך ${dataJ.name}`;

    // טיפול בלחיצה על כפתור ההתנתקות
    logoutButton.addEventListener("click", function () {
        window.location.href = "../html/home.html"; // הפנייה לדף ההתחברות
    });
    beakButton.addEventListener("click", function () {
        window.location.href = "../html/home.html"; // הפנייה לדף הבית
    });

    // טיפול בלחיצה על כפתור הצגת ההזמנות
    fetchOrdersBtn.addEventListener('click', async () => {
        const ordersList = document.getElementById('ordersList');
        ordersList.style.display = 'block'; // הצגת הטבלה
        await fetchOrders(dataJ.password); // שליחה והצגת ההזמנות
    });
});

async function fetchOrders(password) {
    try {
        const response = await fetch(`http://localhost:3000/getOrdersByUserPassword`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        populateOrderTable(data.orders); // הנחה שהנתונים חוזרים בצורה הנכונה
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}


function populateOrderTable(data) {
    const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // ניקוי שורות קיימות
    data.orders.forEach(order => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = order.name;
        row.insertCell(1).innerText = order.address;
        row.insertCell(2).innerText = order.phone;
        row.insertCell(3).innerText = order.date;
        row.insertCell(4).innerText = order.kind;
        row.insertCell(5).innerText = order.numOfChildren;
        row.insertCell(6).innerText = order.userId;

        const actionCell = row.insertCell(7); // התאמת אינדקס אם צריך
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteOrder(order.phone, row));
        actionCell.appendChild(deleteButton);
    });
}

function deleteOrder(phone, row) {
    if (confirm('Are you sure you want to delete this order')) {
        fetch(`http://localhost:3000/deleteOrders/${encodeURIComponent(phone)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                row.remove();
            } else {
                console.error('Failed to delete order');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     const welcomeMessage = document.getElementById("welcomeMessage");
//     const logoutButton = document.getElementById("logoutButton");
//     const beakButton = document.getElementById("beakButton");

// ///////////


//     document.getElementById('fetchOrdersBtn').addEventListener('click', async () => {
//         const ordersList = document.getElementById('ordersList');
//         ordersList.style.display = 'block'; // Show the table
//         await fetchOrders(); // Fetch and populate orders
//     });

// ///////////




    
//     const token = localStorage.getItem('token');
//     console.log(token)
//     const data = atob(token.split('.')[1])
//     console.log(data)
//     const dataJ = JSON.parse(data)
//     console.log(dataJ)
   
//         welcomeMessage.textContent = `  ברוך הבא לאזור האישי שלך ${dataJ.name} `;
      

//     // טיפול בלחיצה על כפתור ההתנתקות
//     logoutButton.addEventListener("click", function () {
//         window.location.href = "../html/login.html"; // הפנייה לדף ההתחברות
//     });
//     beakButton.addEventListener("click", function () {
//         window.location.href = "../html/home.html"; // הפנייה לדף ההתחברות
//     });
// });



// async function fetchOrders() {
//     try {
//         const response = await fetch(`http://localhost:3000/getOrdersByPhone/${dataj.password}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         populateOrderTable(data);
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//     }
// }

// function populateOrderTable(data) {
//     const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
//     tableBody.innerHTML = ''; // Clear any existing rows
//     // const token = localStorage.getItem('token');
//     // const data = atob(token.split('.')[1])
//     // const dataJ = JSON.parse(data)
//     // print(dataJ)
//     data.orders.forEach(order => {
//         const row = tableBody.insertRow();
//         row.insertCell(0).innerText = order.name;
//         row.insertCell(1).innerText = order.address;
//         row.insertCell(2).innerText = order.phone;
//         row.insertCell(3).innerText = order.date;
//         row.insertCell(4).innerText = order.kind;
//         row.insertCell(5).innerText = order.numOfChildren;
//         row.insertCell(6).innerText = order.userId;

//         const actionCell = row.insertCell(7); // Adjust index if needed
//         const deleteButton = document.createElement('button');
//         deleteButton.innerText = 'Delete';
//         deleteButton.addEventListener('click', () => deleteOrder(order.phone, row));
//         actionCell.appendChild(deleteButton);
//     });
// }

// function deleteOrder(phone, row) {
//     if (confirm(`Are you sure you want to delete this order`)) {
//         fetch(`http://localhost:3000/deleteOrders/${phone}`, {
//             method: 'DELETE'
//         })
//         .then(response => {
//             if (response.ok) {
//                 row.remove();
//             } else {
//                 console.error('Failed to delete order');
//             }
//         })
//         .catch(error => console.error('Error:', error));
//     }
// }



// // document.getElementById('fetchOrdersForm').addEventListener('submit', async function(event) {
// //     event.preventDefault();

// //     const phone = document.getElementById('phone').value;
// //     const encodedPhone = encodeURIComponent(phone); // Encode the phone number
// //     const response = await fetch(`http://localhost:3000/getOrdersByPhone/${dataj.pa}`);
// //     console.log(response)
// //     if (!response.ok) {
// //         console.error('Error fetching orders:', response.statusText);
// //         return;
// //     }

// //     const data = await response.json();
    
// //     const ordersList = document.getElementById('ordersList');
// //     ordersList.innerHTML = '';

// //     if (data && data.length > 0) {
// //         data.forEach(order => {
// //             const orderItem = document.createElement('div');
// //             orderItem.textContent = `Order name: ${order.name}, address: ${order.address}, phone: ${order.phone}, date: ${order.date}, kind: ${order.kind}, numOfChildren: ${order.numOfChildren}, userId: ${order.userId}`;
// //             ordersList.appendChild(orderItem);
// //         });
// //     } else {
// //         const noOrdersMessage = document.createElement('p');
// //         noOrdersMessage.textContent = 'No orders found for this phone number.';
// //         ordersList.appendChild(noOrdersMessage);
// //     }
// // });