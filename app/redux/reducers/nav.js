export default (state = 0, action) => {
  switch (action.type) {
    case 'increase':
      return state + 1
    default:
      return state
  }
  // return state;
}