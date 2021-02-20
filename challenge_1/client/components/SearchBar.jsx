import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.props.search(this.state.searchWord);
      }}>
        <label>
          Event:
        <input name='searchWord' onChange={this.handleClick} value={this.state.searchWord} />
          <button type="submit">Search</button>
        </label>
      </form>
    )
  }
}

export default Search;

        // Full-text search
        // Add q

// GET /posts?q=internet