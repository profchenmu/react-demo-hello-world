import React, { Component, PropTypes } from 'react';
import data from './data.json';

class Counter extends Component {

	static propTypes = {
    value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
  }


  render() {
  	var menus = data.menu;
	console.log(this.props);
    const { value, onIncreaseClick } = this.props
    return (
      	<ul className="nav">
      	{
          	menus.map(function (menu) {
      	      	return (
      	      		<li data-name={menu.name} key={menu.name}>
      					<a onClick={onIncreaseClick} className="menu-item" href={menu.url} data-href={menu.name}>
      						<span className={`icon-${menu.name}`}></span>
      						{menu.title}
      					</a>
      				</li>
      	      	)
      	    })
      	}
      	</ul>
    )
  }
}

export default Counter;