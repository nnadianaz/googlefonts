const express = require('express');
const fontController = require('../controllers/fontController');

const router = express.Router();

router.get('/', fontController.getFonts); // get list of available fonts
router.get('/:family', fontController.getFontByFamily); // get a single font by family name
router.post('/', fontController.createFont); // post create a new font entry
router.patch('/:family', fontController.updateFont); // patch update an existing font entry
router.delete('/:family', fontController.deleteFont); // delete a font entry

module.exports = router;