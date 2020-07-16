const router = require('express').Router();
const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) =>{
        cb(null, Date.now()+".jpg");
    }
});

const upload = multer({ storage:storageConfig });

const verifyToken = require('./verifyToken');
const register = require('./auth/Register');
const login = require('./auth/Login');
const publications = require('./publications');
const comments = require("./comments");
const private_lists = require("./private_lists");
const private_tasks = require('./private_tasks');
const users = require('./users');
const profile = require('./profile');

router.use(verifyToken); 

router.post('/register', register);
router.post('/login', login);

router.post('/publications', publications.store);
router.put('/publications/:id', [publications.update.hasAccess, publications.update.validation]);
router.delete('/publications/:id', publications.destroy.hasAccess);

router.post("/publications/:id/comments", comments.store);
router.delete('/publications/:publication_id/comments/:comment_id', comments.destroy.hasAccess);

router.post("/private_lists", private_lists.store);
router.put('/private_lists/:id', [private_lists.update.hasAccess, private_lists.update.validation]);
router.delete('/private_lists/:id', private_lists.destroy.hasAccess);

router.post('/private_lists/:id/private_tasks', [private_tasks.store.hasAccess, private_tasks.store.validation]);
router.put('/private_lists/:private_list_id/private_tasks/:private_task_id', [private_tasks.update.hasAccess, private_tasks.update.validation]);
router.delete('/private_lists/:private_list_id/private_tasks/:private_task_id', private_tasks.destroy.hasAccess);

router.put('/users/:id', [users.update.hasAccess, users.update.validation]);
router.put('/users/:id/role', [users.updateRole.hasAccess, users.updateRole.validation]);
router.put('/users/:id/password', users.updatePassword.hasAccess);
router.delete('/users/:id', users.destroy.hasAccess);

router.post('/profile/photo', upload.single('photo'), profile.storePhoto);

module.exports = router;