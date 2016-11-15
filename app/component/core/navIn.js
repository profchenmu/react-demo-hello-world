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
<<<<<<< HEAD
			      		<li data-name={menu.name} key={menu.name}>
							<a className="menu-item" href={menu.url} data-href={menu.name}>
								<span className={`icon-${menu.name}`}></span>
								{menu.title}
=======
			      		<li data-name="" key={name}>
							<a name={name} className="menu-item active">
								<span className="icon-index"></span>
								平台首页
>>>>>>> origin/dev-2
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