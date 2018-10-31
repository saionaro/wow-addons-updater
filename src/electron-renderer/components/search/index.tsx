import * as React from 'react';
import { StoreState } from '../../types/search';

import './style.less';

export interface SearchProps {
  data: StoreState;
  searchAddon: Function;
  onClickResult: Function;
}

interface State {
  readonly query: string;
}

export class Search extends React.PureComponent<SearchProps, State> {
  readonly state: State = {
    query: '',
  };

  handleChange = (event:React.ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    this.setState({
      query: element.value
    }, this.runSearch);
  }

  handleItemClick = (event:React.MouseEvent<HTMLLIElement>) => {
    const { onClickResult } = this.props;

    if (onClickResult) {
      const { data: { cache } } = this.props;
      const anyEvent = event as any;
      const key = anyEvent._targetInst.key;
      const item = cache[key];
      onClickResult(item);
      this.setState({ query: '' });
    }
  }

  runSearch = () => {
    const { searchAddon } = this.props;
    const { query } = this.state;
    searchAddon(query);
  }

  wrapSearch = (label:string) => {
    const { query } = this.state;
    const queryIndex = label.toLowerCase().indexOf(query.toLowerCase());
    if (query && ~queryIndex) {
      const prefix = label.slice(0, queryIndex);
      const findedQuery = label.slice(queryIndex, queryIndex + query.length);
      const suffix = label.slice(queryIndex + query.length);

      return (
        <React.Fragment>
          {prefix}
          <strong>{findedQuery}</strong>
          {suffix}
        </React.Fragment>
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
            placeholder="Search addon..."
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
