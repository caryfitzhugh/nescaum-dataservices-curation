import React, { } from 'react';
import {slugify} from './../../slugify';
import {includes,without, uniq} from 'lodash';
import CheckboxSelection from "../../checkbox_selection";

const STATES_PRESETS = [
  "NY",
  "MA",
  "ME",
  "VT",
  "RI",
  "CT",
].sort();

const StatesField = (props) => {
  let available = STATES_PRESETS;
  let values = props.values || [];

  return <div className='checkbox-selection-wrapper'>
      <h3>States</h3>
        <div className='checkbox-selection'>
          {available.map((value) => {
            let id = `inputfor-${slugify(value)}`;
            return <div key={value} className='form-input'>
              <input type='checkbox'
                id={id}
                checked={includes(values,value)}
                onChange={(evt) => {if (evt.target.checked) {
                                      props.onChange(uniq(values.concat(value)));
                                    } else {
                                      props.onChange(without(values,value));
                                    }}}
                  />
                <label htmlFor={id}>{value}</label>
            </div>
        })}
        </div>
      </div>
};

export default StatesField;
