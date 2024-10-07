import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  handlePassword = event => {
    this.setState({password: event.target.value})
  }

  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = error => {
    this.setState({showErrorMsg: true, errorMsg: error})
  }

  handleLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const resData = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(resData.jwt_token)
    } else {
      this.onFailure(resData.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1727871742/Login_image_ryvvty.png"
            alt="website login"
            className="website-login"
          />
        </div>
        <form onSubmit={this.handleLogin} className="form">
          <img
            src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1727945534/logo_fk7sop.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="insta-share-heading">Insta Share</h1>
          <label htmlFor="USERNAME" className="label">
            USERNAME
          </label>
          <input
            placeholder="USERNAME"
            value={username}
            onChange={this.handleUsername}
            type="text"
            id="USERNAME"
            className="input"
          />
          <label className="label" htmlFor="PASSWORD">
            PASSWORD
          </label>
          <input
            value={password}
            onChange={this.handlePassword}
            placeholder="PASSWORD"
            className="input"
            type="password"
            id="PASSWORD"
          />
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button
            style={{marginTop: showErrorMsg ? '0px' : '10px'}}
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
