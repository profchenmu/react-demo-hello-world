import ReactDOM from 'react-dom';
import { render } from 'react-dom';
// import NavIn from './navIn';
import { createStore } from 'redux';
import counter from '../../redux/reducers/nav'
import Navs from '../../redux/store/nav';
import { Provider } from 'react-redux';
import React, { Component, PropTypes } from 'react';

const store = createStore(counter);
// const rootEl = document.getElementById('root');

// const render = () => ReactDOM.render(
// 	<div className="root-sub-nav">
// 		<NavIn
// 			value={store.getState()} 
// 			onIncreaseClick={() => store.dispatch({ type: 'INCREMENT' })}
// 		/>
// 	</div>,
//   rootEl
// )

// render()
// store.subscribe(render)


export default class Nav extends Component {
	render() {
		return (
      <div className="root-sub-nav">
			<Provider store={store}>
                <Navs />
        	</Provider>
      </div>
		)
	}
}

