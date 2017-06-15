import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <div className='navbar navbar-dark bg-faded'>
    <Link to="/" className='navbar-brand'> Nescaum Dataservices Curation </Link>
    <form className='form form-inline'>
      <Link to='/resources/create'  className='btn btn-primary'>Create New Resource </Link>
    </form>
  </div>
)
export default Header;
