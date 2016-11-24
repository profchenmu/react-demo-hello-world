import React, { Component, PropTypes } from 'react';
import loginAction from '../../../redux/actions/login';

import { connect } from 'react-redux';
// import Nav from './core/nav';



class Login extends Component {


  static propTypes = {
    value2: PropTypes.object.isRequired,
    loginClick: PropTypes.func.isRequired
  }


  render() {
    const {value2, loginClick} = this.props;
    console.log(this.props);
    console.timeEnd('testForEach');
    return (
      <div className="no-logged" id="main">
          <div className="page-header">
              <div id="loading-bar"></div>
                <div className="container">
                    <div id="box-container">
                      <div id="color1"></div>  
                      <div id="color2"></div>  
                      <div id="color3"></div>  
                      <div id="color4"></div>  
                      <div id="color5"></div>  
                      <div id="color6"></div>  
                      <div id="color7"></div>  
                      <div id="color8"></div>  
                    </div>
                  <h3 className="title-bar">
                    <img src="images/logo.png" />
                    <small><b>企业福利发放平台v1.0</b></small>    
                    <small className="hiden">
                          <a className="text-right link" id="logout" href="javascript:;">注销账户</a>
                          <a className="text-right link" id="edit-password" href="javascript:;">修改密码</a>
                      </small>           
                  </h3>
                  
              </div>
          </div>
          <div className="container root-view">
            
            <div className="main-right">
                <div className="no-logged-holder">
                    <h4>登录</h4>
                    <p className="error-msg"></p>
                    <form id="login-form">
                        <div className="form-group">
                            <span className="icon-user"></span>
                            <input type="username" className="auth-login" id="input-username-1" placeholder="请输入登录账号" />
                        </div>
                        <div className="form-group">
                            <span className="icon-locked"></span>
                            <input type="password" className="auth-login" id="input-password-1" placeholder="请输入登录密码" />
                        </div>
                        <button onClick={loginClick} type="button" id="submit-login" className="btn btn-default btn-primary">登 录</button>
                        
                        <a href="javascript:;" className="help" data-placement="bottom" title="请留意通知短信或向公司的账户管理员索取登录账号；请留意发送到您手机上的密码，忘记密码请联系管理员">
                            <span className="icon-info-with-circle"></span>帮助
                        </a>
                        <a href="javascript:;" className="reset" id="reset-password">找回密码</a>
                    </form>
                </div>
            </div>
          </div>
      <footer className="footer">
        
      </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    value2: state
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    loginClick: () => dispatch(loginAction)
    // loginClick: loginAction
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);


