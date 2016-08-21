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
      <div className="container">
        <h1>{this.state.list}</h1>
        <img src={logo} />
        <p>Guangzhou, China <br/> chenbin92</p>
      </div>
    );
  }
})

export default Hello;
