import React, { Component } from 'react';
import md from 'marked';
import { connect } from 'react-redux';
import "./component.css";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    };
  }

  componentDidMount() {
    // Want to fetch all facets
    //this.props.performResourceQuery();
  }


  render() {
    return (
    <div className='container-fluid'>
      <div className='row'>
        {JSON.stringify(this.props.match.params.id)}
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Show);
