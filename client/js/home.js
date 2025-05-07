// פונקציה להציג את התמונה הראשית מה-LocalStorage
function displayMainImage() {
    const mainImage = document.getElementById("mainImage");
    const imageUrl = localStorage.getItem("mainImage");
    if (imageUrl) {
        mainImage.src = imageUrl; // עדכון התמונה הראשית אם יש URL ב-LocalStorage
    }
}

// קרא את התמונה הראשית כאשר הדף נטען
document.addEventListener("DOMContentLoaded", displayMainImage);

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('message').classList.add('show');
    }, 2000);
});
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('message1').classList.add('show');
    }, 2000);
});
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('message2').classList.add('show');
    }, 2000);
});
let currentIndex = 0;

function slideImages() {
    const images = document.querySelectorAll('.image-slider img');
    currentIndex++;

    // אם הגענו לסוף התמונות, נתחיל מהראשון
    if (currentIndex >= images.length -3) {
        currentIndex = 0;
    }

    // הזזה של התמונות
    const offset = -currentIndex * (100 / 3); // 100% חלקי 3
    document.querySelector('.image-slider').style.transform = `translateX(${offset}%)`;
}

// כל 3 שניות (3000 מילישניות) נבצע את הפונקציה
setInterval(slideImages, 3000);

