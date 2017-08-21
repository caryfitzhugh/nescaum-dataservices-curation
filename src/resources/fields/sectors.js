import React, { } from 'react';
import {uniq} from 'lodash';
import CheckboxSelection from "../../checkbox_selection";
const SECTORS_PRESETS = [
  "MA::Agriculture",
  "MA::Coastal Zones",
  "MA::Economy",
  "MA::Forestry",
  "MA::Infrastructure",
  "MA::Local Government",
  "MA::Natural Resources / Habitats",
  "MA::Public Heatlh",
  "MA::Public Safety / Emergency Response",
  "MA::Recreation",
  "MA::Water Resources",

  "NY::Agriculture",
  "NY::Buildings",
  "NY::Coastal Zones",
  "NY::Ecosystems",
  "NY::Energy",
  "NY::Public Health",
  "NY::Telecommunications",
  "NY::Transportation",
  "NY::Water Resources",
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
      { ... filtered_fields('Massachusetts', 'MA::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('New York', 'NY::', available, values, props.onChange)}
      />
  </div>
};

export default SectorsField;
