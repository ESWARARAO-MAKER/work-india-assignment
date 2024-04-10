import {Component} from 'react'
import './index.css'
import {Bars} from 'react-loader-spinner'
import SingleMoviePage from '../SingleMoviePage'
import NavBar from '../Navbar'
import Pagination from '../Pagination'

class UpComingPage extends Component{
    state = {
        isLoading : true,
        upComingMovieResponse : {},
    }

    componentDidMount(){
        this.getUpcomingMoviesResponse()
    }

    getUpdatedData = responseData => ({
        totalPages: responseData.total_pages,
        totalResults: responseData.total_results,
        results: responseData.results.map(eachMovie => ({
          id: eachMovie.id,
          posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
          voteAverage: eachMovie.vote_average,
          title: eachMovie.title,
        })),
      })
    
      getUpcomingMoviesResponse = async (page = 1) => {
        const API_KEY = '601b3e252181cd2209f7592247762295'
        const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        const newData = this.getUpdatedData(data)
        this.setState({isLoading: false, upcomingMovieResponse: newData})
      }

      renderLoadingView = () => (
        <div className="loader-container">
          <Bars type="TailSpin" color="#032541" />
        </div>
      )

      renderPopularMoviesList = () => {
        const {upcomingMovieResponse} = this.state
        const {results} = upcomingMovieResponse
    
        return (
          <ul className="row p-0 ms-0 me-0 mt-3 d-flex justify-content-center">
            {results.map(movie => (
              <SingleMoviePage key={movie.id} movieDetails={movie} />
            ))}
          </ul>
        )
      }

      render() {
        const {isLoading, upcomingMovieResponse} = this.state
    
        return (
          <>
            <NavBar />
            <div className="route-page-body">
              {isLoading
                ? this.renderLoadingView()
                : this.renderPopularMoviesList()}
            </div>
            <Pagination
              totalPages={upcomingMovieResponse?.totalPages??0}
              apiCallback={this.getUpcomingMoviesResponse}
            />
          </>
        )
      }
}
export default UpComingPage