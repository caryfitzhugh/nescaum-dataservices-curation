import React, { Component } from 'react';
import { connect } from 'react-redux';
import './create_resource_facet.css';
import {filter, isEqual, without, uniq} from 'lodash';
import fuzzy from 'fuzzy';

class CreateResourceGeofocus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending_value: "",
      matches: [],
      focus: false,
      selected: {
        pending: "",
        index: -1,
      }
    };
  }
  has_focus(evt) {
    this.setState({focus: true})
  }
  has_blur(evt) {
    setTimeout(() => {this.setState({focus: false})}, 100);
  }
  update_pending_value(evt) {
    this.setState({pending_value: evt.target.value,
                  selected: { index: -1, pending_value: evt.target.value},
                  matches: fuzzy.filter(this.state.pending_value, this.props.available || [])
    });
  }
  create_new_match_facet(evt, new_value) {
    this.props.onChange(uniq(this.props.facets.concat([new_value])));
    this.setState({pending_value: "", matches: [], selected: { index: -1, pending_value: ""}});

  }
  create_new_facet() {
    var new_value = this.state.pending_value;
    if (this.state.selected.index !== -1) {
      var matches = this.matches.bind(this)();
      new_value = matches[this.state.selected.index];
    }
    this.props.onChange(uniq(this.props.facets.concat([new_value])));
    this.setState({pending_value: "", matches: [], selected: { index: -1, pending_value: ""}});
  }

  remove_facet(facet) {
    this.props.onChange(without(this.props.facets, facet))
  }

  matches() {
    var matches = [];
    if (this.state.pending_value.length === 0) {
      matches =  this.props.available || [];
    } else {
      matches =  this.state.matches.map((v) => { return v.string});
    }

    // Remove already there.
    return without(matches, ...this.props.facets);
  }

  handle_key_press(evt) {
    if(evt.key === "Enter") {
      this.create_new_facet();
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

  render() {
    var autocomplete_results = null;
    var matches = this.matches.bind(this)();

    if (this.state.focus && matches.length > 0) {
      autocomplete_results = <ul className='autocomplete-results'>
        {matches.map((res, i) => {return <li key={res} onClick={(evt) => this.create_new_match_facet(evt, res)} className={i == this.state.selected.index ? 'active' : ''}>{res}</li>})}
      </ul>
    }

    return (
      <div className='resource-facet'>
        <label>{this.props.name}</label>
        <div>
          <ul>
          { (this.props.facets || []).map( (facet) => {
              return <li key={facet}>
                <span className='badge badge-primary'>
                  {facet}
                  <span className='fa fa-times-circle-o' onClick={(evt) => this.remove_facet(facet)}></span>
                </span>
                </li>
            })}
          </ul>
        </div>
        <div className='input-group autocomplete-root'>
          <input value={this.state.pending_value}
                  onFocus={(evt) => this.has_focus(evt)}
                  onBlur={(evt) => this.has_blur(evt)}
                  onChange={(evt) => this.update_pending_value(evt)}
                  onKeyDown={(evt) => this.handle_key_press(evt)}
                  className='form-control' type='text' placeholder="Enter new facet here"/>
          <div className='input-group-addon btn btn-primary' onClick={(evt) => this.create_new_facet(evt)}>Add</div>
          {autocomplete_results}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

const mapDispatchToProps = (dispatch) => {
  return { }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateResourceFacet);
