import React from 'react';
import {SearchBarToggle} from '../../redux/common/actions'
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  const searchTog = useSelector(state => state.searchToggle)
    return(
        <div>
        <form className="form-inline search-form" onClick={() => dispatch(SearchBarToggle(searchTog))}><span className="mobile-search search-icon"><i className="fa fa-search"></i></span></form>
       </div>
    )
}

export default Search