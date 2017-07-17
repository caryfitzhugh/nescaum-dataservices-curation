import React, { Component } from 'react';
import { connect } from 'react-redux';
import './show_facet_array.css';

class ShowFacetArray extends Component {
  render() {
    var facets = this.props.values || [];

    return (
      <div className='show-facet-array'>
        <label className='field-name'>{this.props.name}</label>
        <ul>
          {facets.map((item, i) => {
            return <li key={item}>
                    {item}
                    </li>;
            })}
        </ul>
    </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowFacetArray);
