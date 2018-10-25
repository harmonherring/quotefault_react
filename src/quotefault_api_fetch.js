import React, {Component} from 'react';
import './quotefault-api.css'

class Quotefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      searchValue: ''
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

  render() {
    return(
      <>
      <input type="text" placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange} />
      <ul>
        {this.state.displayData.filter(coin => coin.name.toUpperCase().includes(this.state.searchValue.toUpperCase())).map(coin =>
          <li key={coin.rank}>{coin.name}</li>
        )}
      </ul>
      </>
    );
  }
}

export default Quotefault;
