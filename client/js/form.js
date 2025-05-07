document.getElementById('bookingForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("hiiii")

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in.');
        return;
    }

    const decodedToken = atob(token.split('.')[1]);
    const userData = JSON.parse(decodedToken);
    console.log(userData);

    // אוספים את הנתונים מהטופס
    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // הוספת פרטי המשתמש לנתוני ההזמנה
    data.userId = userData._id; // או data.userId = userData.email, תלוי איך אתה מזהה את המשתמש

    try {
        // שולחים את הנתונים לשרת
        const response = await fetch('http://localhost:3000/createNewOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // שליחת ה-`token` ב-Headers
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Failed to create order');

        const result = await response.json();
        alert('Your booking request has been submitted successfully!');
        window.location.href = "../html/privateArea.html";
        // אפשר לנקות את הטופס או להכוון את המשתמש לעמוד אחר אם רוצים
        document.getElementById('bookingForm').reset();
    } catch (error) {
        console.error('Error submitting booking:', error);
        alert('There was an error submitting your booking.');
    }
});
