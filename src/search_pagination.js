import React, { Component } from 'react';
import { connect } from 'react-redux';
import './search_pagination.css';
class SearchPagination extends Component {

  render() {
    if (this.props.response.page) {
      let prev_disabled =  this.props.response.page === 1;
      let next_disabled =  this.props.response.page === this.props.response.total_pages;
      return (
        <div className='search-pagination'>
          <span className={'btn btn-secondary btn-sm fa fa-chevron-left ' + (this.props.response.page === 1 ? 'disabled' : '')}
                onClick={() => {!prev_disabled && this.props.onChangePage(this.props.response.page - 1)}}></span>
          <label>Page {this.props.response.page} of {Math.ceil(this.props.response.total / this.props.response.per_page)}</label>
          <span className={'btn btn-secondary btn-sm fa fa-chevron-right ' + (this.props.response.page === this.props.response.total_pages ? 'disabled' : '')}
                onClick={() => {!next_disabled && this.props.onChangePage(this.props.response.page + 1)}}></span>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPagination);
