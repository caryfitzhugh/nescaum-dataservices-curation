import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getResource } from './../resources/actions';
import "./edit_collection_list.css";

class EditCollectionList extends Component {

  componentWillReceiveProps(nextProps) {
    (nextProps.docids || []).forEach((docid) => {
      if (!nextProps.resources[docid]) {
        nextProps.performResourceGet(docid);
      }
    });
  }
  move (indx, direction) {
    let toIndex = indx + direction;
    let fromIndex = indx;
    let array = this.props.docids.slice(0);
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
    this.props.onChange(array);
  }
  render() {
    return (
      <ul className='edit-collection-resource-list'>
        {(this.props.docids || []).map((docid, indx) => {
          let resource = this.props.resources[docid];
          let show_down = indx > 0;
          let show_up = (indx < (this.props.docids.length - 1));
          let up = (<span className={'btn btn-sm btn-secondary ' + (show_up ? '' : 'disabled')}
                        onClick={(evt) => { show_up && this.move(indx, 1)}}>
                      <span className={'fa fa-chevron-down '}></span>
                    </span>);
          let down = ( <span className={'btn btn-sm btn-secondary ' + (show_down ? '' : 'disabled')}
                        onClick={(evt) => { show_down && this.move(indx, -1)}}>
                         <span className={'fa fa-chevron-up '}></span>
                       </span>);

          if (resource) {
            return <li className='resource'
                        key={'' + indx + '-' + docid}>
                        <span className='btn-group'>
                          { up }
                          { down }
                        </span>
                    <label className='resource-title'>
                      <Link to={'/resources/'+resource.docid}>{resource.title} </Link>
                      <small>
                        <em>
                          {resource.docid}
                        </em>
                      </small>
                    </label>

                    <span className='btn btn-sm btn-danger'>
                      <span className='fa fa-times-circle-o'></span>
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCollectionList);
