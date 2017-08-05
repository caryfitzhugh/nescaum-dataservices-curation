import React, { Component } from 'react';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {index: 0, custom: ""};
  }

  current_value () {
    if (this.state.index === -1) {
      return this.state.custom;
    } else {
      return this.props.options[this.state.index];
    }
  }

  update_custom(evt) {
    let val = evt.target.value;
    this.setState({custom: val});
    this.setState({custom: val},
                 () => { this.props.onChange(this.current_value()); });
  }

  select_index(evt) {
    this.setState({index: parseInt(evt.target.value, 10)},
                 () => { this.props.onChange(this.current_value()); });
  }

  render () {
    // Want to have a dropdown - if it's selected for "Custom", then let them enter the field.
    return <div className='multi-select'>
      <div className='form-group'>
        <label>{this.props.title}</label>
        <select className='form-control' onChange={(evt) => this.select_index(evt)}>
          { this.props.options.map( (opt, i) => {
            return <option key={i} value={i}>{opt}</option>;
              })}
          { this.props.allow_custom ?  <option value='-1'>Custom</option> : null }
        </select>
        {this.state.index === -1 ?
          <input value={this.state.custom}
            onChange={(evt) => this.update_custom(evt)  }
            placeholder={`Custom ${this.props.title} Entry`}
            className={'form-control '}/>
          : null}
      </div>
    </div>;
  }
}

export default MultiSelect;
