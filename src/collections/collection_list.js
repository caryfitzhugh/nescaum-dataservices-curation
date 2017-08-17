import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import "./collection_list.css";

class CollectionList extends Component {
  render() {
    return (
      <ul className='collection-resource-list'>
        {(this.props.resources || []).length === 0 ? <li>  No Resources </li> : null }
        {(this.props.resources || []).map(resource => {
          if (resource) {
            return <li className='resource'
                        key={resource.id}>
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
