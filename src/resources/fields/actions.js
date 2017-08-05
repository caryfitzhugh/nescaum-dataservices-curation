import React, { } from 'react';
import {includes,without, uniq} from 'lodash';
import CheckboxSelection from "../../checkbox_selection";

const ACTIONS_PRESETS = [
  "Capacity Building::First",

  "Management and Planning::coordinate between municipalities, utilities, and state to enhance energy infrastructure",
  "Management and Planning::include climate change adaptation knowledge when refitting older infrastructure",
  "Management and Planning::implement transportation management tools to reduce idling and vehicle emissions",
  "Management and Planning::diversify crops and crop varieties",
  "Management and Planning::adopt mechanisms for better coordination of water use in shared water bodies",
  "Management and Planning::adopt stormwater management infrastructure and practices to reduce the rapid release of stormwater to water bodiesBuilt Infrastructure",
  "Management and Planning::assess the need for changes to standard engineering practices to account for adaptation to climate change",
  "Management and Planning::build on the existing capacity of water managers to handle large variability",
  "Management and Planning::conduct research and monitoring to understand impacts of low flows and higher temperatures on potential changes to nutrient, sediment, and pathogen pollution",
  "Management and Planning::conduct research and monitoring to understand impacts of low flows and higher temperatures on water quality",
  "Management and Planning::create increased resilience through flexible adaptation pathways in operations, management, and policy decisions",
  "Management and Planning::develop a climate action plan",
  "Management and Planning::develop a plan and materials for communicating to non-English speaking populations",
  "Management and Planning::develop a public online system for tracking water usage across the state",
  "Management and Planning::develop an electronic database of vulnerability assessment results",
  "Management and Planning::develop and implement a heat emergency plan",
  "Management and Planning::develop more comprehensive drought management programs that include improved monitoring of water supply storage levels and that institute specific conservation measures when supplies decline below set thresholds",
  "Management and Planning::implement transportation management tools to reduce idling and vehicle emissions",
  "Management and Planning::increase water use efficiency and reduce energy use through leak detection programs, low-flow devices, rainwater harvesting, and reducing rainwater flows into sewer systems",
  "Management and Planning::inventory vulnerabilities and opportunities",
  "Management and Planning::prepare a detailed inventory of shoreline assets located in at-risk areas",
  "Management and Planning::Conserve land and discourage development in particularly vulnerable areas along river corridors such as flood plains and wetlands",
  "Management and Planning::implement a source water protection program",
  "Management and Planning::maintain and expand beach nourishment and/or wetland restoration programs",
  "Management and Planning::create an adaptation plan",
  "Management and Planning::create or update a watershed assessment to identify flooding and water quality priorities",
  "Management and Planning::develop scenarios that integrate climate forecasts into planning around heat emergencies and heat-warning systems",
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

const ActionsField = (props) => {
  let current = props.available || [];
  let available = uniq(current.concat(ACTIONS_PRESETS));
  let values = props.values || [];

  return <div className='form-group'>
    <h3>Actions</h3>
    <CheckboxSelection
      { ... filtered_fields('Capacity Building', 'Capacity Building::', available, values, props.onChange)}
      />
    <CheckboxSelection
      { ... filtered_fields('Management and Planning', 'Management and Planning::', available, values, props.onChange)}
      />
  </div>
};

export default ActionsField;
