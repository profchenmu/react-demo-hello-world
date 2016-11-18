import React, { Component, PropTypes } from 'react';
import MenuItem from './navItem';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
 


export default class Counter extends Component {
	static propTypes = {
    value: PropTypes.object.isRequired,
    onIncreaseClick: PropTypes.object.isRequired
  }
  componentWillMount() {
    // console.log(this.props);
  }
	render() {
		const {value, onIncreaseClick} = this.props
		return (
			<ul className="nav">
      
      {
        onIncreaseClick.fragment.children.map(item => 
          <MenuItem 
            key = {item.name}
            {...item}
          />
        ) 
      }

      	</ul>
		)
	}
}




