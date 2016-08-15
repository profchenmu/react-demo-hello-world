import React from 'react';
import './Hello.less';

import logo from './logo.png';

var Hello = React.createClass ({

getInitialState: function() {
    return {
      list: ''
    };
  },

  componentDidMount: function() {
  	$.ajax({
  		url: 'http://localhost:3000/index',
      mode: 'no-cors',
      method: 'GET'
  	})
  	.done(function(msg) {
  		console.log(msg);
  		if (this.isMounted()) {
	        this.setState({
	          list: msg[0].todoName
	        });
	      }
  	}.bind(this));
  },

  	componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    console.log(this.state.list);
    return (
      <div className="container">
        <h1>{this.state.list}</h1>
        <img src={logo} />
        <p>Guangzhou, China <br/> chenbin92</p>
      </div>
    );
  }
})

export default Hello;
