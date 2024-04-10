import {Component} from 'react'
import './index.css'
import Navbar from '../Navbar'
import SingleMoviePage from '../SingleMoviePage'
import Pagination from '../Pagination'
import {Bars} from 'react-loader-spinner'

class TopRatedPage extends Component{
    state = {
        isLoading : true,
        topRatedMovieResponse : {},
    }

    componentDidMount(){
        this.getTopRatedMoviesResponse()
    }

    getUpdatedData = data => ({
        totalPages: data.total_pages,
        totalResults: data.total_results,
        results: data?.results?.map(eachMovie => ({
          id: eachMovie.id,
          posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
          voteAverage: eachMovie.vote_average,
          title: eachMovie.title,
        })),
      })

    getTopRatedMoviesResponse = async ( page = 1) => {
        const API_KEY = '601b3e252181cd2209f7592247762295'
        const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        const newData  =this.getUpdatedData(data)
        console.log(newData)
        this.setState({isLoading : false, topRatedMovieResponse : newData})
    }

    renderLoadingView = () => (
        <div className='loader-container'>
            <Bars type = "TailSpin" color='#032541'/>
        </div>
    )

    renderPopularMoviesList = () => {
        const {topRatedMovieResponse} = this.state
        const {results} = topRatedMovieResponse

        return (
            <ul className='row p-0 ms-0 me-0 mt-3 d-flex justify-content-center'>
                {results.map(movie => (
                    <SingleMoviePage key = {movie.id} movieDetails = {movie}/>
                ))}
            </ul>
        )
    }

    render(){
        const {isLoading, topRatedMovieResponse} = this.state
        return(
            <div className='top-rated'>
                {' '}
                <Navbar />
                <div className='route-page-body'>
                    {isLoading ? this.renderLoadingView() : this.renderPopularMoviesList()}
                </div>
                <Pagination totalPages = {topRatedMovieResponse.totalPages} apiCallback = {this.getTopRatedMoviesResponse}/>
            </div>
        )
    }
}
export default TopRatedPage