import userService from 'userservice';

const login = (formData) => {
	console.log(formData);
  return dispatch => {
    userService
      .login(formData)
      .then(
        re => dispatch(loginDone(re))
      )
  }
}

const loginDone = (userData) => {
  	console.log(userData)
	return {
		type: 'LOGIN',
		payload: userData
	}
};


export default {login};