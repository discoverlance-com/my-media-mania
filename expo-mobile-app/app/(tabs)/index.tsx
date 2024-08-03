import { StyleSheet, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import { Center } from '@/components/ui/center'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { useSession } from '@/providers/AuthProvider'
import { VStack } from '@/components/ui/vstack'

export default function HomeScreen() {
	const router = useRouter()
	const { signOut } = useSession()

	function handleSignOut() {
		signOut()
		router.replace('/')
	}

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
			<Center className="flex-1">
				<VStack>
					<Heading size="2xl">Welcome</Heading>
					<Text>
						We are actively{' '}
						<Text className="font-semibold">making the movies list</Text> so
						please hold on. You are on{' '}
						<Text className="font-bold">
							{Platform.select({ android: 'ANDROID', iods: 'IOS' })}
						</Text>{' '}
						{Platform.Version.toString()}.
					</Text>

					<Box className="mt-5">
						<Button onPress={handleSignOut} action="negative">
							<ButtonText>Sign Out</ButtonText>
						</Button>
					</Box>
				</VStack>
			</Center>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
})
