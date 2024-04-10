import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './index.css'
import Navbar from '../Navbar'

const MovieDetailsPage = () => {
    const [movieDetails, setMovieDetails] = useState({})
    const [castDetails, setCastDetails] = useState({})
    const {id} = useParams()
    useEffect( () => { 
        const getMovieDetails = async (id) => {
            const API_KEY = '601b3e252181cd2209f7592247762295'
            const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
            const response = await fetch(apiUrl)
            const data = await response.json()
            console.log(data)
            setMovieDetails(data)
        }
        const getCastDetails = async (id) => {
            const API_KEY = '601b3e252181cd2209f7592247762295'
            const castApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
            const castResponse = await fetch(castApiUrl)
            const castData = await castResponse.json()
            console.log(castData)
            setCastDetails(castData)
        }
        getMovieDetails(id)
        getCastDetails(id)
        
    },[id])
    


 
    return (
        <>
            <Navbar/>
            <div className='bg-dark'>
                <div className='container'>
                    <div className='movie-details-container' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})`,backgroundRepeat : 'no-repeat', backgroundSize:'100%'}}>
                        <div className='movie-details'>
                            <div className=''>
                                <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt = {movieDetails.title} className='img'/>
                            </div>
                            <div className='movie-des'>
                                <h2>{movieDetails.title}</h2>
                                <span>Rating: {movieDetails.vote_average}</span>
                                <span>{movieDetails.runtime} {movieDetails.tagline}</span>
                                <span>Release Date: {movieDetails.release_date}</span>
                            </div>
                        </div>
                        <div className='over-view'>
                            <h1 className='text-center'>Overview</h1>
                            <span>{movieDetails.overview}</span>
                        </div>
                    </div>
                    <h1 className='m-3'>Cast</h1>
                    <ul className='cast'>
                        {castDetails.cast.map(each => (
                            <li className='card card-item'>
                                <img src={`https://image.tmdb.org/t/p/w500${each.profile_path}`} alt='img' className='img'/>
                                <span>{each.name}</span>
                                <span>{each.character}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default MovieDetailsPage