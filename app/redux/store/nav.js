import { connect } from 'react-redux';
import getMenu from '../store/nav';
import Counter from '../../component/core/nav';
import counter from '../reducers/nav';
import { createStore } from 'redux';

// Store
const store = createStore(counter)
// const store = createStore();

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)