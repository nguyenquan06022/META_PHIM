const userInforControllers = require("../../app/controllers/userInforControllers");
function router(app) {
  app.post("/sign-up", userInforControllers.signUp);
  app.post("/update-avt", userInforControllers.updateAvt);
  app.post("/update-pass", userInforControllers.updatePass);
  app.get("/getUserInfor", userInforControllers.showUserInfor);
  app.post("/handleLoveFilm", userInforControllers.handleLoveFilm);
  app.get("/getCurrentUser", userInforControllers.getCurrentUser);
}
module.exports = router;
