import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '../button/index.jsx';

export default class Search extends PureComponent {
  static propTypes = {
    searchCache: PropTypes.shape(),
    searchList: PropTypes.arrayOf(PropTypes.string),
    searchPending: PropTypes.bool.isRequired,
    searchAddon: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    }, this.runSearch);
  }

  runSearch = () => {
    const { searchAddon } = this.props;
    const { query } = this.state;
    searchAddon(query);
  }

  wrapSearch = (label) => {
    const { query } = this.state;
    const queryIndex = label.toLowerCase().indexOf(query.toLowerCase());
    if (query && ~queryIndex) {
      const prefix = label.slice(0, queryIndex);
      const findedQuery = label.slice(queryIndex, queryIndex + query.length);
      const suffix = label.slice(queryIndex + query.length);

      return (
        <Fragment>
          {prefix}
          <strong>{findedQuery}</strong>
          {suffix}
        </Fragment>
      );
    }
    return label
  }

  render() {
    const { searchCache, searchList, searchPending } = this.props;
    return (
      <div className="au-search">
        <input
          type="text"
          value={this.state.query}
          name="query"
          onChange={this.handleChange}
        />
        <Button
          caption="Find!"
          className="au-search__choose-button"
          onClick={this.runSearch}
        />
        {searchPending && (
          <p>Search is pending...</p>
        )}
        {searchList && (
          <ul>
            {searchList.map(hash => {
              return (
                <li key={hash}>
                  {this.wrapSearch(searchCache[hash].title)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
