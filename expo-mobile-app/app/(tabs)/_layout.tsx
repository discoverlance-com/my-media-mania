import { Redirect, Tabs } from 'expo-router'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useSession } from '@/providers/AuthProvider'
import { Text } from '@/components/ui/text'

export default function TabLayout() {
	const colorScheme = useColorScheme()

	const { session, isLoading } = useSession()

	if (isLoading) {
		return (
			<View style={styles.splashContainer}>
				<ActivityIndicator
					size="large"
					color={Colors[colorScheme ?? 'light'].tint}
				/>
				<Text>Loading...</Text>
			</View>
		)
	}

	if (!session) {
		return <Redirect href={{ pathname: '../sign-in' }} />
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="password"
				options={{
					title: 'Passwords',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'code-slash' : 'code-slash-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}

const styles = StyleSheet.create({
	splashContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
