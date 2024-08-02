import { StyleSheet, Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground } from 'react-native'
import { LogInIcon } from 'lucide-react'

import {
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
} from '@/components/ui/form-control'
import { Center } from '@/components/ui/center'
import { VStack } from '@/components/ui/vstack'
import { Input, InputField } from '@/components/ui/input'
import { AlertCircleIcon, MailIcon } from '@/components/ui/icon'
import { Box } from '@/components/ui/box'
import {
	Button,
	ButtonIcon,
	ButtonSpinner,
	ButtonText,
} from '@/components/ui/button'

export default function HomeScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
				<Image
					source={require('../assets/images/react-logo.png')}
					style={styles.logo}
				/>
			</View>
			<ImageBackground
				source={require('../assets/images/users_enjoying_a_movie.jpg')}
				resizeMode="cover"
				style={{ flex: 1, justifyContent: 'center' }}
			>
				<Center className="flex-1">
					<VStack space="md" className="rounded bg-background-100 px-8 py-8">
						<Box className="h-24 w-80">
							<FormControl
								size="lg"
								isDisabled={false}
								isInvalid={false}
								isReadOnly={false}
								isRequired={false}
							>
								<FormControlLabel className="mb-1">
									<FormControlLabelText>Email</FormControlLabelText>
								</FormControlLabel>
								<Input>
									<InputField
										keyboardType="email-address"
										type="text"
										placeholder="Enter your email"
									/>
								</Input>
								<FormControlError>
									<FormControlErrorIcon size="sm" as={AlertCircleIcon} />
									<FormControlErrorText>
										At least 6 characters are required.
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
						</Box>
						<Box className="h-24 w-80">
							<FormControl
								size="lg"
								isDisabled={false}
								isInvalid={false}
								isReadOnly={false}
								isRequired={false}
							>
								<FormControlLabel className="mb-1">
									<FormControlLabelText>Password</FormControlLabelText>
								</FormControlLabel>
								<Input>
									<InputField
										type="password"
										placeholder="Enter your password"
									/>
								</Input>
								<FormControlError>
									<FormControlErrorIcon size="sm" as={AlertCircleIcon} />
									<FormControlErrorText>
										At least 6 characters are required.
									</FormControlErrorText>
								</FormControlError>
							</FormControl>
						</Box>

						<Box>
							<Button size="md" className="gap-4">
								{/* <ButtonSpinner /> */}
								<ButtonText>Sign In with email</ButtonText>
								<ButtonIcon as={LogInIcon} />
							</Button>
						</Box>
					</VStack>
				</Center>
			</ImageBackground>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	logo: {
		position: 'absolute',
		top: 30,
		left: '50%',
		transform: [{ translateX: -50 }],
		zIndex: 10,
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
})
