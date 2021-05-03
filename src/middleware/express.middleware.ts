import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";

module.exports = (app) => {
    console.log("init middlewares");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(cors());
    app.use(
        session({
          secret: "secret",
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
          },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('public'));
}