import {Link, useNavigate} from 'react-router-dom'
import './index.css'
import SearchMoviesContext from '../../context/SearchMoviesContext'


const Navbar = props => {

    const navigate = useNavigate() 

    const renderSearchBar = () => (
        <SearchMoviesContext.Consumer>
            {value => {
                const {
                    onTriggerSearchingQuery,
                    onChangeSearchInput,
                    searchInput,
                } = value
                const onChangeHandler = event => onChangeSearchInput(event.target.value)
                const onSearchHandler = event => {
                    event.preventDefault()
    
                    onTriggerSearchingQuery()
                    navigate('/search')
                    
                }
                return (
                    <div className='d-flex align-items-center'>
                        <input type='search' className='me-2 search-input' onChange={onChangeHandler} value={searchInput} placeholder='Search'/>
                        <button className='btn btn-outline-info' type='button' onClick={onSearchHandler}>Search</button>
                    </div>
                )
            }}
        </SearchMoviesContext.Consumer>
    )

    return(
        <nav className='navbar-container p-3'>
            <div className='logo-container'>
                <Link to='/' className='logo-link'>
                <h1 className='page-logo'>Movie<span>DB</span></h1>
                </Link>
            </div>
            <div className='ms-auto d-flex align-items-center gap-3'>
                <ul className='order-0 d-flex align-items-center p-0 mb-0 ms-3 nav-items-list'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Popular</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/top-rated'>Top Rated</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/upcoming'>Upcoming</Link>
                    </li>
                </ul>
                {renderSearchBar()}
            </div>
        </nav> 
    )
}
export default Navbar