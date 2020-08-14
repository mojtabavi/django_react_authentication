import React, { Component } from 'react';
import PropTypes from 'prop-types';



class LoginForm extends Component {
    state = { 
        username: '',
        password: '',
     };


    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newstate = {...prevstate};
            newstate[name] = value;
            return newstate
        });
    };


    render() { 
        return (
          <form onSubmit={(e) => this.props.handle_login(e, this.state)}>
            <h4>Log In</h4>
            <div className="form-group">
            <label htmlFor="username" >Username</label>
            <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handle_change} />
            <label htmlFor="password">Password</label>
            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handle_change} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>


        );
    }
}
 
export default LoginForm;


LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
};