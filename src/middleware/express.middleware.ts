import express from "express";
import morgan from "morgan";
import cors from "cors";

module.exports = (app) => {
    console.log("init middlewares");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(cors());
}