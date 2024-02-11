const {authenticate} = require('../middlewares/auth');
const {profile, records} = require('../controllers/user');
const express = require("express");
const {diskStorage} = require("multer");
const multer = require("multer");
const {skinCancer, queryModel, chatModel} = require("../controllers/models");

const router = express.Router();

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // You can replace 'uploads/' with any other directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// Initialize upload variable
const upload = multer({ storage: storage });

router.post('/skincancer', authenticate, upload.single('file'), skinCancer);
router.post('/llm/sql', authenticate, queryModel);
router.post('/llm/chat', authenticate, chatModel);

module.exports = router;