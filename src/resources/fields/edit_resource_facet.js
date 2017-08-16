import React, { Component } from 'react';
import { connect } from 'react-redux';
import './edit_resource_facet.css';
import {without, uniq} from 'lodash';
import FieldModal from './field_modal';

class EditResourceFacet extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  create_new_facet(new_value) {
    this.props.onChange(uniq(this.props.values.concat([new_value])));
    this.setState({pending_value: "", matches: [], selected: { index: -1, pending_value: ""}});
  }

  remove_facet(facet) {
    this.props.onChange(without(this.props.values, facet))
  }


  render() {
    let values = this.props.values || [];
    return (

      <div className='resource-facet'>
        <h3>{this.props.name}</h3>
        <div>
          <ul>
          {values.length === 0 ?
            <li> <em> No {this.props.name} </em></li> : null}
          { values.map( (facet) => {
              return <li key={facet}>
                <span className='badge badge-primary'>
                  {facet}
                  <span className='fa fa-times-circle-o' onClick={(evt) => this.remove_facet(facet)}></span>
                </span>
                </li>
            })}
          </ul>
        </div>
        <FieldModal name={this.props.name}
                    field_name={this.props.field_name}
                    allow_custom={this.props.allow_custom}
                    onAdd={(newv) => this.create_new_facet(newv)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditResourceFacet);
