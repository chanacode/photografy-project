document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('fetchUsersBtn').addEventListener('click', () => {
        const usersList = document.getElementById('usersList');
        usersList.style.display = 'block'; // Show the table
        fetchUsers(); // Fetch and populate users
    });

    document.getElementById('fetchOrdersBtn').addEventListener('click', async () => {
        const ordersList = document.getElementById('ordersList');
        ordersList.style.display = 'block'; // Show the table
        await fetchOrders(); // Fetch and populate orders
    });

    document.getElementById('searchUserBtn').addEventListener('click', () => {
        const password = document.getElementById('searchPasswordInput').value;
        searchUserByPassword(password);
    });

    document.getElementById('uploadForm').addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const formData = new FormData(this);
    
        try {
            const response = await fetch('http://localhost:3000/getAllUsers', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                alert('התמונה שונתה בהצלחה');
            } else {
                alert('אירעה שגיאה בעת שינוי התמונה');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('אירעה שגיאה בעת שינוי התמונה');
        }
    });
    
    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/getAllUsers');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            populateUserTable(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    function populateUserTable(data) {
        const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear any existing rows
        data.users.forEach(user => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = user.name;
            row.insertCell(1).innerText = user.password;
            row.insertCell(2).innerText = user.email;

            const actionCell = row.insertCell(3);
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => deleteUser(user.password, row));
            actionCell.appendChild(deleteButton);
        });
    }

    function deleteUser(password, row) {
        if (confirm(`Are you sure you want to delete this user`)) {
            fetch(`http://localhost:3000/deleteUsers/${password}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    row.remove();
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }

    async function fetchOrders() {
        try {
            const response = await fetch('http://localhost:3000/getAllOrders');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            populateOrderTable(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    function populateOrderTable(data) {
        const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear any existing rows
        data.orders.forEach(order => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = order.name;
            row.insertCell(1).innerText = order.address;
            row.insertCell(2).innerText = order.phone;
            row.insertCell(3).innerText = order.date;
            row.insertCell(4).innerText = order.kind;
            row.insertCell(5).innerText = order.numOfChildren;
            // row.insertCell(6).innerText = order.userId;

            const actionCell = row.insertCell(6); // Adjust index if needed
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => deleteOrder(order.phone, row));
            actionCell.appendChild(deleteButton);
        });
    }

    function deleteOrder(phone, row) {
        if (confirm(`Are you sure you want to delete this order`)) {
            fetch(`http://localhost:3000/deleteOrders/${phone}`, {
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

    async function searchUserByPassword(password) {
        try {
            const response = await fetch(`http://localhost:3000/getUserByPassword/${password}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // נוודא שהמשתמש נמצא לפני הצגת הטבלה
            if (data.user) {
                document.getElementById('usersList').style.display = 'block';
                populateUserTable({ users: [data.user] });
            } else {
                alert('משתמש לא נמצא');
            }
        } catch (error) {
            console.error('Error searching user:', error);
            alert('אירעה שגיאה בעת חיפוש המשתמש');
        }
    }
});
