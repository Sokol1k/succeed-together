const router = require("express").Router();
const auth = require("../controllers/Auth");
const publications = require("../controllers/Publications");
const comments = require("../controllers/Comments");
const likes = require("../controllers/Likes");
const privateLists = require("../controllers/PrivateLists");
const privateTasks = require("../controllers/PrivateTasks");
const users = require("../controllers/Users");
const profile = require("../controllers/Profile");
const followers = require("../controllers/Followers");
const following = require("../controllers/Following");


router.post("/register", auth.register);
router.post("/login", auth.login);

router.get("/publications", publications.index);
router.get("/publications/following", publications.indexFollowing);
router.get("/publications/:id", publications.show); //получить публикацию по id
router.post("/publications", publications.store);
router.put("/publications/:id", publications.update);
router.delete("/publications/:id", publications.destroy);

router.post("/publications/:id/comments", comments.store);
router.delete("/publications/:publication_id/comments/:comment_id", comments.destroy);

router.post("/publications/:id/likes", likes.storeOrDestroy);

router.get("/private_lists", privateLists.index);
router.post("/private_lists", privateLists.store);
router.put("/private_lists/:id", privateLists.update);
router.delete("/private_lists/:id", privateLists.destroy);

router.get("/private_lists/:id/private_tasks", privateTasks.index);
router.post("/private_lists/:id/private_tasks", privateTasks.store);
router.delete("/private_lists/private_tasks/:id", privateTasks.destroy);
router.put("/private_lists/private_tasks/:id", privateTasks.update);

router.get("/users", users.index);
router.get("/users/:id", users.show);
router.get("/users/:id/profile", users.showProfile);
router.put("/users/:id", users.update);
router.put("/users/:id/role", users.updateRole);
router.put("/users/:id/password", users.updatePassword);
router.delete("/users/:id", users.destroy);

router.get("/profile", profile.show);
router.post("/profile/photo", profile.storePhoto);
router.delete("/profile/photo", profile.destroyPhoto);
router.put("/profile/about", profile.updateAbout);

router.get("/profile/followers", followers.index);
router.get("/user/:id/followers", followers.indexUser);

router.get("/profile/following", following.index);
router.get("/user/:id/following", following.indexUser);

router.post("/user/:id/follow", following.follow);


module.exports = router;
