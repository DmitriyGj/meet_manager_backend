const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddlware');

const MeetingsCotroller = require('../controller/meetings.controller');

router.get('/meetings', MeetingsCotroller.getMeetings);
router.get('/meetings/:id', MeetingsCotroller.getMeetingById);
router.post('/meetings', authMiddleware , MeetingsCotroller.postMeeting);
router.delete('/meetings/:id', authMiddleware  ,MeetingsCotroller.deleteMeeting);

module.exports = router;
