import React from 'react'
import { Link } from 'react-router'

class CategoryScroller extends React.Component {

    constructor(props) {
        super(props)
        this.state = {loading: true, category: null}
    }

    componentDidMount() {
        this.loadCategoryFromServer();
    }

    loadCategoryFromServer() {
        $.ajax({
            url: "/ws/categories/" + this.props.internalName,
            dataType: 'json',
            cache: false,
            success: function (response) {
                this.setState({loading: false, category: response.data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        if (this.state.loading || this.state.category == null) return null;

        const imageItems = this.state.category.listCharities.map(function (listCharity, index) {
            var imagePath = '/images/' + listCharity.logoImage.path;
            var imageFile = listCharity.logoImage.fileName;
            return (
                    <li key={index} className="col-md-2">
                        <img className="thumbnail" src={ imagePath + imageFile} width="128" height="77" />
                        <br/>
                        <Link to={"/donate/" + listCharity.charity.ein} className="btn">
                            Donate Now
                        </Link>
                    </li>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="horizontal-slide">
                            {imageItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryScroller;