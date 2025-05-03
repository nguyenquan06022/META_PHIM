const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const UserModel = require("../../app/models/UserModel");
const UserData = require("../../app/models/UserDataModel");
require("dotenv").config();

function auth(app) {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(function (username, password, done) {
      UserModel.findOne({ username: username, password: password })
        .then((data) => {
          if (!data) {
            return done(null, false);
          } else {
            const user = {
              username: data.username,
              _id: data._id,
              gg_id: data.gg_id,
              avt: data.avt,
              role: data.role,
            };
            return done(null, user);
          }
        })
        .catch((err) => {
          return done(err);
        });
    })
  );

  app.post("/login-local", function (req, res, next) {
    passport.authenticate("local", function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Tài khoản hoặc mật khẩu sai" });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ success: true, user: req.user });
      });
    })(req, res, next);
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err || !user) {
        return res.redirect(
          "http://localhost:3000/dangnhap?error=Đăng nhập thất bại"
        );
      }

      req.logIn(user, (err) => {
        if (err) {
          return res.redirect(
            "http://localhost:3000/dangnhap?error=Đăng nhập thất bại"
          );
        }

        const redirectUrl = `http://localhost:3000/oauth-success?userId=${user._id}`;
        return res.redirect(redirectUrl);
      });
    })(req, res, next);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_URL_CALLBACK,
      },
      (accessToken, refreshToken, profile, done) => {
        UserModel.findOne({ gg_id: profile.id })
          .then((data) => {
            if (!data) {
              const newUser = new UserModel({
                username: profile.displayName,
                gg_id: profile.id,
              });
              newUser.save().then((savedUser) => {
                const user = {
                  username: savedUser.username,
                  _id: savedUser._id,
                  gg_id: savedUser.gg_id,
                  avt: savedUser.avt,
                };
                let newUserData = new UserData({
                  accout_ID: savedUser._id,
                  historyComic: [],
                  followComic: [],
                });
                newUserData.save();
                return done(null, user);
              });
            } else {
              const user = {
                username: data.username,
                _id: data._id,
                gg_id: data.gg_id,
                avt: data.avt,
              };
              return done(null, user);
            }
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findOne({ _id: id })
      .then((data) => {
        if (!data) return done(null, false);
        const user = {
          username: data.username,
          _id: data._id,
          gg_id: data.gg_id,
          avt: data.avt,
          role: data.role,
        };
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  });
}

module.exports = auth;
