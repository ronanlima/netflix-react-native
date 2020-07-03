import React, { useEffect, useState } from 'react';
import ProfileToEdit from './screen/ProfileToEdit';
import ChooseIcon from './screen/ChooseIcon';
import CameraScreen from './screen/CameraScreen';
import {ProfileContext} from './context/ProfileContext';

import {Tabs} from './routes/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import Snackbar from 'react-native-snackbar';
import { AsyncStorage } from '@react-native-community/async-storage';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
}

const requestPemission = requestUserPermission();

const Stack = createStackNavigator();

const App = () => {
	// const profileContext = useContext(ProfileContext);
	const [user, setUser] = useState(null);
	const value = {user, setUser};

	// AsyncStorage.getItem('profile').then((result) => {
	// 	console.log('profile carregado: ', result);
	// 	setUser(result);
	// });
	getData = async () => {
		try {
		  const value = await AsyncStorage.getItem('profile')
		  if(value !== null) {
			// value previously stored
		  }
		} catch(e) {
		  // error reading value
		}
	  }

	// const changeProfile = (newProfile) => {
	// 	console.log('changeProfile', newProfile.name);
	// 	setUser(newProfile.name);
	// }

	// Tenho uma dúvida quanto à utilização do ProfileContext com functional components...
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			const message = remoteMessage.notification.body ? remoteMessage.notification.body : "Ops...Alarme falso";
			Snackbar.dismiss();
			Snackbar.show({text: message, duration: Snackbar.LENGTH_INDEFINITE, action: {text: 'Ok', textColor: 'green', onPress: () => { /** nao quero fazer nada */}}});
		});
	
		return unsubscribe;
	  }, []);

	return (
		<ProfileContext.Provider value={value}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen 
						name="Tabs"
						component={Tabs}
						options={{headerShown: false}} />
					{/* <Stack.Screen 
						name="ChooseProfile"
						component={ChooseProfile}
						options={{headerShown: false}} /> */}
					<Stack.Screen 
						name="ProfileToEdit"
						component={ProfileToEdit}
						options={{headerShown: false}} />
					<Stack.Screen 
						name="ChooseIcon"
						component={ChooseIcon}
						options={{headerShown: false}} />
					<Stack.Screen 
						name="CameraScreen"
						component={CameraScreen}
						options={{headerShown: false}} />
				</Stack.Navigator>
			</NavigationContainer>
		</ProfileContext.Provider>
	)
}

export default App
