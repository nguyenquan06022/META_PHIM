
const userInforControllers = require('../../app/controllers/userInforControllers')

const mongoose = require('mongoose')
const model = require('../../app/models/UserDataModel')
const UserModel = require('../../app/models/UserModel')
function router(app) {

    app.get('/getTheLoaiYeuThich', async (req, res, next) => {
        const data = await model.aggregate([
            { $unwind: "$loveFilms" },               // bóc từng phần tử loveFilms
            { $unwind: "$loveFilms.category" },      // bóc từng category trong mỗi loveFilm
            {
                $group: {
                    _id: "$loveFilms.category.name",     // group theo tên thể loại
                    count: { $sum: 1 }                   // đếm số lần thể loại xuất hiện
                }
            },
            { $sort: { count: -1 } }           // sắp xếp giảm dần theo số lượng
        ])

        if (!data) res.status(500).json({ success: false, message: 'Không tìm thấy tài khoản' })

        else {

            console.log('day la the loai  duoc yeu thic nhat', data[0])
            res.status(200).json(data[0]);
        }
    })

    app.get('/getSoLuongTaiKhoan', async (req, res, next) => {
        const now = new Date();
        const users = await UserModel.find({
            createdAt: {
                $gte: new Date(now.getFullYear(), now.getMonth(), 1),               // Đầu tháng
                $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1),            // Đầu tháng sau
            }
        });
        const count = users.length; // Đếm số lượng tài khoản trong tháng này
        console.log('day la so luong tai khoan ', count)


        res.status(200).json({ success: true, count: count });

    })



    app.get('/getThoiGianTrungBinh', async (req, res, next) => {
        const result = await model.aggregate([
            {
                $unwind: "$watchContinues"
            },
            {
                $match: {
                    "watchContinues.timeContinue": { $gt: 0 },
                    // Thời gian nằm trong tháng hiện tại
                    "watchContinues.createdAt": {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalTime: { $sum: "$watchContinues.timeContinue" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    averageTime: { $divide: ["$totalTime", "$count"] }
                }
            }
        ]);

        console.log('day la thoi gian trung binh', result);

        return res.status(200).json({
            success: true,
            averageTime: result.length > 0 ? result[0].averageTime : 0, // Nếu không có kết quả thì trả về 0
        })


    })

    app.get('/getSoLuotXem', async (req, res, next) => {


        const soluong = await model.aggregate([
            {
                $unwind: "$watchContinues"
            },
            {
                $match: {
                    "watchContinues.createdAt": {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            }
        ]);


        console.log('day la so luot xem', soluong[0].total)
        return res.status(200).json({
            success: true,
            total: soluong[0].total, // Nếu không có kết quả thì trả về 0
        })
    })

    function getLastDayOfMonth(year, month) {

        // Tạo một đối tượng Date với ngày đầu tiên của tháng tiếp theo
        const date = new Date(year, month, 0); // Tháng 0 là tháng 1 (tháng 1 - 1)
        return date.getDate(); // Trả về ngày cuối cùng của tháng
    }

    app.get('/getSoLuotXemNgay', async (req, res, next) => {
        const nam = new Date().getFullYear()
        const thang = new Date().getMonth() + 1; // Tháng hiện tại (0-11) => (1-12)

        var soNgay = getLastDayOfMonth(nam, thang); // Thay đổi tháng và năm ở đây
        var soNgayThangTruoc = getLastDayOfMonth(nam, thang - 1); // Thay đổi tháng và năm ở đây

        console.log('day la so luot xem trong thang nay', thang)
        console.log('day la so luot xem trong thang nay', nam)

        var arrCurrent = new Array(soNgay).fill(0); // Tạo mảng với số ngày của tháng hiện tại
        var arrPre = new Array(soNgayThangTruoc).fill(0); // Tạo mảng với số ngày của tháng trước

        for (let i = 1; i <= soNgay; i++) {
            var date = new Date(nam, thang - 1, i + 1); // Tạo ngày từ 1 đến số ngày của tháng hiện tại
            // console.log('day la so luot xem trong thang nsdfsdfsdfsdfsday', date)
            var rs = await model.aggregate([
                {
                    $unwind: "$watchContinues"
                },
                {
                    $match: {
                        $expr: {
                            $eq: [
                                { $dateToString: { format: "%Y-%m-%d", date: "$watchContinues.createdAt" } },
                                date.toISOString().split('T')[0] // Chuyển đổi ngày thành chuỗi định dạng YYYY-MM-DD
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 }
                    }
                }
            ]);

            arrCurrent[i - 1] = rs.length > 0 ? rs[0].total : 0; // Nếu không có kết quả thì trả về 0


        }


        for (let i = 1; i <= soNgay; i++) {
            console.log('day la so luot xem trong thang nay', thang - 2)
            var date2 = new Date(nam, thang - 2, i + 1); // Tạo ngày từ 1 đến số ngày của tháng hiện tại
            console.log('day la date 2', date2)
            var rs = await model.aggregate([
                {
                    $unwind: "$watchContinues"
                },
                {
                    $match: {
                        $expr: {
                            $eq: [
                                { $dateToString: { format: "%Y-%m-%d", date: "$watchContinues.createdAt" } },
                                date2.toISOString().split('T')[0] // Chuyển đổi ngày thành chuỗi định dạng YYYY-MM-DD
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 }
                    }
                }
            ]);

            arrPre[i - 1] = rs.length > 0 ? rs[0].total : 0; // Nếu không có kết quả thì trả về 0


        }

        return res.status(200).json({
            success: true,
            currentMonth: arrCurrent, // Nếu không có kết quả thì trả về 0
            lastMonth: arrPre, // Nếu không có kết quả thì trả về 0
        })

    })
    app.get('/logout', function (req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            // Xoá session nếu cần
            req.session.destroy((err) => {
                if (err) return next(err);
                res.clearCookie('connect.sid'); // Tên cookie mặc định của express-session
                return res.status(200).json({ success: true, message: "Đăng xuất thành công" });
            });
        });
    });
    app.get("/getCurrentUser", userInforControllers.getCurrentUser);
    app.get("/getUserInfor", userInforControllers.showUserInfor);
    app.post("/handleLoveFilm", userInforControllers.handleLoveFilm);
    app.post("/handleWatchLater", userInforControllers.handleWatchLater);
    app.post("/sign-up", userInforControllers.signUp);
    app.post("/update-avt", userInforControllers.updateAvt);
    app.post("/update-pass", userInforControllers.updatePass);
    app.post("/addWatchContinue", userInforControllers.addWatchContinue);
    app.post("/deleteWatchContinue", userInforControllers.deleteWatchContinue);
}
module.exports = router;
