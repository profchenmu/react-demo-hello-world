import React, { Component, PropTypes } from 'react';
import MenuItem from './navItem';
import increaseAction from '../../redux/actions/nav';
import { connect } from 'react-redux';
 


class NavIn extends Component {
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

function mapStateToProps(state) {
  return {
    value: state.nav
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    // onIncreaseClick: dispatch(increaseAction())
    onIncreaseClick: increaseAction
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavIn)




