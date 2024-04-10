import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState hook
import './index.css';
import SearchMoviesContext from '../../context/SearchMoviesContext';

const Navbar = (props) => {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false); // State to control navbar visibility

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen); // Toggle navbar state
    };

    const renderSearchBar = () => (
        <SearchMoviesContext.Consumer>
            {(value) => {
                const { onTriggerSearchingQuery, onChangeSearchInput, searchInput } = value;
                const onChangeHandler = (event) => onChangeSearchInput(event.target.value);
                const onSearchHandler = (event) => {
                    event.preventDefault();
                    onTriggerSearchingQuery();
                    navigate('/search');
                };
                return (
                    <form onSubmit={onSearchHandler} className="d-flex align-items-center">
                        <input
                            type="search"
                            className="me-2 search-input form-control"
                            onChange={onChangeHandler}
                            value={searchInput}
                            placeholder="Search"
                        />
                        <button className="btn btn-outline-info" type="submit">
                            Search
                        </button>
                    </form>
                );
            }}
        </SearchMoviesContext.Consumer>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    MovieDB
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isNavOpen ? 'true' : 'false'} // Set aria-expanded based on isNavOpen state
                    aria-label="Toggle navigation"
                    onClick={toggleNav} // Toggle the navbar state on click
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Popular
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/top-rated" className="nav-link">
                                Top Rated
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/upcoming" className="nav-link">
                                Upcoming
                            </Link>
                        </li>
                    </ul>
                    {renderSearchBar()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
