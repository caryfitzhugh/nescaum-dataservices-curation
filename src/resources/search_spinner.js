import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchSpinner extends Component {

  render() {
    if (this.props.is_searching) {
      return (
        <div className='spinner'> <span className='fa fa-spinner'></span> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchSpinner);
