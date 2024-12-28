import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider, AppConsumer } from './src/Provider/context/AppProvider';
import Stacknav from './src/Provider/Routenavigation';
import { firebaseprovider } from './src/Provider/FirebaseProvider';
import firebase from './src/ChatProvider/Config1'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']);
global.MapAddress = 'NA';
class App extends Component {
  componentDidMount() {
    firebaseprovider.getAllUsers()
  }

  render() {
    return (
      <NavigationContainer>
        <AppProvider {...this.props}>
          <AppConsumer>{funcs => {
            global.props = { ...funcs }
            return <Stacknav {...funcs} />
          }}
          </AppConsumer>
        </AppProvider>
      </NavigationContainer>

    );
  }
}

export default App;