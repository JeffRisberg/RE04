import React from 'react'
import Category from './Category'
import Charity from './Charity'
import CharityList from './CharityList'

class Browse extends React.Component {
    constructor() {
        super();

        this.state = {categories: [], category: null, charities: []};
        this.loadCharitiesFromServer = this.loadCharitiesFromServer.bind(this);
        this.loadCategoriesFromServer = this.loadCategoriesFromServer.bind(this);
    }

    render() {
        if (this.state.categories == null || this.state.categories.length == 0) return null;

        var charityList = (this.state.charities != null && this.state.charities.length > 0)
            ? (<CharityList charities={this.state.charities}/>)
            : null;

        let loadCharitiesHandler = (catId) => {
            return this.loadCharitiesFromServer(catId);
        };
        var categoryNodes = this.state.categories.map(function (category, index) {
            return (
                <Category category={category} loadCharities={loadCharitiesHandler} key={index}></Category>
            );
        });
        var categoryHeader = (this.state.category != null)
            ? <div><h3>Displaying charities for {this.state.category.name}</h3></div>
            : null;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        {categoryNodes}
                    </div>
                    <div className="col-md-10">
                        <div>{categoryHeader}</div>
                        {charityList}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.loadCategoriesFromServer();
    }

    loadCategoriesFromServer() {
        var url = "/ws/charities/guide/categories";
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.loadCharitiesFromServer(data[0]);
                this.setState({categories: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadCharitiesFromServer(category) {
        var url = "/ws/charities/categories/" + category.id;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({charities: data, category: category});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
}

export default Browse;