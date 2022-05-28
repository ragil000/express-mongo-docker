const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getData);
router.post('/', controller.postData);
router.put('/', controller.putData);
router.delete('/', controller.deleteData);

module.exports = router;