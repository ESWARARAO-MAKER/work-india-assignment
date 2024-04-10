import {Component} from 'react'
import './index.css'

class Pagination extends Component{
    state = {
        pageNo:1,
    }

    onNextPage = () => {
        const {apiCallback, totalPages} = this.props
        this.setState(prevState => {
            if (prevState.pageNo < totalPages){
                return {
                    pageNo : prevState.pageNo + 1,
                }
            }
            return prevState
        },
        () => {
            const {pageNo} = this.state
            apiCallback(pageNo)
        },
    )
    }

    onPrevPage = () => {
        const {apiCallback} = this.props
        this.setState(
            prevState => {
                if (prevState.pageNo > 1){
                    return {
                        pageNo : prevState.pageNo - 1,
                    }
                }
                return prevState
            },
            () => {
                const {pageNo} = this.state
                apiCallback(pageNo)
            },
        )
    }

    render(){
        const {pageNo} = this.state
        return(
            <div className='pagination-container mb-3 text-center gap-3'>
                <button type='button' className='btn btn-primary' onClick={this.onPrevPage}>Prev</button>
                <p className='page-no'>{pageNo}</p>
                <button type='button' className='btn btn-primary' onClick={this.onNextPage}>Next</button>
            </div>
        )
    }
}
export default Pagination