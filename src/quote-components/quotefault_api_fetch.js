import React, {Component} from 'react';
import Quoteblock from './quoteblock.js';
import './quotefaultcss.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class Quotefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      numItems: 10,
      pageNum: 1,
      ldapMembers: [],
      quoteQuery: [],
      submitterQuery: '',
      speakerQuery: '',
    }
  }

  fetchQuotefaultAPI = () => {
    fetch('http://127.0.0.1:5000/06d5ac1444c1eaed2723/offset/20/0')
    .then(response => response.json())
    .then(jsonresponse => this.setState({ displayData: jsonresponse }));
  }

  fetchLdapAPI = () => {
    fetch('http://127.0.0.1:5000/06d5ac1444c1eaed2723/ldap/get_all_members')
    .then(response => response.json())
    .then(jsonresponse => this.setState({ ldapMembers: jsonresponse }));
  }

  refreshLdap = () => {
    fetch('http://127.0.0.1:5000/06d5ac1444c1eaed2723/ldap/refresh_cache')
    .then(function(response) {
      if(response.ok) {
        return true;
      }
      return false;
    })
  }

  componentDidMount() {
    this.fetchQuotefaultAPI();
    this.fetchLdapAPI();
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

  getName = (name) => {
    if (this.state.ldapMembers[name]) {
      return this.state.ldapMembers[name];
    } else {
      return name
    }
  }

  containsValues = (word) => {
    return word;
  }

  getSearchQuery = (phrase) => {
    phrase = phrase.target.value;
    let array = phrase.split(" ");

    let quoteQuery = [];
    let submitterQuery = '';
    let speakerQuery = '';

    for (let i = 0; i < array.length; i++) {
      let word = array[i];
      if (word.includes(":")) {
        let words = word.split(":");
        if (words.every(this.containsValues) && words.length > 2) {
          alert("Please leave, you fucking mongoloid.");
        }

        switch(words[0].toLowerCase()) {
          case "speaker":
            if(words[1]) {
              speakerQuery = words[1];
            } else {
              speakerQuery = array[i+1];
              i++;
            }
            break;
          case "submitter":
            if(words[1]) {
              submitterQuery = words[1];
            } else {
              submitterQuery = array[i+1];
              i++;
            }
            break;
          case "quote":
           if(words[1]) {
             quoteQuery.push(words[1]);
           } else {
             quoteQuery.push(array[i+1]);
             i++;
           }
           break;
          default:
            quoteQuery.push(words[0])
            break;
        }
      } else {
        quoteQuery.push(word);
      }
      this.setState({
        quoteQuery: quoteQuery,
        speakerQuery: speakerQuery,
        submitterQuery: submitterQuery,
      });
    }
  }

  render() {
    return(
      <>
      <input
          type="text"
          classsName="form-control quote-search col-sm-2"
          placeholder="Search"
          value={this.state.searchValue}
          onChange={this.getSearchQuery} />

        {

          this.state.displayData.map(quote =>

          <Quoteblock key={quote.id} quote={quote.quote}
                      speaker_name={this.getName(quote.speaker)}
                      speaker_uname={quote.speaker}
                      submitter_name={this.getName(quote.submitter)}
                      submitter_uname={quote.submitter}
                      quoteTime={quote.quoteTime} />

        )}

      <div className="pagination mx-auto">
        <FontAwesomeIcon icon="angle-double-left" />
        <FontAwesomeIcon icon="angle-left" />
        <input type="text" className="form-control" value={this.state.pageNum} onChange={this.changePage} />
      </div>
}
      </>
    );
  }
}

export default Quotefault;
