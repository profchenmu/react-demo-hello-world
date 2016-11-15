import React from 'react';
import ReactDOM from 'react-dom'
import NavIn from './navIn';
import { createStore } from 'redux';
import counter from '../../redux/reducers/nav'
// import App from '../../redux/store/nav';
// import { Provider } from 'react-redux';

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

export default React.createClass ({

  render: function() {
    return (
        <div className="root-sub-nav">
                <NavIn
			value={store.getState()} 
			onIncreaseClick={() => store.dispatch({ type: 'INCREMENT' })}
		/>
        </div>
    );
  }

});
