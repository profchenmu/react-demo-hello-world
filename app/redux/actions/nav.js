// import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
// import TodoList from '../component/core/navIn'
import data from './data.json';
// Store
// const store = createStore(counter)

// Map Redux state to component props
// const loginDone = (userData) => ({
//   type: LOG_IN,
//   payload: userData
// })
// const getMenu = (formData) => {
//   return dispatch => {
//     dispatch(loginDone(data));
//   }
// }

// Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//   return {
//     onIncreaseClick: () => dispatch(increaseAction)
//   }
// }

// Connected Component
// const App = connect(
//   mapStateToProps
//   // mapDispatchToProps
// )(Counter)

const temp = {
    "index":0,
    "name":"index",
    "title":"首页",
    "url":"#index"
}

data.fragment.children.unshift(temp);
export default data