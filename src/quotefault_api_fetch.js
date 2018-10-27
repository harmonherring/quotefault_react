import React, {Component} from 'react';
import './quotefault-api.css'


class Quotefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      searchValue: '',
      priceSearch: '',
      numItems: 10
    }

  }

  fetchAPI = () => {
    fetch('https://quotefault-api.csh.rit.edu/06d5ac1444c1eaed2723/all')
    .then(response => response.json())
    .then(jsonresponse => this.setState({ displayData: jsonresponse.reverse() }));
  }

  componentDidMount() {
    this.fetchAPI()
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value
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
      <input type="text" placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange} />

        {

          this.state.displayData.filter(quote => quote.quote.toUpperCase().includes(this.state.searchValue.toUpperCase()) || quote.speaker.toUpperCase().includes(this.state.searchValue.toUpperCase())).slice(0, this.state.numItems).map(quote =>

          <li key={quote.id}>{quote.quote} - {quote.speaker}</li>

        )}

      <input type="submit" value="Load 10 More" onClick={this.loadMore} />
      </>
    );
  }
}

export default Quotefault;
