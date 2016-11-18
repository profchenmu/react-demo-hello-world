import React, { Component, PropTypes } from 'react';

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';

const ACTIVE = {
    backgroundColor: '#005cd5',
    color: '#fff'
}
export default class MenuItem extends Component {
	static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }

  componentWillMount() {
    // console.log(this.props);
  }
	render() {
		const {name, title, url, index} = this.props
		return (
			<li data-name={name}>
				<Link className="menu-item" to={url.replace('#', '/')} activeClassName="active"><span className={`icon-${name}`}></span>
					{title}</Link>
			</li>
		)
	}
}
