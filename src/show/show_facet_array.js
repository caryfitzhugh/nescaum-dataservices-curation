import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowFacetArray extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var facets = this.props.values || [];

    return (
            <ul>
              {facets.map((item, i) => {
                return <li key={item}>
                        {item}
                       </li>;
                })}
            </ul>);
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
