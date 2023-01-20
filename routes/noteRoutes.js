const express = require('express');
const { getNotes, addNote } = require('../controllers/NoteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getNotes);

router.route('/').post(protect, addNote);

module.exports = router;
