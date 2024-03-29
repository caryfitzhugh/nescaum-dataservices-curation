import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResourceSearchResult from './resource_search_result';
import SearchPagination from './../search_pagination';

class ResourceSearchResults extends Component {

  render() {
    let resources = this.props.resources || [];

      if (!this.props.is_searching) {
        if (this.props.response.total === 0) {
         // Searched, found nothing
          return (<div className='no-results'>
                    <div className='jumbotron'>
                      <h1> No Results Found </h1>
                    </div>
                  </div>);
        } else {
          var response_resources = ((this.props.response || {}).resources || []);

          return (
            <div className='search-results'>
              <SearchPagination response={this.props.response} onChangePage={(new_page) => this.props.onChangePage(new_page)}/>
              <ul className='results'>
                {response_resources.map(resource => {
                  return <ResourceSearchResult key={resource.id}
                                skip_ids={resources.map((res) => { return res.id })}
                                onAdd={(id) => {this.props.onAdd(id)}}
                                resource={resource}/>
                })}
              </ul>
            </div>);
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ResourceSearchResults);
