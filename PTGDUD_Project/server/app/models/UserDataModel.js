const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchContinue = new Schema(
  {
    slug: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    nameEp: {
      type: String,
      require: true,
    },
    linkEp : {
        type: String,
        require: true
    },
    timeContinue: {
      type: Number,
      default: 0,
    },
    percentRemain: {
      type: Number,
      default: 0,
    },
    timeTotal: {
      type: Number,
      default: 0,
    },
    category: [
      {
        id: String,
        name: String,
        slug: String,
      },
    ],
    lang: String,
    originName: String,
    poster_url: String,
    quality: String,
    year: Number,
    time: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const tmdbSchema = new Schema(
  {
    type: String,
    id: String,
    season: Number,
    vote_average: Number,
    vote_count: Number,
  },
  { _id: false }
);

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


const UserData = new Schema(
  {
    accout_ID: {
      type: String,
      required: true,
    },
    watchContinues: [watchContinue],
    loveFilms: [loveFilm],
    watchLaters : [watchLater]
}, {
    collection : 'UserDatas'
});

module.exports = mongoose.model('UserDatas',UserData)