import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.less';

export default class Search extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      cache: PropTypes.shape(),
      list: PropTypes.arrayOf(PropTypes.string),
      pending: PropTypes.bool.isRequired,
    }),
    searchAddon: PropTypes.func.isRequired,
    onClickResult: PropTypes.func,
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

  handleItemClick = (event) => {
    const { onClickResult } = this.props;
    if (onClickResult) {
      const { data: { cache } } = this.props;
      const key = event._targetInst.key;
      const item = cache[key];
      onClickResult(item);
    }
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
    const {
      data: {
        cache,
        list,
        pending,
      },
    } = this.props;
    return (
      <div className="au-search">
        <div className="au-search__relative-wrapper">
          <input
            type="text"
            value={this.state.query}
            name="query"
            onChange={this.handleChange}
          />
          {!!list.length && (
            <ul className="au-search__dropdown">
              {list.map(hash => {
                return (
                  <li
                    key={hash}
                    className="au-search__dropdown-item"
                    onClick={this.handleItemClick}
                  >
                    {this.wrapSearch(cache[hash].title)}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {pending && (
          <p>Search is pending...</p>
        )}
      </div>
    );
  }
}
