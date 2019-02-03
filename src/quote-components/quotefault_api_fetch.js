import React, {Component} from 'react';
import Quoteblock from './quoteblock.js';
import './quotefaultcss.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Autosuggest from 'react-autosuggest';

import './autosuggest.css';

function getSuggestions(value)  {
  let parsedValue = [];

  let tempParsed = value.replace(/ /g, '').trim().toLowerCase().split('speaker:');
  for (let i = 0; i < tempParsed.length; i++) {
    let temp = tempParsed[i].split('submitter:');
    for (let j = 0; j < temp.length; j++) {
      parsedValue.push(temp[j]);
    }
  }
  let searchValue = parsedValue[parsedValue.length-1];

  return suggestions.filter(user => user.searchableValue.toLowerCase().includes(searchValue));
}

const getSuggestionValue = (suggestion) => this.state.searchQuery + suggestion.username;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.searchableValue}
  </div>
);

let suggestions = [];

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
      suggestions:[],
      value: '',
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

  createSearchlist = () => {

    for (var key in this.state.ldapMembers) {
      suggestions.push(
        {
          username:key,
          searchableValue: this.state.ldapMembers[key] + " (" + key + ")",
        }
      );
    }
  }

  getSuggestionValue = (suggestion) => {
    let tempQuery = this.state.value.split(":");
    let finalQuery = '';
    for (let i = 0; i < tempQuery.length-1; i++) {
      finalQuery += tempQuery[i];
      finalQuery += ':';
    }
    return finalQuery + suggestion.username;
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
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
    let _this = this
    setTimeout(function() {
      _this.createSearchlist();
    }, 1000);
    console.log("test me now".split("now"));
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

  shouldRenderSuggestions = (value) => {
    let valueArray = value.replace(/ /g, '').trim().split(' ');
    let lastVal = valueArray.length-1;
    let parsedValue = [];

    let tempParsed = value.trim().toLowerCase().split('speaker:');
    for (let i = 0; i < tempParsed.length; i++) {
      let temp = tempParsed[i].split('submitter:');
      for (let j = 0; j < temp.length; j++) {
        parsedValue.push(temp[j]);
      }
    }

    let trueValueLength = tempParsed[tempParsed.length-1].length;

    return ((trueValueLength > 2) && ((valueArray[lastVal].includes("speaker:"))) || (valueArray[lastVal].includes("submitter:")));
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  }

  render() {
    const {value} = this.state;
    const inputProps = {
      placeholder: "Type some shit",
      value,
      onChange: this.onChange
    }

    return(
      <>
        <input
            type="text"
            classsName="form-control quote-search col-sm-2"
            placeholder="Search"
            list="users"
            value={this.state.searchValue}
            onChange={this.getSearchQuery} />

            <Autosuggest
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={renderSuggestion}
              shouldRenderSuggestions={this.shouldRenderSuggestions}
              inputProps={inputProps}
              />



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
