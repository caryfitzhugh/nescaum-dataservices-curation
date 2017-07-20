import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getResource } from './../resources/actions';
import "./collection_list.css";

class CollectionList extends Component {

  // Only need to run once, b/c things will change, and we'll re-load
  componentDidMount(nextProps) {
    (this.props.docids || []).forEach((docid) => {
      if (!this.props.resources[docid]) {
        this.props.performResourceGet(docid);
      }
    });
  }

  render() {
    return (
      <ul className='collection-resource-list'>
        {(this.props.docids || []).map(docid => {
          let resource = this.props.resources[docid] ;
          if (resource) {
            return <li className='resource'
                        key={docid}>
                    <label className='resource-title'>
                      <Link to={'/resources/'+resource.docid}>{resource.title}</Link>
                      <small>
                        <em>
                          {resource.docid}
                        </em>
                      </small>
                    </label>
              </li>
           } else {
            return null;
           }

        })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources || {}
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performResourceGet: (docid) => dispatch(getResource(docid)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
