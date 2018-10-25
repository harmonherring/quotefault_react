import React, {Component} from 'react';

class Quotefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
      displayData: [],
      searchValue: ''
    }

  }

  fetchAPI = () => {
    fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then(response => response.json())
    .then(jsonresponse => this.setState({ data : jsonresponse,  displayData: jsonresponse }));
  }

  componentDidMount() {
    this.fetchAPI()
  }

  updateSearch = () => {
    this.setState({
      displayData : this.state.data.filter(coin => coin.name.includes(this.state.searchValue))
    });

    if(this.state.searchValue == "") {
      console.log("test");
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value
    });
  }

  whatTheFuck = (event) => {
    this.handleSearchChange(event);
    setTimeout(this.updateSearch, 0);
  }

  render() {
    return(
      <>
      <input type="text" placeholder="Search" value={this.state.searchValue} onChange={this.whatTheFuck} />
      <ul>
        {this.state.displayData.map(coin =>
          <li key={coin.rank}>{coin.name}</li>
        )}
      </ul>
      </>
    );
  }
}

export default Quotefault;
