const mongoose = require('mongoose')
const Schema = mongoose.Schema

const watchContinue = new Schema({
    slug: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    nameEp: {
        type: String,
        require: true
    },
    linkEp: {
        type: String,
        require: true
    },
    timeContinue: {
        type: Number,
        require: 0
    },
    percentRemain: {
        type: Number,
        default: 0
    },
    timeTotal: {
        type: Number,
        require: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const loveFilm = new Schema({
    category: [
        {
            id: String,
            name: String,
            slug: String
        }
    ],
    chap: String,
    imdb: Number,
    img: String,
    lang: String,
    name: String,
    originName: String,
    pagination: {
        totalItems: Number,
        totalItemsPerPage: Number,
        currentPage: Number,
        pageRanges: Number
    },
    poster_url: String,
    quality: String,
    slug: String,
    time: String,
    year: Number,
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const watchLater = new Schema({
    category: [
        {
            id: String,
            name: String,
            slug: String
        }
    ],
    chap: String,
    imdb: Number,
    img: String,
    lang: String,
    name: String,
    originName: String,
    pagination: {
        totalItems: Number,
        totalItemsPerPage: Number,
        currentPage: Number,
        pageRanges: Number
    },
    poster_url: String,
    quality: String,
    slug: String,
    time: String,
    year: Number,
    isDeleted: {
        type: Boolean,
        default: false
    }
})


const UserData = new Schema({
    accout_ID: {
        type: String,
        required: true
    },
    watchContinues: [watchContinue],
    loveFilms: [loveFilm],
    watchLaters: [watchLater]
}, {
    collection: 'UserDatas'
});

module.exports = mongoose.model('UserDatas', UserData)