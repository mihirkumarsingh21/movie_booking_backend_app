import express from "express";
import { createMovie, getMovie, deleteMovie, updateMovie } from "../controllers/movie.controller.js";

const route = express.Router();


route.post("/create-movie", createMovie);
route.get("/get-movie/:movieId", getMovie);
route.put("/update-movie/:movieId", updateMovie);
route.delete("/delete-movie/:movieId", deleteMovie);



export default route;