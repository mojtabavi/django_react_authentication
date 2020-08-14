import React, { Component } from 'react';
import Nav from './components/nav';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import Welcome from "./components/welcome";
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  async componentDidMount() {
    if(this.state.logged_in){
      const {data:json} = await axios.get('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: 'JWT '+ localStorage.getItem('token').toString()
        }
      })
      this.setState({ username: json.username });
    }
  }

  // handle_login = (e,data) =>{
  //   e.preventDefault();
  //   fetch('http://localhost:8000/token-auth/',{
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'applications/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(res => res.join())
  //     .then(json => {
  //       localStorage.setItem('token',json.token);
  //       this.setState({
  //         logged_in: true,
  //         displayed_form: '',
  //         username: json.user.username,
  //       });
  //     });
  // };

  handle_login = async (e,data) => {
    e.preventDefault();
    const url = "http://localhost:8000/token-auth/";
    const body = data
    console.log(body)
    const {data:json} = await axios.post(url,body);
    localStorage.setItem("token", json.token);
    this.setState({
          logged_in: true,
          username: json.user.username,
        });

  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({
      logged_in: false,
      username: ''
    });
  };


  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() { 
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = < LoginForm handle_login = {
          this.handle_login
        }
        />;
        break;
      case 'signup':
        form = < SignupForm handle_signup = {
          this.handle_signup
        }
        />;
        break;
      default:
        form = null;


    return (
      <div className="App">
        <Nav logged_in={this.state.logged_in} handle_logout={this.handle_logout} />
        <Switch>
          <Route path="/login" render={(props) => <LoginForm handle_login={this.handle_login} {...props} />} />
          <Route path="/signup" render={(props) => <LoginForm handle_login={this.handle_login} {...props} />} />
          <Route path="/welcome" render={(props) => <Welcome logged_in={this.state.logged_in} username={this.state.username} {...props} />} />
        </Switch>
      </div>
    );
  }
  }
}
 

export default App;


