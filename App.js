
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import NavigationApp from './js/navigation/navigationApp'
import {persistor,store} from './js/redux';

class App extends Component{
  render(){
    return (
        <Provider store={store}>
          <PersistGate
              loading={null}
              persistor={persistor}
          >
            <NavigationApp/>
          </PersistGate>
        </Provider>
    )
  }
}
export default App;
