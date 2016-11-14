import React from 'react';
// import navItem from './navItem';

export default React.createClass ({

	render: function() {
		var names = ['Alice', 'Emily', 'Kate'];
		return (
			<ul className="nav">
			{
		    	names.map(function (name) {
			      	return (
			      		<li>
							<a name={name} className="menu-item active">
								<span className="icon-index"></span>
								平台首页
							</a>
						</li>
			      	)
			    })
			}
			</ul>
		);
	}

});