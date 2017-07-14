import React, { Component } from 'react';
import {toggleFacet} from "./actions";
import { connect } from 'react-redux';
import './search_facet_group.css';

class SearchFacetGroupInt extends Component {
  constructor(props) {
    super(props);
    this.toggle_facet = this.toggle_facet.bind(this);
    this.is_checked = this.is_checked.bind(this);
  }

  toggle_facet(evt, facet) {
    this.props.toggleFacet(this.props.type, facet.value, evt.target.checked);
  }

  is_checked(facet) {
    return this.props.parent_checked ||
            ((this.props.parameter_facets || {})[this.props.type] || []).includes(facet.value);
  }

  to_display_count(facet) {
    return facet.count;
  }

  to_display_title(facet) {
    var vals = facet.value.split("::");
    var last = vals.pop();
    if (last === "") {
      last = vals.pop();
    }
    return last;
  }

  render() {
    var val = this.props.group[0];
    var title = this.to_display_title(val);
    var count = this.to_display_count(val);
    var leaves = this.props.group[1] || [];
    var input_id = "input-"+ this.props.type + "-" + JSON.stringify(this.props.group[0]);

    return (<div className='search-facet-group'>
              <input id={input_id} type='checkbox' disabled={this.props.parent_checked}
                     checked={this.is_checked(val)} onChange={(evt) => this.toggle_facet(evt, val)}/>
              <label htmlFor={input_id}>{title} <small> {count} </small> </label>
              <ul>
              {leaves.map((group) => {
                var key = this.props.type + ":" + title + JSON.stringify(group);
                return <SearchFacetGroup type={this.props.type} key={key} parent_checked={this.is_checked(val)} group={group} />
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
  };
};

const SearchFacetGroup = connect(mapStateToProps, mapDispatchToProps)(SearchFacetGroupInt);

export default SearchFacetGroup;
