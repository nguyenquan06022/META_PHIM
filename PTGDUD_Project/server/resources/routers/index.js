const userInforControllers = require("../../app/controllers/userInforControllers");
function router(app) {
  app.get("/getCurrentUser", userInforControllers.getCurrentUser);
  app.get("/getUserInfor", userInforControllers.showUserInfor);
  app.post("/handleLoveFilm", userInforControllers.handleLoveFilm);
  app.post("/handleWatchLater", userInforControllers.handleWatchLater);
  app.post("/sign-up", userInforControllers.signUp);
  app.post("/update-avt", userInforControllers.updateAvt);
  app.post("/update-pass", userInforControllers.updatePass);
}
module.exports = router;
