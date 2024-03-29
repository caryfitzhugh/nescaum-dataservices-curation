import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchFacetNestedGroup from './search_facet_group';
import immutable from "object-path-immutable";
import './search_facet_nested.css';
import {isEmpty } from 'lodash';

function hash_to_nested_array(tree) {
  return Object.keys(tree).reduce((memo, key) => {
    var val = tree[key];
    if (val[""]) {
      var rest = {...val};
      var node = rest[""];
      delete rest[""];
      memo.push([node, hash_to_nested_array(rest)]);
    } else {
      memo.push([val, []]);
    }
    return memo;
  }, []);
}

class SearchFacetNested extends Component {
  facet_list_to_tree(facet_list) {
    var tree_hash = facet_list.reduce((memo, facet) => {
      return immutable.set(memo, facet.value.split("::"), facet);
    }, {});

    return hash_to_nested_array(tree_hash);
  }
  render() {
    var tree = this.facet_list_to_tree(this.props.facets || []);
    return (<div className='search-facet-nested'>
              <label>{this.props.title}</label>
            <ul>
              {isEmpty(tree) ? <li> <em> None </em> </li> : null }
              {tree.map((group, i) => {
                return <li key={this.props.title + '-li-' + i}>
                        <SearchFacetNestedGroup type={this.props.type} key={this.props.title} group={group} />
                       </li>;
                })}
            </ul>
            </div>);
  }
}

const mapStateToProps = (state) => {
  return { }
};

const mapDispatchToProps = (dispatch) => {
  return { }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFacetNested);
