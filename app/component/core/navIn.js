import React from 'react';
import data from './data.json';

export default React.createClass ({

	render () {
		var menus = data.menu;
		console.log(this.props);
		return (
			<ul className="nav">
			{
		    	menus.map(function (menu) {
			      	return (
			      		<li data-name={menu.name} key={menu.name}>
							<a className="menu-item" href={menu.url} data-href={menu.name}>
								<span className={`icon-${menu.name}`}></span>
								{menu.title}
							</a>
						</li>
			      	)
			    })
			}
			</ul>
		);
	};
	React.propTypes: {
		value: PropTypes.menus.isRequired
	}
});