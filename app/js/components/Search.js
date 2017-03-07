import React from 'react'
import Charity from './Charity'
import CharityList from './CharityList'
import ReactDOM from 'react-dom';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            charities: [],
            showOptions: false,
            keywords: '',
            zip: '',
            city: '',
            state: '',
            offset: 0,
            limit: 10
        };
    }

    render() {
        var searchOptions = (!this.state.showOptions) ? null
            : (
            <div>
                <p>
                    Zip: <input type="text" name="zip" size="7" value={this.state.zip} onChange={this.handleChange}/>
                </p>

                <p>
                    City: <input type="text" name="city" size="20" value={this.state.city}
                                 onChange={this.handleChange}/> &nbsp;
                    State: <input type="text" name="state" size="20" value={this.state.state}
                                  onChange={this.handleChange}/>
                </p>
            </div>
        );

        var searchBar = (
            <div>
                <form onSubmit={this.handleCharitySearch}>
                    <input type="text" name="keywords" onChange={this.handleChange}/>
                    <input type="submit" value="Go"/>

                    { (this.state.showOptions)
                        ? <p><a href="#" onClick={this.toggleSearchOptions}>Hide search options</a></p>
                        : <p><a href="#" onClick={this.toggleSearchOptions}>Show search options</a></p>}
                    {searchOptions}
                </form>

            </div>
        );

        if (this.state.charities == null || this.state.charities.length == 0) {
            return (
                <div className="content-region">
                    <div className="content-header">Search Charities</div>
                    {searchBar}
                </div>);
        } else {
            let resultsNav = null;
            if (this.state.pagination.resultCount > this.state.pagination.resultsPerPage) {

                const previousPage =
                    (this.state.pagination.hasPreviousPage)
                        ? (
                        <li><a href="#" onClick={(e) => {this.handleSearchNav(e, this.state.pagination.previousPage)}}
                               className="resultsNavLink">&laquo;</a></li>)
                        : (<li className="disabled"><a href="#">&laquo;</a></li>)
                const nextPage =
                    (this.state.pagination.hasNextPage)
                        ? (<li><a href="#" onClick={(e) => {this.handleSearchNav(e, this.state.pagination.nextPage)}}
                                  className="resultsNavLink">&raquo;</a></li>)
                        : (<li className="disabled"><a href="#">&raquo;</a></li>)
                const self = this;
                const pages = this.state.pagination.pages.map(function (page, index) {
                    return (page == self.state.pagination.currentPage)
                        ? (<li><a key={index} href="#" className="active" style={{fontWeight: 'bold'}}>{page}</a></li>)
                        : (<li><a key={index} href="#" className="resultsNavLink"
                                  onClick={(e) => {self.handleSearchNav(e, page)}}>{page}</a></li>)
                });

                resultsNav = (
                    <div>
                        <ul className="pagination">
                            {previousPage}
                            {pages}
                            {nextPage}
                        </ul>
                    </div>)
            }

            return (
                <div className="content-region">
                    <div className="content-header">Search Charities</div>
                    {searchBar}
                    <hr/>
                    <div>
                        <CharityList charities={this.state.charities}/>
                    </div>
                    {resultsNav}
                </div>
            );
        }
    }

    handleCharitySearch(e) {
        this.handleSearchNav(e, 1);
    }

    searchCharities() {
        var url = '/ws/charities?keywords=' + this.state.keywords + '&zip=' + this.state.zip + '&city=' + this.state.city + '&state=' + this.state.state + '&offset=' + this.state.offset + '&limit=' + this.state.limit;
        console.log('search url: ' + url);
        $.ajax({
            url: url,
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: function (response) {
                this.setState({charities: response.data, pagination: response.pagination}, () => {
                    console.log('Scrolling');
                    window.scrollTo(0, 0);
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleSearchNav = (e, page) => {
        e.preventDefault();
        const offset = (page - 1) * this.state.limit;
        console.log('setting search offset to ' + offset);

        this.setState({offset: offset}, () => {
            this.searchCharities()
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleSearchOptions = (e) => {
        e.preventDefault();
        this.setState({showOptions: !this.state.showOptions});
    }
}

export default Search;