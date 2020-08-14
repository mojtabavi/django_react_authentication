import React, { Component } from 'react';

class Welcome extends Component {
    state = {  }
    render() { 
        const {logged_in,username} = this.props;
        return <h3>{logged_in ? `Hello, ${username}` : "Please Log In first"}</h3>;
    }
}
 
export default Welcome;