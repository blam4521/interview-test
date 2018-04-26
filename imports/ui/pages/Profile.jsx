//  Framework
import React, { Component } from 'react';

// Components
import Page from "../components/Page.jsx";
import Button from "../components/Button.jsx";

// Collections
import collection from '/imports/api/orders/collection'

class Profile extends Component {
    goBack = () => this.props.history.push("/shop");
    render() {
        return (
            <Page pageTitle="profile" history goBack={this.goBack}>
                <div className="home-page">
                <h2 className="title">Profile Page</h2>
                <Button
                    onClick={() => {
                    this.props.history.push("/shop");
                    }}
                >
                    Profile Page
                </Button>
                </div>
            </Page>
            

        );
    }
}

export default Profile;