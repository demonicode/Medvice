const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const news = fetch(`https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${process.env.NEWS_API_KEY}`)
        .then(response => res.json({code: 200, data: response})
        .catch(err => res.json({code: 500, message: 'Internal server error'})));
});

module.exports = router;
