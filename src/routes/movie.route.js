import express from "express";
import { createMovie, getMovie, deleteMovie } from "../controllers/movie.controller.js";

const route = express.Router();


route.post("/create-movie", createMovie);
route.get("/get-movie/:movieId", getMovie);
route.delete("/delete-movie/:movieId", deleteMovie);


export default route;