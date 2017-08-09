import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getResource } from './../resources/actions';
import "./collection_list.css";

class CollectionList extends Component {

  // Only need to run once, b/c things will change, and we'll re-load
  componentDidMount(nextProps) {
    (this.props.ids || []).forEach((id) => {
      if (!this.props.resources[id]) {
        this.props.performResourceGet(id);
      }
    });
  }

  render() {
    return (
      <ul className='collection-resource-list'>
        {(this.props.ids || []).map(id => {
          let resource = this.props.resources[id] ;
          if (resource) {
            return <li className='resource'
                        key={id}>
                    <label className='resource-title'>
                      <Link to={'/resources/'+resource.id}>{resource.title}</Link>
                      <small>
                        <em>
                          {resource.id}
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
    performResourceGet: (id) => dispatch(getResource(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
