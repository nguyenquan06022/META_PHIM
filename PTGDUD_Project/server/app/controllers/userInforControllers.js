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
            UserDataModel.findOne({ accout_ID: data._id })
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
                    role: data.role,
                    accout_ID: result.accout_ID,
                    watchContinues: result.watchContinues,
                    loveFilms: result.loveFilms,
                    watchLaters: result.watchLaters,
                  };
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

  updateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      const id = req.user._id;
      const newObj = req.body;
      newObj.role = req.user.role;

      UserModel.findOneAndUpdate({ _id: id }, newObj, {
        new: true,
        runValidators: true,
      })
        .then((updatedUser) => {
          res.status(200).json({ success: true, user: updatedUser });
        })
        .catch((err) => next(err));
    } else {
      res.status(400).json({ success: false, message: "Chưa đăng nhập" });
    }
  };

  logoutUser = (req, res) => {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, message: "Lỗi đăng xuất", error: err });

        req.session.destroy((err) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: "Không xoá được session",
              error: err,
            });

          res.clearCookie("connect.sid");
          res.status(200).json({ success: true, message: "Đã đăng xuất" });
        });
      });
    } else {
      res.status(400).json({ success: false, message: "Chưa đăng nhập" });
    }
  };

  handleLoveFilm(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const filmData = req.body;
    const userId = req.user.id || req.user._id;

    UserDataModel.findOne({ accout_ID: userId })
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

    UserDataModel.findOne({ accout_ID: userId })
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

    UserDataModel.findOne({ accout_ID: userId })
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

    UserDataModel.findOne({ accout_ID: userId })
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

  getTheLoaiYeuThich = async (req, res, next) => {
    const data = await UserDataModel.aggregate([
      { $unwind: "$loveFilms" }, // bóc từng phần tử loveFilms
      { $unwind: "$loveFilms.category" }, // bóc từng category trong mỗi loveFilm
      {
        $group: {
          _id: "$loveFilms.category.name", // group theo tên thể loại
          count: { $sum: 1 }, // đếm số lần thể loại xuất hiện
        },
      },
      { $sort: { count: -1 } }, // sắp xếp giảm dần theo số lượng
    ]);

    if (!data)
      res
        .status(500)
        .json({ success: false, message: "Không tìm thấy tài khoản" });
    else {
      console.log("day la the loai  duoc yeu thic nhat", data[0]);
      res.status(200).json(data[0]);
    }
  };

  getSoLuongTaiKhoan = async (req, res, next) => {
    const now = new Date();
    const users = await UserModel.find({
      createdAt: {
        $gte: new Date(now.getFullYear(), now.getMonth(), 1), // Đầu tháng
        $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1), // Đầu tháng sau
      },
    });
    const count = users.length; // Đếm số lượng tài khoản trong tháng này
    console.log("day la so luong tai khoan ", count);

    res.status(200).json({ success: true, count: count });
  };

  getThoiGianTrungBinh = async (req, res, next) => {
    const result = await UserDataModel.aggregate([
      {
        $unwind: "$watchContinues",
      },
      {
        $match: {
          "watchContinues.timeContinue": { $gt: 0 },
          // Thời gian nằm trong tháng hiện tại
          "watchContinues.createdAt": {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalTime: { $sum: "$watchContinues.timeContinue" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          averageTime: { $divide: ["$totalTime", "$count"] },
        },
      },
    ]);

    console.log("day la thoi gian trung binh", result);

    return res.status(200).json({
      success: true,
      averageTime: result.length > 0 ? result[0].averageTime : 0, // Nếu không có kết quả thì trả về 0
    });
  };

  getSoLuotXem = async (req, res, next) => {
    const soluong = await UserDataModel.aggregate([
      {
        $unwind: "$watchContinues",
      },
      {
        $match: {
          "watchContinues.createdAt": {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ]);

    console.log("day la so luot xem", soluong[0].total);
    return res.status(200).json({
      success: true,
      total: soluong[0].total, // Nếu không có kết quả thì trả về 0
    });
  };

  getSoLuotXemNgay = async (req, res, next) => {
    const nam = new Date().getFullYear();
    const thang = new Date().getMonth() + 1; // Tháng hiện tại (0-11) => (1-12)

    var soNgay = getLastDayOfMonth(nam, thang); // Thay đổi tháng và năm ở đây
    var soNgayThangTruoc = getLastDayOfMonth(nam, thang - 1); // Thay đổi tháng và năm ở đây

    console.log("day la so luot xem trong thang nay", thang);
    console.log("day la so luot xem trong thang nay", nam);

    var arrCurrent = new Array(soNgay).fill(0); // Tạo mảng với số ngày của tháng hiện tại
    var arrPre = new Array(soNgayThangTruoc).fill(0); // Tạo mảng với số ngày của tháng trước

    for (let i = 1; i <= soNgay; i++) {
      var date = new Date(nam, thang - 1, i + 1); // Tạo ngày từ 1 đến số ngày của tháng hiện tại
      // console.log('day la so luot xem trong thang nsdfsdfsdfsdfsday', date)
      var rs = await UserDataModel.aggregate([
        {
          $unwind: "$watchContinues",
        },
        {
          $match: {
            $expr: {
              $eq: [
                {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$watchContinues.createdAt",
                  },
                },
                date.toISOString().split("T")[0], // Chuyển đổi ngày thành chuỗi định dạng YYYY-MM-DD
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
          },
        },
      ]);

      arrCurrent[i - 1] = rs.length > 0 ? rs[0].total : 0; // Nếu không có kết quả thì trả về 0
    }

    for (let i = 1; i <= soNgay; i++) {
      console.log("day la so luot xem trong thang nay", thang - 2);
      var date2 = new Date(nam, thang - 2, i + 1); // Tạo ngày từ 1 đến số ngày của tháng hiện tại
      console.log("day la date 2", date2);
      var rs = await UserDataModel.aggregate([
        {
          $unwind: "$watchContinues",
        },
        {
          $match: {
            $expr: {
              $eq: [
                {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$watchContinues.createdAt",
                  },
                },
                date2.toISOString().split("T")[0], // Chuyển đổi ngày thành chuỗi định dạng YYYY-MM-DD
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
          },
        },
      ]);

      arrPre[i - 1] = rs.length > 0 ? rs[0].total : 0; // Nếu không có kết quả thì trả về 0
    }

    return res.status(200).json({
      success: true,
      currentMonth: arrCurrent, // Nếu không có kết quả thì trả về 0
      lastMonth: arrPre, // Nếu không có kết quả thì trả về 0
    });
  };
}

function getLastDayOfMonth(year, month) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

module.exports = new userInforControllers();
