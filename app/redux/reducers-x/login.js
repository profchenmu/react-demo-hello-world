export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
    	console.log(action);
      return Object.assign({}, state, action.payload);
      // merge({}, state, action.payload);
    default:
      return state
  }
  // return state;
}