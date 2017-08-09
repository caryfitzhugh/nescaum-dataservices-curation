import React, { Component } from 'react';
import { connect } from 'react-redux';
import {map,includes,without, uniq} from 'lodash';
import {performCompleteIndexSearch} from './../../geofocuses/index/actions';
import fuzzy from 'fuzzy';
import './geofocuses.css';

class GeofocusesField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending_type: "",
      pending_value: "",
      matches: [],
      focus: false,
      selected: {
        index: -1,
      },
    };
  }

  componentDidMount() {
    // Want to fetch all facets
    this.props.performGeofocusQuery();
  }

  has_focus(evt) {
    this.setState({focus: true})
  }

  has_blur(evt) {
    setTimeout(() => {this.setState({focus: false})}, 100);
  }

  matches() {
    let value = this.state.pending_value;
    let matches =  map(this.props.geofocuses || [], 'id');

    if (this.state.pending_value.length > 0) {
      let gf_array = this.props.geofocuses ? Object.values(this.props.geofocuses) : [];

      let geofocuses = gf_array.filter( (gf) => {
        if (this.state.pending_type === "") {
          return true;
        } else {
          return gf.type === this.state.pending_type;
        }
      });

      matches = fuzzy.filter(value, geofocuses, {
        extract: (el) => {
          return el.name + " " + el.uid; }
      });
      matches = map(matches, 'original.id');
    }

    // Remove already there.
    return without(matches, ...this.props.selected);
  }


  update_pending_value(evt) {
    this.setState({
                pending_value: evt.target.value,
                selected: { index: -1},
    });
  }

  handle_key_press(evt) {
    if(evt.key === "Enter") {
      this.create_new_geofocus();
      evt.preventDefault();
    }

    if(evt.key === "Tab" && this.state.matches.length === 1) {
      this.setState({pending_value: this.state.matches[0].string});
      evt.preventDefault();
    }

    if (evt.key === "ArrowDown") {
      this.setState((old) => {
        var new_state = Object.assign({}, old);
        new_state.selected.index += 1;
        var matches = this.matches.bind(this)();
        if (new_state.selected.index >= matches.length){
          new_state.selected.index = matches.length - 1;
        }
        return new_state;
      });
      evt.preventDefault();
    }
    if (evt.key === "ArrowUp") {
      this.setState((old) => {
        var new_state = Object.assign({}, old);
        new_state.selected.index -= 1;
        if (new_state.selected.index < 0) {
          new_state.selected.index = -1;
        }
        return new_state;
      });
      evt.preventDefault();
    }
  }

  create_new_geofocus() {
    var new_value = this.state.pending_value;
    if (this.state.selected.index !== -1) {
      var matches = this.matches.bind(this)();
      new_value = matches[this.state.selected.index];
    }
    this.props.onChange(uniq(this.props.selected.concat([new_value])));
    this.setState({pending_value: "", matches: [], selected: { index: -1}});
  }

  remove_geofocus(geofocus) {
    this.props.onChange(without(this.props.selected, geofocus))
  }

  available_types () {
    let vals =  Object.values(this.props.geofocuses);
    if (vals.legth > 0 ) { debugger }
    return uniq(map(vals, 'type'));
  }

  create_new_match_geofocus(evt, new_value) {
    this.props.onChange(uniq(this.props.selected.concat([new_value])));
    this.setState({pending_value: "", matches: [], selected: { index: -1}});
  }

  update_pending_type (evt) {
    this.setState({pending_type: evt.target.value});
  }

  render () {

    var autocomplete_results = null;
    var matches = this.matches.bind(this)();
    if (this.state.focus && matches.length > 0) {
      autocomplete_results = <ul className='autocomplete-results'>
        {matches.map((geofocus_id, i) => {return <li key={geofocus_id} onClick={(evt) => this.create_new_match_geofocus(evt, geofocus_id)} className={i === this.state.selected.index ? 'active' : ''}>
                     <em>{this.props.geofocuses[geofocus_id].uid}</em>
                     {this.props.geofocuses[geofocus_id].name}
                     </li>})}
      </ul>
    }

    return <div className='form-group geofocuses-field'>
      <h3>Geofocuses</h3>
      <div>
        <ul>
        { (this.props.selected || []).map( (geofocus_id) => {
            let gf = this.props.geofocuses[geofocus_id];
            if (gf) {
              return <li key={geofocus_id}>
                <span className='badge badge-primary'>
                  <em>{gf.uid}</em>
                  {gf.name}
                  <span className='fa fa-times-circle-o' onClick={(evt) => this.remove_geofocus(geofocus_id)}></span>
                </span>
                </li>;
             } else {
              return <li key={geofocus_id}> </li>
             }
          })}
        </ul>
      </div>
      <div className='input-group'>
        <select className='input-group-addon' value={this.state.pending_type}
          onChange={(evt) => {this.update_pending_type(evt)}}>
          <option value=''>All</option>
          {this.available_types().map((type) => {
              return <option key={type} value={type}> {type} </option>;
          })}
          <option value='custom'>Custom</option>
        </select>
        <input value={this.state.pending_value}
              onFocus={(evt) => this.has_focus(evt)}
              onBlur={(evt) => this.has_blur(evt)}
              onChange={(evt) => this.update_pending_value(evt)}
              onKeyDown={(evt) => this.handle_key_press(evt)}
              className='form-control' type='text' placeholder="Enter new geofocus here"/>
          <div className='input-group-addon btn btn-primary' onClick={(evt) => this.create_new_geofocus(evt)}>Add</div>
          {autocomplete_results}
      </div>
    </div>
  }
};

const mapStateToProps = (state) => {
  return {
    geofocuses: state.geofocuses_index.geofocuses || {},
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performGeofocusQuery: () => dispatch(performCompleteIndexSearch()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeofocusesField);
