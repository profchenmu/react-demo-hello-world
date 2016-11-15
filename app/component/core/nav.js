import React from 'react';
// import NavIn from './navIn';
import App from '../../redux/store/nav';



export default React.createClass ({

  render: function() {
    return (
        <div className="root-sub-nav">
            <Provider store={store}>
                <App />
            </Provider>
        </div>
    );
  }

});
