const UserModel = require('../models/UserModel')
const UserData = require('../models/UserDataModel')

class userInforControllers {
    showUserInfor(req,res,next) {
        if(req.isAuthenticated()) {
            UserModel.findOne({_id:req.user._id})
            .then(data => {
                if(!data) res.status(400).json({ success: false, message: 'Đăng nhập thất bại' });
                else {
                    UserData.findOne({accout_ID : data._id})
                    .then(result => {
                        if(!result) res.status(500).json({ success: false, message: 'Không tìm thấy tài khoản'})
                        else {
                            console.log(data)
                            console.log(result)
                            console.log({...data,result})
                            res.status(200).json(result); 
                        }
                    }).catch(err => next(err))
                }
            })
            .catch(err => next(err))
        }else res.status(400).json({ success: false, message: 'Đăng nhập thất bại' });
    }

    signUp = (req, res, next) => {
        const { username, pwd: password } = req.body;
        UserModel.findOne({ gg_id: '', username })
        .then(data => {
            if (!data) {
                const newUser = new UserModel({
                    username,
                    password,
                    gg_id: ''
                });

                newUser.save()
                    .then(savedUser => {
                        const newUserData = new UserData({
                            accout_ID: savedUser._id,
                            watchContinues: [],
                            loveFilms: [],
                            watchLaters: []
                        });

                        newUserData.save()
                            .then(() => {
                                res.status(200).json({ success: true });
                            })
                            .catch(err => next(err));
                    })
                    .catch(err => next(err));
            } else {
                res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });
            }
        })
        .catch(err => next(err));
    };


    updateAvt(req,res,next) {
        let avt = req.query.avt
        let id = req.user._id
        UserModel.findOneAndUpdate({_id : id},{avt : avt})
        .then(data => {
            res.status(200).json({message:true})
        }).catch(err => next(err))
    }

    updatePass(req,res,next) {
        let id = req.user._id
        let newPass = req.body.newPassWord
        UserModel.findOneAndUpdate({_id:id},{password:newPass})
        .then(data => {
            res.status(200).json({message:true})
        }).catch(err => next(err))
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

    // addLikeComic(req,res,next) {
    //     if(req.isAuthenticated()) {
    //         let slug = req.query.slug
    //         let id = req.user._id
    //         VoteComics.findOne({slug : slug})
    //         .then(data => {
    //             if(!data) {
    //                 let ListUsersReact = []
    //                 ListUsersReact.push({
    //                     userId : id
    //                 })
    //                 let newVoteComics = new VoteComics({
    //                     slug : slug,
    //                     heart : 1,
    //                     ListUsersReact : ListUsersReact
    //                 })
    //                 newVoteComics.save()
    //             }else {
    //                 data.heart += 1
    //                 data.ListUsersReact.push({
    //                     userId : id
    //                 })
    //                 data.save()
    //             }
    //             res.redirect(`/infor?slug=${slug}`)
    //         }).catch(err => {
    //             next(err)
    //         })
    //     }
    // }

    // removeLikeComic(req,res,next) {
    //     if(req.isAuthenticated()) {
    //         let slug = req.query.slug
    //         let id = req.user._id
    //         VoteComics.updateOne(
    //             {slug : slug},
    //             {
    //                 $inc: { heart: -1 },
    //                 $pull : {ListUsersReact:{userId : id}}
    //             }
    //         )
    //         .then(() => {
    //             res.redirect(`/infor?slug=${slug}`)
    //         }).catch(err => {
    //             next(err)
    //         })
    //     }
    // }

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

module.exports = new userInforControllers