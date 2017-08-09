import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getResource } from './../resources/actions';
import "./edit_collection_list.css";

class EditCollectionList extends Component {

  componentWillReceiveProps(nextProps) {
    (nextProps.ids || []).forEach((id) => {
      if (!nextProps.resources[id]) {
        nextProps.performResourceGet(id);
      }
    });
  }

  move (indx, direction) {
    let toIndex = indx + direction;
    let fromIndex = indx;
    let array = this.props.ids.slice(0);
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0] );
    this.props.onChange(array);
  }

  remove_id(indx) {
    let array = this.props.ids.slice(0);
    array.splice(indx, 0).concat(array.splice(indx, 1));
    this.props.onChange(array);
  }

  render() {
    let empty = <div className='empty-collection-list'>No Resources Added</div>;
    return (
      <div>
        {((this.props.ids || []).length === 0) ? empty : null}
        <ul className='edit-collection-resource-list'>
          {(this.props.ids || []).map((id, indx) => {
            let resource = this.props.resources[id];
            let show_down = indx > 0;
            let show_up = (indx < (this.props.ids.length - 1));
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
                          key={'' + indx + '-' + id}>
                          <span className='btn-group'>
                            { up }
                            { down }
                          </span>
                      <label className='resource-title'>
                        <Link to={'/resources/'+resource.id}>{resource.title} </Link>
                        <small>
                          <em>
                            {resource.id}
                          </em>
                        </small>
                      </label>

                      <span className='btn btn-sm btn-danger'
                          onClick={(evt) => { this.remove_id(indx)}}>
                        <span className='fa fa-times-circle-o'></span>
                      </span>
                </li>
            } else {
              return null;
            }

          })}
        </ul>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCollectionList);
