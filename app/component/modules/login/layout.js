import React, { Component, PropTypes } from 'react';
import loginAction from '../../../redux/actions/login';
import userservice from 'userservice';

import { connect } from 'react-redux';
// import Nav from './core/nav';


// const getInitState = () => ({name: ''});

// function handleChange(evt) {
//   this.setState({
//     [evt.target.name]: evt.target.value.trim()
//   })
// }

class Login extends Component {


  static propTypes = {
    value2: PropTypes.object.isRequired,
    // name: PropTypes.string.isRequired,
    // loginClick: PropTypes.func.isRequired
  }


  login(){
    let {loginClick, value2, router} = this.props;

    this.props.loginClick();
  }

  // updateState ({ location, params: { msgId }, userData: { username }, msg: { msgs } } = this.props) {
  //   // 情况1：处于 /msg/add，直接就是还原初始状态
  //   if (isAddMode(location.pathname)) {
  //     return this.setState(getInitState())
  //   }

  //   // 情况2：处于 /msg/modify/:msgId，且 state 中 msgs 不为空
  //   if (msgs.length) {
  //     let nextState = msgs.filter(({ id }) => id === msgId)[0]
  //     if (!nextState || nextState.author !== username) {
  //       return this.handleIllegal()
  //     }
  //     return this.setState(nextState)
  //   }

  //   // 情况3：强制刷新 /msg/detail/:msgId 后，跳转到 /msg/modify/:msgId
  //   // 此时 state 中 msgs 为空，需要立即从后端 API 获取
  //   msgService.fetch({ msgId }).then(msg => {
  //     let { id, title, content, author } = msg
  //     if (!msg || author !== username) {
  //       return this.handleIllegal()
  //     }
  //     this.setState({ id, title, content })
  //   })
  // }

  constructor (props) {
    super(props)
    this.state = {username: ''};
    var self = this;
    this.handleChange = function(evt){
      self.setState({
        [evt.target.name]: evt.target.value
      })
    }
    
  //   this.setState({
  //   [evt.target.name]: evt.target.value.trim()
  // });
  }

  componentWillReceiveProps(nextProps,b) {
    console.log(this.state)
    console.log(nextProps);
    // if (nextProps.login !== this.props.login) {
    //   loadData(nextProps)
    // }
    // console.log(nextProps);
    // if(nextProps.value2.value2==1){
    //   nextProps.router.replace('/index');
    // }

  }

  render() {
    let {loginClick, value2, router} = this.props;
    
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
                            <input type="username"
                                    name="username" 
                                   className="auth-login" 
                                   id="input-username-1" 
                                   placeholder="请输入登录账号"
                                   value={this.state.username}
                                   onChange={this.handleChange}
                                   />
                        </div>
                        <div className="form-group">
                            <span className="icon-locked"></span>
                            <input type="password" className="auth-login" id="input-password-1" placeholder="请输入登录密码" />
                        </div>
                        <button onClick={() => this.login()} type="button" id="submit-login" className="btn btn-default btn-primary">登 录</button>
                        
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
    value2: state.login
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


