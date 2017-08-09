import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './resource_search_result.css';

class ResourceSearchResult extends Component {
  render() {
    var resource = this.props.resource;
    let skip_ids = this.props.skip_ids || [];
    let present = skip_ids.includes(resource.id);

      return (
        <div className='resource-search-result search-result' key={resource.id}>
          <h3>
            {this.props.resource.title}
            <small><em>{this.props.resource.id}</em></small>
          </h3>

          <a onClick={(evt) => { !present && this.props.onAdd(this.props.resource.id)}}
             className={ ('btn btn-sm btn-primary ') + (present ? 'disabled' : '')}> Add To Collection </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResourceSearchResult);
