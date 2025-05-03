const userInforControllers = require("../../app/controllers/userInforControllers");
function router(app) {
  app.get("/getTheLoaiYeuThich", userInforControllers.getTheLoaiYeuThich);
  app.get("/getSoLuongTaiKhoan", userInforControllers.getSoLuongTaiKhoan);
  app.get("/getThoiGianTrungBinh", userInforControllers.getThoiGianTrungBinh);
  app.get("/getSoLuotXem", userInforControllers.getSoLuotXem);
  app.get("/getSoLuotXemNgay", userInforControllers.getSoLuotXemNgay);

  app.get("/getCurrentUser", userInforControllers.getCurrentUser);
  app.get("/getUserInfor", userInforControllers.showUserInfor);
  app.post("/handleLoveFilm", userInforControllers.handleLoveFilm);
  app.post("/handleWatchLater", userInforControllers.handleWatchLater);
  app.post("/sign-up", userInforControllers.signUp);
  app.post("/update-user", userInforControllers.updateUser);
  app.post("/logout", userInforControllers.logoutUser);
  app.post("/addWatchContinue", userInforControllers.addWatchContinue);
  app.post("/deleteWatchContinue", userInforControllers.deleteWatchContinue);
}
module.exports = router;
