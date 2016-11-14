import React from 'react';
import Nav from './core/nav';

var Hello = React.createClass ({

  getInitialState: function() {
    return {
      list: ''
    };
  },

  componentDidMount: function() {
  	$.ajax({
  		url: 'http://localhost:81/b',
      mode: 'no-cors',
      method: 'GET'
  	})
  	.done(function(msg) {
  		if (this.isMounted()) {
          this.setState({
            list: JSON.parse(msg)[0].todoName
          });
        }
  	}.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div className="root">
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
        <Nav />
      </div>
      <footer className="footer">
        
      </footer>
      </div>
    );
  }

})

export default Hello;
