const express = require('express');
const app = express();
const multer = require('multer');
 const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const a=require('./Controllers/userController')
dotenv.config();
 app.use(bodyParser.json());
 const cors=require('cors');
 var corsOption={ origion :"*"};
   app.use(cors(corsOption));
 // חיבור למונגו
mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("connected DB");
    }).catch((err) => console.log(err));

 const user=require('./Routes/userRouter');
const { options } = require('./Routes/userRouter');

const order=require('./Routes/orderRouter');

app.use(user);
app.use(order);

app.listen(process.env.PORT, function() 
{
        console.log('listen in port 3000');
})
// פונקציה לבדיקה אם המשתמש הוא מנהל
app.post('/ifMaster', (req, res) => {
  const { name, password } = req.body;

  console.log(`process.env.MASTAR = ${process.env.MASTAR} , name = ${name} `)
  console.log(`process.env.PASSMASTAR = ${process.env.PASSMASTAR} , password = ${password}`)

  if (process.env.MASTAR === name && process.env.PASSMASTAR === password) {
  const token = a.generateToken(req.body.name, req.body.email, req.body.password);

      res.json({ success: true ,token:token});
  } else {
      res.json({ success: false });
  }
});
// הגדרת מסלול שמירת התמונות
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // מסלול תיקיית העלאות
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // שם הקובץ יהיה אותו שם כמו הקובץ שהועלה
//   }
// });



const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // הגדר את תיקיית הקבצים הסטטיים

app.post('/upload-main-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('לא הועלה קובץ');
    }

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, 'public/images', 'בת.png'); // עדכן את הנתיב למיקום התמונה

    fs.rename(tempPath, targetPath, (err) => {
        if (err) return res.status(500).send('שגיאה בעת שמירת הקובץ');
        res.send('הקובץ הועלה ונשמר');
    });
});