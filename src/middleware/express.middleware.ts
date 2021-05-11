import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import sessionMiddlware from "./session.middleware";


module.exports = (app) => {
    console.log("init middlewares");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(cors({
      origin: "http://localhost:3000",
      credentials: true
    }));
    app.use(sessionMiddlware);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static('public'));
}