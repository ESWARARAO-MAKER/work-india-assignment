import { Component } from "react";
import './index.css'
import Navbar from "../Navbar";
import {Bars} from 'react-loader-spinner'
import SingleMoviePage from "../SingleMoviePage";
import Pagination from '../Pagination'

class PopularPage extends Component{
    state = {
        isLoading : true,
        popularMovieResponse : {},
    }

    componentDidMount(){
        this.getPopularMoviesResponse()
    }

    getUpdatedData = responseData => ({
        totalPages : responseData.total_pages,
        totalResults : responseData.total_results,
        results : responseData.results.map(eachMovie => ({
            id : eachMovie.id,
            posterPath : `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
            voteAverage : eachMovie.vote_average,
            title : eachMovie.title,
        })),
    })

    getPopularMoviesResponse = async (page = 1) => {
        const API_KEY = '601b3e252181cd2209f7592247762295'
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        const newData = this.getUpdatedData(data)
        this.setState({isLoading: false, popularMovieResponse : newData})
    }

    renderLoadingView = () => {
        <div className="loader-container">
            <Bars type = "TailSpin" color = '#032541'/>
        </div>
    }

    renderPopularMoviesList = () => {
        const {popularMovieResponse} = this.state
        const {results} = popularMovieResponse

        return (
            <ul className="row p-2 ms-5 me-5 mt-3 popular-container">
                {results.map(movie => (
                    <SingleMoviePage key={movie.id} movieDetails = {movie}/>
                ))}
            </ul>
        )
    }

    render(){
        const {isLoading, popularMovieResponse} = this.state
        return(
            <div className="popular-page">
                <Navbar/>
                <div className="popular-page-container">
                    {isLoading ? this.renderLoadingView() : this.renderPopularMoviesList()}
                </div>
                <Pagination totalPages = {popularMovieResponse.totalPages} apiCallback = {this.getPopularMoviesResponse}/>
            </div>
        )
    }
}
export default PopularPage