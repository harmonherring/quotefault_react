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
          <p>"{this.props.quote}" <strong>- {this.props.speaker}</strong></p>
        </div>
        <div className="bottomHalf">
          <p>Submitted by <a href="#">{this.props.submitter}</a> on {this.props.quoteTime}</p>
        </div>
      </div>
    );
  }
}

export default Quoteblock;
