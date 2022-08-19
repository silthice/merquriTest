import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import rootReducer from '../redux/reducers/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import ContactListScreen from '../screens/ContactListScreen';
import SearchScreen from '../screens/SearchScreen';
import NewContactScreen from '../screens/NewContactScreen';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

export default function NavigationStack() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerBackTitleVisible: false, headerShown: false}}>
          <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
          <Stack.Screen name="ContactDetailScreen" component={ContactDetailScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="NewContactScreen" component={NewContactScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
