document.addEventListener("DOMContentLoaded", async function () {
    try {
        // בקשה לשרת לקבלת ההזמנות של המשתמש
        const response = await fetch('/api/getUserOrders');
        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        const orders = data.orders;

        // הצגת ההזמנות
        const ordersElement = document.getElementById('orders');
        ordersElement.innerHTML = orders.map(order => `<li>Order ID: ${order._id} - Date: ${new Date(order.date).toLocaleDateString()}</li>`).join('');
    } catch (error) {
        console.error('Error fetching orders:', error);
        const ordersElement = document.getElementById('orders');
        ordersElement.innerHTML = 'Unable to fetch orders';
    }
});
