import React, { Component } from 'react';
import { connect } from 'react-redux';
import './search_pagination.css';
class SearchPagination extends Component {

  render() {
    return (
      <div className='search-pagination'>
        <span className={'btn btn-secondary btn-sm fa fa-chevron-left ' + (this.props.response.page === 1 ? 'disabled' : '')}
              onClick={() => {this.props.onChangePage(this.props.response.page - 1)}}></span>
        <label>Page {this.props.response.page} of {Math.ceil(this.props.response.total / this.props.response.per_page)}</label>
        <span className={'btn btn-secondary btn-sm fa fa-chevron-right ' + (this.props.response.page === this.props.response.total_pages ? 'disabled' : '')}
              onClick={() => {this.props.onChangePage(this.props.response.page + 1)}}></span>
      </div>
    );
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
