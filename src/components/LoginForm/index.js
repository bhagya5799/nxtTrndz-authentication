// Write your JS code here

import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  submitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  SubmitForm = async event => {
    event.preventDefault()
    const {username, password, errorMsg} = this.state
    this.setState({errorMsg: ''})
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('data', data)
    if (response.ok === true) {
      this.submitSuccess()
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username">USERNAME</label> <br />
        <input
          type="text"
          id="username"
          value={username}
          placeholder="username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password">PASSWORD</label> <br />
        <input
          onChange={this.onChangePassword}
          id="password"
          type="password"
          value={password}
          placeholder="password"
        />
      </>
    )
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-form">
        <img
          className="trdz-img"
          alt="website login"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        />
        <div className="input-trndz-form">
          <form onSubmit={this.SubmitForm}>
            <img
              className="input-trndz-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button className="login-btn" type="submit">
              LogIn
            </button>
          </form>
          {errorMsg && <p className="error-msz">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
