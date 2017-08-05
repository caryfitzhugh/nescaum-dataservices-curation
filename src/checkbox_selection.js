import React from 'react';
import {includes,without, uniq} from 'lodash';
import {slugify} from './slugify';
import './checkbox_selection.css';

const CheckboxSelection = (props) => {
  let values = props.values || [];
  let available = props.available || [];

  return <div className='checkbox-selection-wrapper'>
      <label>{props.title}</label>
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

export default CheckboxSelection;
