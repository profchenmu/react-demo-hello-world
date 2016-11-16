import React, { Component, PropTypes } from 'react';

 


export default class Counter extends Component {
	static propTypes = {
    value: PropTypes.object.isRequired,
    onIncreaseClick: PropTypes.object.isRequired
  }
  componentWillMount() {
    console.log(this.props);
  }
	render() {
		const {value, onIncreaseClick} = this.props
		return (
			<ul className="nav" data-cao={onIncreaseClick}>

      	</ul>
		)
	}
}




