
const userInforControllers = require('../../app/controllers/userInforControllers')

const mongoose = require('mongoose')
const model = require('../../app/models/UserDataModel')
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
            { $sort: { count: -1 } },
            { $limit: 1 }                // sắp xếp giảm dần theo số lượng
        ])

        if (!data) res.status(500).json({ success: false, message: 'Không tìm thấy tài khoản' })

        else {

            console.log(data[0])
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
        console.log(count)
        res.status(200).json({ success: true, count: count });

    })



    app.get('/getSoLuongPhim', async (req, res, next) => {
        const result = await model.aggregate([
            {
                $match: { "watchContinues.timeContinue": { $gt: 0 } }
            },
            {
                $group: {
                    _id: null,
                    totalTime: { $sum: { $sum: "$watchContinues.timeContinue" } },
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
        console.log(result);

    })
    app.get("/getCurrentUser", userInforControllers.getCurrentUser);
    app.get("/getUserInfor", userInforControllers.showUserInfor);
    app.post("/handleLoveFilm", userInforControllers.handleLoveFilm);
    app.post("/handleWatchLater", userInforControllers.handleWatchLater);
    app.post("/sign-up", userInforControllers.signUp);
    app.post("/update-avt", userInforControllers.updateAvt);
    app.post("/update-pass", userInforControllers.updatePass);
}
module.exports = router;
