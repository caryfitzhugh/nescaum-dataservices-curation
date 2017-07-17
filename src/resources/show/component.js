import React, { Component } from 'react';
import md from 'marked';
import { connect } from 'react-redux';
import { getResource, deleteResource } from './../actions';
import {Link} from 'react-router-dom';
import "./component.css";
import ShowFacetArray from './show_facet_array';
import ShowIndexedButton from './show_indexed_button';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    };
  }

  componentDidMount() {
    // Want to fetch the details
    this.props.performResourceGet(this.props.match.params.id);
  }
  delete_resource (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (window.confirm("Delete Resource?\n\nThis will permanently delete the record!")) {
      this.props.performResourceDelete(this.props.resource.docid);
      // Send yourself "back" in the browser
    }
  }

  render() {
    if (this.props.resource) {
      let img = this.props.resource.image || 'http://placehold.it/300';
      return (
        <div className='container-fluid'>

          <ShowIndexedButton resource={this.props.resource} />
          <h2>{this.props.resource.title}
            <Link className='btn btn-secondary' to={'/resources/' + this.props.resource.docid +'/edit'}> Edit Resource </Link>
            <button onClick={(evt) => this.delete_resource(evt)} className='btn btn-danger'> Delete Resource </button>
          </h2>
          <hr/>

          <h6> {this.props.resource.subtitle}
            <small className='publication'>
              <span>{ this.props.resource.published_on_start}</span>
              /
              <span>{ this.props.resource.published_on_end}</span>
            </small>
          </h6>

          <div className='resource-image'>
            <img alt='resource thumbnail' src={img}/>
            <label>{img }</label>
          </div>

          <div dangerouslySetInnerHTML={{__html: md(this.props.resource.content || "")}}></div>

          <ShowFacetArray name='Content Types' values={this.props.resource.content_types}/>
          <ShowFacetArray name='Weblinks' values={this.props.resource.external_data_links}/>
          <ShowFacetArray name='Actions' values={this.props.resource.actions}/>
          <ShowFacetArray name='Authors' values={this.props.resource.authors}/>
          <ShowFacetArray name='Climate Changes' values={this.props.resource.climate_changes}/>
          <ShowFacetArray name='Effects' values={this.props.resource.effects}/>
          <ShowFacetArray name='Keywords' values={this.props.resource.keywords}/>
          <ShowFacetArray name='Publishers' values={this.props.resource.publishers}/>
          <ShowFacetArray name='Sectors' values={this.props.resource.sectors}/>
          <ShowFacetArray name='Strategies' values={this.props.resource.strategies}/>
          <ShowFacetArray name='States' values={this.props.resource.states}/>
        </div>);

    } else if (this.props.error ) {
      return (
        <div className='container-fluid'>
          <h1> Error</h1>
          <p>{this.props.error}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resource: state.resources[ownProps.match.params.id],
    error: state.resources.errors[ownProps.match.params.id],
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performResourceGet: (docid) => dispatch(getResource(docid)),
    performResourceDelete: (docid) => dispatch(deleteResource(docid)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
