import { connect } from 'react-redux';
import Counter from '../../component/core/navIn';
import counter from '../reducers/nav';
import { createStore } from 'redux';
import increaseAction from '../actions/nav'

// Store
// const store = createStore();

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state
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
)(Counter)