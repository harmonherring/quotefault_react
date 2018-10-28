import React, {Component} from 'react';
import Quoteblock from './quoteblock.js';
import './quotefaultcss.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class Quotefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      searchValue: '',
      priceSearch: '',
      numItems: 10,
      pageNum: 1,
    }
  }

  fetchAPI = () => {
    fetch('https://quotefault-api.csh.rit.edu/06d5ac1444c1eaed2723/all')
    .then(response => response.json())
    .then(jsonresponse => this.setState({ displayData: jsonresponse.reverse() }));
  }

  componentDidMount() {
    this.fetchAPI();
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value
    });
  }

  changePage = (event) => {
    this.setState({
      pageNum: event.target.value
    });
  }

  mySlice = (a) => {
    a.length = this.state.numItems;
    return a
  }

  loadMore = (event) => {
    event.preventDefault();
    let newItems = this.state.numItems + 10;
    this.setState({
      numItems: newItems,
    });
  }

  render() {
    return(
      <>
      <input type="text" className="form-control quote-search col-sm-2" placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange} />

        {

          this.state.displayData.filter(quote => quote.quote.toUpperCase().includes(this.state.searchValue.toUpperCase()) || quote.speaker.toUpperCase().includes(this.state.searchValue.toUpperCase())).slice(0, this.state.numItems).map(quote =>

          <Quoteblock key={quote.id} quote={quote.quote} speaker={quote.speaker} submitter={quote.submitter} quoteTime={quote.quoteTime} />

        )}

      <div className="pagination mx-auto">
        <FontAwesomeIcon icon="angle-double-left" />
        <FontAwesomeIcon icon="angle-left" />
        <input type="text" className="form-control" value={this.state.pageNum} onChange={this.changePage} />
      </div>
      </>
    );
  }
}

export default Quotefault;
