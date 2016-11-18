import React, { Component, PropTypes } from 'react';

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';


export default class MenuItem extends Component {
	static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }

  componentWillMount() {
    console.log(this.props);
  }
	render() {
		const {name, title, url, index} = this.props
		return (
			<li data-name={name}>
				<a className={`menu-item ${index==0? 'active': ''}`} href={url} data-href={name}>
					<span className={`icon-${name}`}></span>
					{title}
				</a>
				<Link to="/manage">Page 1</Link>
			</li>
		)
	}
}
