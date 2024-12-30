var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const storage = multer.memoryStorage();

// Initialize multer
const upload = multer({ storage });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  res.json({
    name: file.originalname,  // Original file name
    type: file.mimetype,      // MIME type
    size: file.size  // You can process this data further
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
