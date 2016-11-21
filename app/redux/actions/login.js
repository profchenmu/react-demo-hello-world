// import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
// import TodoList from '../component/core/navIn'
// import data from './data.json';
// Store
// const store = createStore(counter)

// Map Redux state to component props

// const loginDone = (userData) => ({
//   type: LOGIN,
//   payload: userData
// })

// const login = (formData) => {
//   return dispatch => {
//     userService
//       .login(formData)
//       .then(
//         re => dispatch(loginDone(re))
//       )
//   }
// }
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
	type: 'LOGIN',
  	payload: {
    	value2: 1
    }
};

export default temp;