const userInforControllers = require('../../app/controllers/userInforControllers')

const mongoose = require('mongoose')
const model = require('../../app/models/UserDataModel')
function router(app) {
    app.post('/sign-up', userInforControllers.signUp)
    app.post('/update-avt', userInforControllers.updateAvt)
    app.post('/update-pass', userInforControllers.updatePass)
    app.get('/getUserInfor', userInforControllers.showUserInfor)

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
}
module.exports = router