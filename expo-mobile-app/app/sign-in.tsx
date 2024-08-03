import { StyleSheet, Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ImageBackground } from 'react-native'
import { LogInIcon } from 'lucide-react-native'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'

const formSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Invalid email address'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, 'Password is required'),
})

export default function HomeScreen() {
	const { control, handleSubmit, formState } = useForm<
		z.infer<typeof formSchema>
	>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		await new Promise((resolve) => {
			setTimeout(resolve, 4000)
		})
		console.log({ data })
	}

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
				<Center className="z-10 flex-1">
					<Card size="md" variant="filled" className="m-3 py-8">
						<Center>
							<VStack className="mb-4">
								<Heading size="xl" className="mb-1">
									Login
								</Heading>
								<Text size="sm">Login to continue</Text>
							</VStack>
						</Center>
						<VStack space="md">
							<Box className="h-24 w-80">
								<FormControl
									size="lg"
									isDisabled={false}
									isInvalid={formState.errors.email ? true : false}
									isReadOnly={false}
									isRequired={true}
								>
									<FormControlLabel className="mb-1">
										<FormControlLabelText>Email</FormControlLabelText>
									</FormControlLabel>
									<Controller
										control={control}
										name="email"
										render={({ field: { onChange, onBlur, value } }) => (
											<Input>
												<InputField
													keyboardType="email-address"
													type="text"
													value={value}
													onChangeText={onChange}
													onBlur={onBlur}
													placeholder="Enter your email"
												/>
											</Input>
										)}
									/>

									<FormControlError>
										<FormControlErrorIcon size="sm" as={AlertCircleIcon} />
										<FormControlErrorText>
											{formState.errors.email?.message}
										</FormControlErrorText>
									</FormControlError>
								</FormControl>
							</Box>
							<Box className="h-24 w-80">
								<FormControl
									size="lg"
									isDisabled={false}
									isInvalid={formState.errors.email ? true : false}
									isReadOnly={false}
									isRequired={true}
								>
									<FormControlLabel className="mb-1">
										<FormControlLabelText>Password</FormControlLabelText>
									</FormControlLabel>
									<Controller
										control={control}
										name="password"
										render={({ field: { onChange, onBlur, value } }) => (
											<Input>
												<InputField
													onChangeText={onChange}
													onBlur={onBlur}
													value={value}
													type="password"
													placeholder="Enter your password"
												/>
											</Input>
										)}
									/>
									<FormControlError>
										<FormControlErrorIcon size="sm" as={AlertCircleIcon} />
										<FormControlErrorText>
											{formState.errors.password?.message}
										</FormControlErrorText>
									</FormControlError>
								</FormControl>
							</Box>

							<Box>
								<Button
									size="md"
									className="gap-4"
									onPress={handleSubmit(onSubmit)}
								>
									{formState.isSubmitting && <ButtonSpinner />}
									<ButtonText>Sign In with email</ButtonText>
									<ButtonIcon as={LogInIcon} />
								</Button>
							</Box>
						</VStack>
					</Card>
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
		zIndex: 5,
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
})
