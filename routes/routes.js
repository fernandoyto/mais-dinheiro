const express = require('express');
const {
  ladingPage,
} = require('../controlers/controler');

const router = express();

router.get('/', ladingPage);



module.exports = router;