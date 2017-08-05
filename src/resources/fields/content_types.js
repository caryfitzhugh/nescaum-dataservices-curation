import React, { } from 'react';
import {includes,without, uniq} from 'lodash';
import CheckboxSelection from "../../checkbox_selection";

const CONTENT_TYPE_PRESETS = [
  "Data::Data Product",
  "Data::Dataset",
  "Data::Decision Support",
  "Documents::Abstract",
  "Documents::Academic Article",
  "Documents::Article",
  "Documents::Blog Posting",
  "Documents::Book",
  "Documents::Building Code",
  "Documents::Case Study",
  "Documents::Catalog",
  "Documents::Chapter",
  "Documents::Comment",
  "Documents::Conference Paper",
  "Documents::Document Section",
  "Documents::Fact Sheet",
  "Documents::Guide",
  "Documents::Journal",
  "Documents::Law",
  "Documents::Manual",
  "Documents::Memo",
  "Documents::Newsletter",
  "Documents::Newspaper",
  "Documents::News Release",
  "Documents::Plan",
  "Documents::Proceedings",
  "Documents::Report",
  "Documents::Repository",
  "Documents::Series",
  "Documents::Software",
  "Documents::Thesis",
  "Documents::Video",
  "Documents::Working Paper",
  "Documents::White paper",

  "Maps::GIS Layer",
  "Maps::Map",
  "Maps::Map Viewer ",
  "Maps::Decision Support",

  "Websites::Clearinghouse",
  "Websites::Website",
  "Websites::Website Section",
  "Websites::Web-based tool?/decision support",

  "Events::Conference",
  "Events::Conference Series",
  "Events::Exhibit",
  "Events::Online Training",
  "Events::Presentation",
  "Events::Training",
  "Events::Webinar",
  "Events::Webinar Series",
  "Events::Workshop",

  "Projects::Project",

  "People::Person"
];
const filtered_fields = (title, prefix, available, values, onChange) => {
  let reg = new RegExp(`^${prefix}`);
  let filtered_available =available.filter((v) => { return v.match(reg);}).map((v) => v.replace(reg, ''));
  let filtered_values = values.filter((v) => { return v.match(reg); }).map((v) => v.replace(reg, ''));
  let other_values = values.filter((v) => { return !v.match(reg);});

  return {
    title: title,
    available: filtered_available,
    values: filtered_values,
    onChange: (new_values) => {
      let new_v =  new_values.map((v) => { return prefix + v; });
      onChange(other_values.concat(new_v)) },
  }
}

const ContentTypeField = (props) => {
  let current = props.available || [];
  let available = uniq(current.concat(CONTENT_TYPE_PRESETS));
  let values = props.values || [];

  return <div className='form-group'>
    <h3>Content Types</h3>
    <CheckboxSelection
      { ... filtered_fields('Data', 'Data::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('Documents', 'Documents::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('Maps', 'Maps::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('Websites', 'Websites::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('Events', 'Events::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('Projects', 'Projects::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('People', 'People::', available, values, props.onChange)}
      />
  </div>
};

export default ContentTypeField;
