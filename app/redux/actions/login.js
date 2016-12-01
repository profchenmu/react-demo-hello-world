// import userService from 'userservice';
import userService from '../../services/xhr/jquery';
var tempJson = {
	"message":"登录成功",
	"adminFlag":"1",
	"userName":"TPN",
	"code":"00"
}


const login = (formData) => {
  return dispatch => {
  	userService()
  		.then(
  			() => {
  				console.log(tempJson);
  				dispatch(loginDone(tempJson))
  			}
  		)
    // userService
    //   .login(formData)
    //   .then(
    //     re => dispatch(loginDone(re))
    //   )
  }
}

const loginDone = (userData) => {
	console.log(userData);
	return {
		type: 'LOGIN',
		payload: userData
	}
};


export default {login};