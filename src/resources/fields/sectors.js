import React, { } from 'react';
import {uniq} from 'lodash';
import CheckboxSelection from "../../checkbox_selection";
const SECTORS_PRESETS = [
  "ma::agriculture",
  "ma::coastal zones",
  "ma::economy",
  "ma::energy",
  "ma::forestry",
  "ma::infrastructure",
  "ma::local government",
  "ma::natural resources / habitats",
  "ma::public health",
  "ma::public safety / emergency response",
  "ma::recreation",
  "ma::water resources",
  "ma::transportation",

  "ny::agriculture",
  "ny::buildings",
  "ny::coastal zones",
  "ny::ecosystems",
  "ny::energy",
  "ny::public health",
  "ny::telecommunications",
  "ny::transportation",
  "ny::water resources",
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

const SectorsField = (props) => {
  let current = props.available || [];
  let available = uniq(current.concat(SECTORS_PRESETS));
  let values = props.values || [];

  return <div className='form-group'>
    <h3>Sectors</h3>
    <CheckboxSelection
      { ... filtered_fields('Massachusetts', 'ma::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('New York', 'ny::', available, values, props.onChange)}
      />
  </div>
};

export default SectorsField;
