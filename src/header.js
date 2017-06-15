import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <div className='navbar navbar-dark bg-faded'>
    <a className='navbar-brand'> Nescaum Dataservices Curation </a>
    <form className='form form-inline'>
      <Link to='/resources/create'  className='btn btn-primary'>Create New Resource </Link>
    </form>
  </div>
)
export default Header;
