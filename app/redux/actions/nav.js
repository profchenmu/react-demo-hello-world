// import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
// import TodoList from '../component/core/navIn'
import data from './data.json';

const temp = {
    "index":0,
    "name":"index",
    "title":"首页",
    "url":"#index"
}

data.fragment.children.unshift(temp);
export default data