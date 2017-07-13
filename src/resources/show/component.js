import React, { Component } from 'react';
import md from 'marked';
import { connect } from 'react-redux';
import { getResource } from './../actions';
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


  render() {
    if (this.props.resource) {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-2'>
              <label> Title </label>
              </div>
              <div className='col'>
                { this.props.resource.title}
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Indexed </label>
              </div>
              <div className='col'>
                <ShowIndexedButton resource={this.props.resource} />
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> SubTitle </label>
              </div>
              <div className='col'>
                { this.props.resource.subtitle}
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Image </label>
              </div>
              <div className='col'>
                { this.props.resource.image}
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Published On Start  /  End</label>
              </div>
              <div className='col'>
                { this.props.resource.published_on_start}
                /
                { this.props.resource.published_on_end}
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Content </label>
              </div>
              <div className='col'>
                <div dangerouslySetInnerHTML={{__html: md(this.props.resource.content || "")}}></div>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Formats </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.formats}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> WebLinks </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.external_data_links}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Actions </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.actions}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Authors </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.authors}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Climate Change </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.climate_change}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Effects </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.effects}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> GeoFocus </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.geofocus}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Keywords </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.keywords}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Publishers </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.publishers}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Sectors </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.sectors}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> Strategies </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.strategies}/>
              </div>
          </div>
          <div className='row'>
            <div className='col-2'>
              <label> States </label>
              </div>
              <div className='col'>
                <ShowFacetArray values={this.props.resource.states}/>
              </div>
          </div>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
