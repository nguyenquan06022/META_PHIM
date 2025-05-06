const userInforControllers = require("../../app/controllers/userInforControllers");
const CommentsControllers = require("../../app/controllers/commentsControllers");

function router(app) {
  app.get("/getTheLoaiYeuThich", userInforControllers.getTheLoaiYeuThich);
  app.get("/getSoLuongTaiKhoan", userInforControllers.getSoLuongTaiKhoan);
  app.get("/getThoiGianTrungBinh", userInforControllers.getThoiGianTrungBinh);
  app.get("/getSoLuotXem", userInforControllers.getSoLuotXem);
  app.get("/getSoLuotXemNgay", userInforControllers.getSoLuotXemNgay);
  app.put("/capnhatuser/:iduser", userInforControllers.capNhatUser);
  app.delete("/xoauser/:iduser", userInforControllers.xoaUser);
  app.get("/getDsUser", userInforControllers.getDsUser);


  

  app.get("/getCurrentUser", userInforControllers.getCurrentUser);
  app.get("/getUserInfor", userInforControllers.showUserInfor);
  app.get("/getListComment", CommentsControllers.getCommentsByLink);
  app.post("/handleLoveFilm", userInforControllers.handleLoveFilm);
  app.post("/handleWatchLater", userInforControllers.handleWatchLater);
  app.post("/sign-up", userInforControllers.signUp);
  app.post("/update-user", userInforControllers.updateUser);
  app.post("/logout", userInforControllers.logoutUser);
  app.post("/addWatchContinue", userInforControllers.addWatchContinue);
  app.post("/deleteWatchContinue", userInforControllers.deleteWatchContinue);
  app.post("/addComment", CommentsControllers.addComment);
  app.post("/editComment", CommentsControllers.editComment);
  app.post("/deleteComment", CommentsControllers.deleteComment);
}
module.exports = router;
