import React, { Component } from 'react';
import {toggleFacet, performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacetGroup from './search_facet_group';
import immutable from "object-path-immutable";
import './search_facet.css';

class SearchFacet extends Component {
  constructor(props) {
    super(props);
    this.toggle_facet = this.toggle_facet.bind(this);
    this.is_checked = this.is_checked.bind(this);
  }

  toggle_facet(evt, value) {
    this.props.toggleFacet(this.props.type, value, evt.target.checked);
  }

  is_checked(facet) {
    return (
      (this.props.parameter_facets || {})[this.props.type] || []).includes(facet.value);
  }

  render() {
    var facets = this.props.facets || [];

    return (<div className='search-facet'>
              <label>{this.props.title}</label>
            <ul>
              {facets.map((item, i) => {
                var input_id = "input-"+ this.props.type + "-" + JSON.stringify(item.value) +'-'+ i;

                return <li key={input_id}>
                          <input id={input_id} type='checkbox'
                                checked={this.is_checked(item)}
                                onChange={(evt) => this.toggle_facet(evt, item.value)}/>
                          <label htmlFor={input_id}>{item.value} <small> {item.count} </small> </label>
                       </li>;
                })}
            </ul>
            </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    parameter_facets: state.resources_search.parameters.facets
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
   toggleFacet: (type, value, checked) => dispatch(toggleFacet(type, value, checked))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFacet);
