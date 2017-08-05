import React, {Component} from 'react';


class ActionOverlay extends Component {
 render() {
   if (this.props.error) {
      return <div className='loading-overlay'>
          <div className='content'>
            <h1> Error</h1>
            <p> There was an error performing this action. </p>

            <pre>
              {this.props.error}
            </pre>

            <a className='btn btn-primary' onClick={(evt) => { this.props.onPerformErrorReset() }}> Clear </a>
          </div>
        </div>;
   } else if (this.props.busy) {
    return <div className='loading-overlay'>
          <div className='content'>
            <span className='fa fa-spinner'></span>
          </div>
        </div>
   } else {
     return null;
   }
 }
}
export default ActionOverlay;
