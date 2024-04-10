import {Link} from 'react-router-dom'
import './index.css'

const SingleMoviePage = (props) => {

    const {movieDetails} = props
    const { id, title, posterPath, voteAverage} = movieDetails

    return (
        <li className='movie-card-container col-12 col-sm-6 col-md-4 col-lg-2 mb-3 d-flex flex-column align-items-center card m-3'>
            <img className='movie-card-image' alt={title} src={posterPath}/>
            <div className='d-flex flex-column align-items-center mt-2'>
                <span className='movie-title m-0'>{title}</span>
                <p className='movie-rating mb-0 ms-1'>Rating : {voteAverage}</p>
            </div>
            <Link to = {`/movie/${id}`} className='mt-auto align-self-center'>
                <button className='btn btn-outline-dark' type='button'>View Details</button>
            </Link>
        </li>
    )
}
export default SingleMoviePage
