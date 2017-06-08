import React, { Component } from 'react';
import md from 'marked';
//import {performCreate} from "./actions";
import { connect } from 'react-redux';
/*
{"resource": {
  "actions": [
    "Emissions Reduction::multiple actions"
  ],
  "authors": [
    "C.S. Lewis",
    "Northeast Regional Climate Center (NRCC)"
  ],
  "content": "###Content",
  "climate_changes": [
    "Precipitation::Heavy Precipitation"
  ],
  "external_data_links": [
    "pdf::http://www.com/pdf",
    "weblink::http://google.com"
  ],
  "effects": [
    "Specific Vulnerability::Coastal Property Damage"
  ],
  "formats": [
    "Documents::Report"
  ],
  "geofocus": [
    "Ulster County, NY",
    "Westchester County, NY",
    "Maine Coastland"
  ],
  "keywords": [
    "dams::noexpanded",
    "floods",
    "land cover change"
  ],
  "publishers": [
    "NOAA",
    "NESCAUM",
    "The Disney Corporation"
  ],
  "published_on_end": "2017-01-31",
  "published_on_start": "2017-01-31",
  "sectors": [
    "Ecosystems",
    "Water Resources"
  ],
  "strategies": [
    "Adaptation"
  ],
  "states": [
    "NY",
    "MA"
  ],
  "title": "Title of the article",
  "subtitle": "A sub title of peace"
}}
*/

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "actions": [],
      "authors": [],
      "content": "",
      "climate_changes": [],
      "external_data_links": [],
      "effects": [],
      "formats": [],
      "geofocus": [],
      "keywords": [],
      "publishers": [],
      "published_on_start": null,
      "published_on_end": null,
      "sectors": [],
      "strategies": [],
      "states": [],
      "title":"",
      "subtitle":""
    };
  }
  update_field(evt, field) {
    var update = {};
    update[field] = evt.target.value;
    this.setState(update);
  }

  update_array(evt, field) {

  }
  render() {
    return (
    <div className='container-fluid'>
      <div className='row'>
        <h1>Create</h1>
        <form className='col'>
          <div className="form-group">
            <label>Title</label>
            <input className='form-control' value={this.state.title} onChange={(evt) => this.update_field(evt, 'title')}/>
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input className='form-control' value={this.state.subtitle} onChange={(evt) => this.update_field(evt, 'subtitle')}/>
          </div>

          <div className="form-group">
            <label>Content</label>
            <div className='col'>
              <textarea className='form-control' value={this.state.content} onChange={(evt) => this.update_field(evt, 'content')}/>
            </div>
            <div className='col' dangerouslySetInnerHTML={{__html: md(this.state.content)}}>
            </div>
          </div>

          // Fields for facets

          // Published on selector

        </form>
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
//    performBlankCreate: () => dispatch(performCreate({query: "", facets: {}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
