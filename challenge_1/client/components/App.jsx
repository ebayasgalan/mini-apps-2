import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Search from './SearchBar.jsx';
import Events from './Events.jsx';

const StyledApp = styled.div`
  padding: 20px;
  form {
    font-size: 20px;
    text-align: center;
  }
  .pagination {
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: center;
    color: blue;
  }
  .active {
    color: orange;
  }
  li {
    font-size: 20px;
    margin-right: 10px;
    &:hover {
      color: orange;
    }
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      currentPage: 0,
      totalPageNum: 0,
      events: []
    };
    this.getFilteredData = this.getFilteredData.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  setSearchTerm(searchWord) {
    this.setState({ searchWord }, () => {
      axios.get(`/events/?q=${searchWord}`)
        .then(result => {
          const totalPageNum = Math.ceil(result.data.length / 10);
          this.setState({ totalPageNum });
          this.getFilteredData();
        })
        .catch(err => console.log('err: ', err))
    })
  }

  getFilteredData() {
    axios.get(`/events/?q=${this.state.searchWord}&_page=${this.state.currentPage}`)
      .then(result => {
        this.setState({ events: result.data });
      })
      .catch(err => console.log('err: ', err));
  }

  handlePageClick(data) {
    this.setState({
      currentPage: data.selected + 1
    }, () => {
      this.getFilteredData();
    })
  }

  render() {
    return (
      <StyledApp>
        <Search search={this.setSearchTerm} />
        <Events events={this.state.events} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={this.state.totalPageNum}
        />
      </StyledApp>
    )
  }
}

export default App;