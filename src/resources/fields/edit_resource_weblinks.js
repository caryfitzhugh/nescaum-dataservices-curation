import React, { Component } from 'react';
import { connect } from 'react-redux';
import './edit_resource_weblinks.css';
import {without, uniq} from 'lodash';

class EditResourceWeblinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available: ["Weblink", "PDF", "Data", "MetaData", "Current Webinar", "Archived Webinar", "Description"],
      type: null,
      link: "",
      link_valid: false,
    };
  }
  update_link(evt) {
    this.setState({link: evt.target.value, link_valid: evt.target.checkValidity()});
  }
  update_type(evt) {
    this.setState({type: evt.target.value });
  }
  create_new_weblink(evt) {
    if (this.state.link_valid) {
      this.props.onChange(uniq(this.props.links.concat([(this.state.type  || this.state.available[0])+ "::" + this.state.link])));
      this.setState({link: "", link_valid: false});
    }
  }

  remove_weblink(link) {
    this.props.onChange(without(this.props.links, link))
  }

  handle_key_press(evt) {
    if(evt.key === "Enter") {
      this.create_new_weblink();
      evt.preventDefault();
    }
  }

  render() {
    return (
      <div className='resource-facet'>
        <label>{this.props.name}</label>
        <div className='input-group autocomplete-root'>
          <select value={this.state.type || this.state.available[0]}
                 onChange={(evt) => this.update_type(evt)}
                 className='form-control'>
            {this.state.available.map((avail) => {
              return <option key={avail} value={avail}>{avail}</option>
            })}
          </select>

          <input value={this.state.link}
                 onChange={(evt) => this.update_link(evt)}
                 onKeyDown={(evt) => this.handle_key_press(evt)}
                 className='form-control' type='url' placeholder="Enter url here"/>

          <div className={ (this.state.link_valid ? "" : "disabled") + " input-group-addon btn btn-primary"} onClick={(evt) => this.create_new_weblink(evt)}>Add</div>
        </div>

        <div>
          <ul>
          { (this.props.links || []).map( (link) => {
              return <li key={link}>
                <span className='badge badge-primary'>
                  {link}
                  <span className='fa fa-times-circle-o' onClick={(evt) => this.remove_weblink(link)}></span>
                </span>
                </li>
            })}
          </ul>
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
  return { }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditResourceWeblinks);
