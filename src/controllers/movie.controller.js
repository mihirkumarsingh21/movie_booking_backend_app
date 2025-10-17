import { isValidObjectId } from "mongoose";
import { Movie } from "../models/movie.model.js";



export const createMovie = async (req, res) => {
    try {
        const { name, description, casts, trailerUrl, language, releaseDate, director, releaseStatus } = req.body;

        console.table([name, description, casts, trailerUrl, language, releaseDate, director, releaseStatus]);
        

        if(!name || !description || !casts || !trailerUrl || !language || !releaseDate || !director || !releaseStatus) return res.status(400).json({
            success: false,
            message: "these fields are required."
        })

       
        const createdMovie = await Movie.create({
            name,
            description,
            casts,
            trailerUrl,
            language,
            releaseDate,
            director, 
            releaseStatus
        });

        if(!createdMovie) return res.status(400).json({
            success: false,
            message: "failed to create to a movie."
        })

        return res.status(201).json({
            success: true,
            message: "new movie created successfully.",
            newMovie: createdMovie
        })



    } catch (error) {
        console.log(`error while creating new movie: ${error}`);
        res.status(500).json({
            succcess: false,
            errorMessage: `server error something went wrong: ${error}`
        })
        return;
    }
}


export const getMovie = async (req, res) => {
    try {

        const {movieId} = req.params;
        console.log(`movieId: ${movieId}`);
        
        if(!movieId || !isValidObjectId(movieId)) return res.status(400).json({
            success: false,
            message: "movie id are not present in your url Or invalid movie id." 
        })

        const movie = await Movie.findById(movieId);
        if(!movie) return res.status(404).json({
            success: false,
            message: "movie not found with corresponding id.."
        })

        return res.status(200).json({
            success: true,
            movie: movie
        })

         
    } catch (error) {
        console.log(`error whhile getting single movie: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        return;
    }
}

export const updateMovie = async (req, res) => {
    try {
        const {movieId} = req.params;
        
        if(!movieId || !isValidObjectId(movieId)) return res.status(400).json({
            success: false,
            message: "movie id are not present in your url Or invalid movie id." 
        })

        const isMovieExist = await Movie.findById(movieId);
        if(!isMovieExist) return res.status(404).json({
            succcess: false,
            message: "movie not found : movie does not exist with this id."
        })
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {new: true});

        if(!updatedMovie) return res.status(400).json({
            succcess: false,
            message: "failed to deleted movie."
        })

        return res.status(200).json({
            success: true,
            message: "movie updated successfully.",
            updatedMovie: updatedMovie
        })

    } catch (error) {
        console.log(`error while updating movie: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error}`
        })
        return;
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const {movieId} = req.params;
        if(!movieId || !isValidObjectId(movieId)) return res.status(400).json({
            success: false,
            message: "movie id are not present in your url Or invalid movie id." 
        })


         const isMovieExist = await Movie.findById(movieId);
        if(!isMovieExist) return res.status(404).json({
            succcess: false,
            message: "movie not found : movie does not exist with this id."
        })

        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if(!deletedMovie) return res.status(400).json({
            succcess: false,
            message: "failed to delete movie."
        })

        return res.status(200).json({
            success: true,
            message: "movie deleted successfully."
        })

    } catch (error) {
        console.log(`error while deleting movie: ${error}`);
        
        res.status(500).json({
            succcess: false,
            message: `server error something went wrong: ${error}`
        })
        return;
    }
}