import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import useAuth from '../hooks/useAuth';
import LoginScreen from '../screens/LoginScreen';
import SearchScreen from '../screens/SearchScreen';
import StockScreen from '../screens/StockScreen';
import ProfileScreen from '../screens/ProileScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{user ? (
				<>
					<Stack.Screen name='Stocks' component={StockScreen} />
					<Stack.Screen name='Search' component={SearchScreen} />
					<Stack.Screen name='Profile' component={ProfileScreen} />
				</>
			) : (
				<Stack.Screen name='Login' component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
