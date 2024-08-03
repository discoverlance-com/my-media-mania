import { useSecureStorage } from '@/hooks/useSecureStorage'
import { createContext, useContext, type PropsWithChildren } from 'react'
import ky, { HTTPError } from 'ky'

const AUTH_STATE_KEY = '__auth__state'

const AuthContext = createContext<{
	signInWithPassword: (email: string, password: string) => Promise<void>
	signOut: () => void
	session?: string | null
	isLoading: boolean
}>({
	signInWithPassword: async (email: string, password: string) => {},
	signOut: () => null,
	session: null,
	isLoading: false,
})

export function useSession() {
	const value = useContext(AuthContext)
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error('useSession must be wrapped in a <SessionProvider />')
		}
	}

	return value
}

export function AuthProvider({ children }: PropsWithChildren) {
	const [[isLoading, session], setSession] = useSecureStorage(AUTH_STATE_KEY)

	const signInWithPassword = async (email: string, password: string) => {
		const response = await ky
			.post(process.env.EXPO_PUBLIC_LOGIN_API_URL!, {
				json: {
					username: email,
					password,
				},
			})
			.json<{ message: string; id: string }>()

		setSession(response.id)
	}

	return (
		<AuthContext.Provider
			value={{
				signInWithPassword,
				signOut: () => {
					setSession(null)
				},
				session,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
