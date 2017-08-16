import React, {Component}  from 'react';
import { Modal, Button } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import './geofocuses_modal.css';

const Results = (props) => {
  let values = (props.response || {}).geofocuses || [];
  let not_found_search = props.response &&
    values.length === 0 &&
    props.search_str.length > 0;

  return <ul className='results'>
    {not_found_search ? <li className='no-results'> No results <br/> </li> : null }
    {values.map ((v) => {
      return <li key={v.id} className='geofocus-result'>
        <span className='pull-right btn btn-primary btn-sm' onClick={(evt) => props.onAdd(v.id)}> Add </span>
        <span>{v.name}</span>
      </li>
    })}
  </ul>
}

const Searching = (props) => {
  return <div className='searching'>
    Searching <span className='fa fa-spinner spin-me'></span>
  </div>
}

class GeofocusesModal extends Component {
 constructor (props) {
    super(props)
    this.state = {showModal: false,
                  search_str:"",
                  searching: false,
                  response: null
                 };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  perform_search(evt) {
    let pthis = this;
    pthis.setState({searching: true});

    let params = {q: this.state.search_str};
    var qparams = '?' + Object.keys(params).reduce(function(a,k){a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&')
    fetch("/geofocuses/" + qparams, {
            credentials: 'same-origin',
          })
       .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error Performing Geofocuses Modal Search");
          }
        })
        .then(function(json) {
          pthis.setState({searching: false, response: json});
        })
        .catch((e) => {
          console.warn(e);
          pthis.setState({searching: false, response: null});
        });
  }

  update_search_string(evt) {
    this.setState({search_str: evt.target.value});
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handle_key_press(evt) {
    if(evt.key === "Enter") {
      this.perform_search();
      evt.preventDefault();
    }
  }
  render() {
    return <div>
        {this.props.isModal ? '' : <a className='btn btn-sm btn-secondary' onClick={this.open}>Add Geofocuses {this.props.name} </a>}
        <Modal className='field-modal' show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Geofocuses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form'>
              <div className='input-group'>
                <input type="text" className={'form-control ' + (this.state.searching ? ' read-only' : '')}  placeholder="Enter search here"
                onKeyDown={(evt) => this.handle_key_press(evt) }
                onChange={(evt) => this.update_search_string(evt)}/>
                <div className='input-group-addon btn btn-primary' onClick={(evt) => this.perform_search(evt)}> Search </div>
              </div>
            </div>
            {this.state.searching ?  <Searching /> :
              <Results {... this.state} onAdd={(newv) => this.props.onAdd(newv)}
                      onCreate={() => this.create()}/> }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
  }
}

export default GeofocusesModal;
