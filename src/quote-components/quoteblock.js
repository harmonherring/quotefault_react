import React, {Component} from 'react';
import './quoteblock.css';

class Quoteblock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="quoteBlock">
        <div className="topHalf">
          <p>"{this.props.quote}" <strong>- {this.props.speaker_name} ({this.props.speaker_uname})</strong></p>
        </div>
        <div className="bottomHalf">
          <p>Submitted by <a href="#">{this.props.submitter_name} ({this.props.submitter_uname})</a> on {this.props.quoteTime}</p>
        </div>
      </div>
    );
  }
}

export default Quoteblock;
