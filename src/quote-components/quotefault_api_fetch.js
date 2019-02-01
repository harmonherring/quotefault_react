import React, {Component} from 'react';
import Quoteblock from './quoteblock.js';
import './quotefaultcss.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Autosuggest from 'react-autosuggest';


class Quotefault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayData: [],
      pageSize: 10,
      pageId: 0,
      ldapMembers: [],
      searchQuery: '',
      quoteQuery: [],
      submitterQuery: '',
      speakerQuery: '',
      memberSearch:[],
    }
  }
/*
  fetchQuotefaultAPI = () => {
    fetch('http://127.0.0.1:5000/06d5ac1444c1eaed2723/offset/20/0')
    .then(response => response.json())
    .then(jsonresponse => this.setState({ displayData: jsonresponse }));
  }
*/

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

  fetchQuotefaultAPI = (speaker, submitter, quote) => {
    let query = 'http://127.0.0.1:5000/06d5ac1444c1eaed2723/search?' +
                'page_size=' + this.state.pageSize +
                '&page_id=' + this.state.pageId + '&';
    if (speaker) {
      query = query + "speaker=" + speaker + "&";
    }
    if (submitter) {
      query = query + "submitter=" + submitter + "&";
    }
    if (quote) {
      let quoteQuery = "";
      quote.forEach(function(word) {
        quoteQuery += word;
      });
      query = query + "quote=" + quote + "&";
    }

    fetch(query)
    .then(response => response.json())
    .then(jsonresponse => this.setState({displayData: jsonresponse}));
  }

  componentDidMount() {
    this.fetchQuotefaultAPI(null, null, null);
    this.fetchLdapAPI();
    this.createSearchlist();
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
    this.setState({searchQuery: phrase});

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
        submitterQuery: submitterQuery,
        speakerQuery: speakerQuery,
      });
      this.fetchQuotefaultAPI(speakerQuery, submitterQuery, quoteQuery);

    }
  }

  createSearchlist = () => {
    for (var key in this.state.ldapMembers) {
      this.state.memberSearch.push(
        {
          username:key,
          searchableValue: this.state.ldapMembers[key] + " (" + key + ")",
        }
      );
    }
  }

  getSuggestions = (value) => {
    const inputValue = value.replace(/ /g,'').toLowerCase();

    return inputValue.length < 2 ? [] : this.state.memberSearch.filter(
      this.state.memberSearch.searchableValue.toLowerCase().replace(/ /g,'').slice(0, inputValue.length) === inputValue
    );
  }

  renderSuggestion = (suggestion) => (
    <div>
      {this.state.searchQuery + this.state.memberSearch.searchableValue}
    </div>
  );

  render() {
    return(
      <>

        <input
            type="text"
            classsName="form-control quote-search col-sm-2"
            placeholder="Search"
            list="users"
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

      </>
    );
  }
}

export default Quotefault;
