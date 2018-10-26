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
    fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then(response => response.json())
    .then(jsonresponse => this.setState({ displayData: jsonresponse }));
  }

  componentDidMount() {
    this.fetchAPI()
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value
    });
  }

  handlePriceChange = (event) => {
    this.setState({
      priceSearch: event.target.value,
    });
  }

  mySlice = (a) => {
    a.length = this.state.numItems;
    return a
  }

  myTest = () => {
    let test = this.state.displayData.filter(coin => coin.name.toUpperCase().includes(this.state.searchValue.toUpperCase()) && coin.price_usd.toUpperCase().includes(this.state.priceSearch.toUpperCase()));
    return test;
  }

  render() {
    return(
      <>
      <input type="text" placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange} />
      <input type="text" placeholder="Search" value={this.state.priceSearch} onChange={this.handlePriceChange} />
      <ul>

        {

          this.state.displayData.filter(coin => coin.name.toUpperCase().includes(this.state.searchValue.toUpperCase()) && coin.price_usd.toUpperCase().includes(this.state.priceSearch.toUpperCase())).slice(0, this.state.numItems).map(coin =>

          <li key={coin.rank}>{coin.name}</li>

        )}
      </ul>
      </>
    );
  }
}

export default Quotefault;
