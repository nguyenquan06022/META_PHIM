const UserModel = require("../models/UserModel");
const UserData = require("../models/UserDataModel");
const UserDataModel = require("../models/UserDataModel");

class userInforControllers {
  showUserInfor(req, res, next) {
    if (req.isAuthenticated()) {
      UserModel.findOne({ _id: req.user._id })
        .then((data) => {
          if (!data)
            res
              .status(400)
              .json({ success: false, message: "Đăng nhập thất bại" });
          else {
            UserData.findOne({ accout_ID: data._id })
              .then((result) => {
                if (!result)
                  res.status(500).json({
                    success: false,
                    message: "Không tìm thấy tài khoản",
                  });
                else {
                  const obj = {
                    username: data.username,
                    password: data.password,
                    avt: data.avt,
                    accout_ID: result.accout_ID,
                    watchContinues: result.watchContinues,
                    loveFilms: result.loveFilms,
                    watchLaters: result.watchLaters,
                  };
                  console.log(obj);
                  res.status(200).json(obj);
                }
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    } else
      res.status(400).json({ success: false, message: "Đăng nhập thất bại" });
  }

  signUp = (req, res, next) => {
    const { username, pwd: password } = req.body;
    UserModel.findOne({ gg_id: "", username })
      .then((data) => {
        if (!data) {
          const newUser = new UserModel({
            username,
            password,
            gg_id: "",
          });

          newUser
            .save()
            .then((savedUser) => {
              const newUserData = new UserData({
                accout_ID: savedUser._id,
                watchContinues: [],
                loveFilms: [],
                watchLaters: [],
              });

              newUserData
                .save()
                .then(() => {
                  res.status(200).json({ success: true });
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        } else {
          res
            .status(400)
            .json({ success: false, message: "Tài khoản đã tồn tại" });
        }
      })
      .catch((err) => next(err));
  };

  updateAvt(req, res, next) {
    let avt = req.query.avt;
    let id = req.user._id;
    UserModel.findOneAndUpdate({ _id: id }, { avt: avt })
      .then((data) => {
        res.status(200).json({ message: true });
      })
      .catch((err) => next(err));
  }

  updatePass(req, res, next) {
    let id = req.user._id;
    let newPass = req.body.newPassWord;
    UserModel.findOneAndUpdate({ _id: id }, { password: newPass })
      .then((data) => {
        res.status(200).json({ message: true });
      })
      .catch((err) => next(err));
  }

  // updateComicHistory(req,res,next) {
  //     let obj = req.body
  //     if(req.isAuthenticated()) {
  //     let id = req.user._id
  //         UserData.findOne({accout_ID : id})
  //         .then(data => {
  //             if(!data) {
  //                 res.end()
  //             }else {
  //                 let historyComicIndex = data.historyComic.findIndex(item => item.slug === obj.slug)
  //                 if(historyComicIndex == -1) {
  //                     data.historyComic.unshift({
  //                         img : obj.img,
  //                         slug : obj.slug,
  //                         comicName: obj.name,
  //                         chapName: obj.chapName,
  //                         linkChap: `/comic?slug=${obj.slug}&id=${obj.id}`,
  //                         readAt: obj.readAt
  //                     })
  //                     data.save()
  //                 }else {
  //                     data.historyComic[historyComicIndex] = {
  //                         img : obj.img,
  //                         slug : obj.slug,
  //                         comicName: obj.name,
  //                         chapName: obj.chapName,
  //                         linkChap: `/comic?slug=${obj.slug}&id=${obj.id}`,
  //                         readAt: obj.readAt
  //                     }
  //                     data.save()
  //                 }
  //                 res.end()
  //             }
  //         }).catch(err => {
  //             next(err)
  //         })
  //     }
  // }

  // getHistoryComic(req,res,next) {
  //     if(req.isAuthenticated()) {
  //         let id = req.user._id
  //         UserData.findOne({accout_ID : id})
  //         .then(data => {
  //             res.json(data.historyComic)
  //         }).catch(err => next(err))
  //     }
  //     else {
  //         res.json([])
  //     }
  // }

  // deleteHistoryComic(req,res,next) {
  //     if(req.isAuthenticated()) {
  //         let id = req.user._id
  //         let slug = req.query.slug
  //         UserData.updateOne(
  //             { accout_ID: id, "historyComic.slug": slug },
  //             { $set: { "historyComic.$.isDelete": true } }
  //         ).then(() => res.end())
  //         .catch(next)
  //     }
  // }

  handleLoveFilm(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const filmData = req.body;
    const userId = req.user.id || req.user._id;

    UserData.findOne({ accout_ID: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const existingFilm = user.loveFilms.find(
          (film) => film.slug === filmData.slug
        );

        if (!existingFilm) {
          // Thêm mới nếu chưa có
          user.loveFilms.push({ ...filmData, isDeleted: false });

          return user.save().then(() => {
            res.status(200).json({
              message: "Thêm vào danh sách yêu thích thành công",
            });
          });
        } else {
          // Nếu đã có, cập nhật isDeleted
          if (existingFilm.isDeleted) {
            existingFilm.isDeleted = false;

            return user.save().then(() => {
              res.status(200).json({
                message: "Thêm vào danh sách yêu thích thành công",
              });
            });
          } else {
            existingFilm.isDeleted = true;

            return user.save().then(() => {
              res.status(200).json({
                message: "Đã bỏ thích",
              });
            });
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi thêm phim:", error);
        next(error);
      });
  }

  handleWatchLater(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const filmData = req.body;
    const userId = req.user.id || req.user._id;

    UserData.findOne({ accout_ID: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const existingFilm = user.watchLaters.find(
          (film) => film.slug === filmData.slug
        );

        if (!existingFilm) {
          // Thêm mới nếu chưa có
          user.watchLaters.push({ ...filmData, isDeleted: false });

          return user.save().then(() => {
            res.status(200).json({
              message: "Thêm vào danh sách xem sau thành công",
            });
          });
        } else {
          // Nếu đã có, cập nhật isDeleted
          if (existingFilm.isDeleted) {
            existingFilm.isDeleted = false;

            return user.save().then(() => {
              res.status(200).json({
                message: "Thêm vào danh sách xem sau thành công",
              });
            });
          } else {
            existingFilm.isDeleted = true;

            return user.save().then(() => {
              res.status(200).json({
                message: "Đã xóa khỏi danh sách xem sau",
              });
            });
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi xử lý xem sau:", error);
        next(error);
      });
  }

  addWatchContinue = (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id || req.user.id;
    const newData = req.body;

    UserData.findOne({ accout_ID: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const index = user.watchContinues.findIndex(
          (item) => item.slug === newData.slug
        );

        if (index !== -1) {
          user.watchContinues[index] = Object.assign(
            {},
            user.watchContinues[index]._doc,
            newData
          );
        } else {
          user.watchContinues.unshift(newData);
        }

        if (user.watchContinues.length > 20) {
          user.watchContinues = user.watchContinues.slice(0, 20);
        }

        return user.save();
      })
      .then((savedUser) => {
        res.status(200).json({
          message: "WatchContinue updated",
          data: savedUser.watchContinues,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Server error", error });
      });
  };

  deleteWatchContinue = (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id || req.user.id;
    const slugToDelete = req.body.slug;

    UserData.findOne({ accout_ID: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const prevLength = user.watchContinues.length;
        user.watchContinues = user.watchContinues.filter(
          (item) => item.slug !== slugToDelete
        );

        if (user.watchContinues.length === prevLength) {
          return res
            .status(404)
            .json({ message: "Slug not found in watchContinues" });
        }

        return user.save();
      })
      .then((savedUser) => {
        res.status(200).json({
          message: "WatchContinue deleted",
          data: savedUser.watchContinues,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Server error", error });
      });
  };

  getCurrentUser(req, res) {
    if (req.isAuthenticated()) {
      UserDataModel.findOne({ accout_ID: req.user._id })
        .then((data) => {
          return res.json({ ...req.user, ...data });
        })
        .catch((err) =>
          res.status(400).json({ message: "Không tìm thấy UserData" })
        );
    } else {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }
  }

  // addFollow(req,res,next) {
  //     if(req.isAuthenticated()) {
  //         let slug = req.query.slug
  //         let id = req.user._id
  //             UserData.findOne({accout_ID : id})
  //             .then(async data => {
  //                 if(!data) {
  //                     res.end()
  //                 }else {
  //                     let obj = await fetch(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`)
  //                     .then(response => {
  //                         return response.json()
  //                     }).then(data => {
  //                         let name = data.data.seoOnPage.seoSchema.name
  //                         let img = data.data.seoOnPage.seoSchema.image
  //                         let linkInfor = `/infor?slug=${slug}`
  //                         let lastChap = data.data.item.chapters[0].server_data.pop().chapter_name
  //                         return {
  //                             slug,name,img,linkInfor,lastChap
  //                         }
  //                     }).catch(err => console.log(err))
  //                         data.followComic.push({
  //                             slug : slug,
  //                             comicName : obj.name,
  //                             img : obj.img,
  //                             linkInfor : obj.linkInfor,
  //                             lastChap : obj.lastChap
  //                         })
  //                     data.save()
  //                     res.redirect(`/infor?slug=${slug}`)
  //                 }
  //             }).catch(err => {
  //                 next(err)
  //             })
  //         }
  // }

  // deleteFollow(req,res,next) {
  //     if(req.isAuthenticated()) {
  //         let slug = req.query.slug
  //         let id = req.user._id
  //         UserData.updateOne(
  //             {accout_ID : id},
  //             {
  //                 $pull : {followComic : {'slug' : slug}}
  //             }
  //         ).then(() => {
  //             res.redirect(`/infor?slug=${slug}`)
  //         })
  //         .catch(err => next(err))
  //     }
  // }
}

module.exports = new userInforControllers();
