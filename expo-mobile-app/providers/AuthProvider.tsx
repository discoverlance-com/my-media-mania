import { useSecureStorage } from '@/hooks/useSecureStorage'
import { createContext, useContext, type PropsWithChildren } from 'react'

const AUTH_STATE_KEY = '__auth__state'

const AuthContext = createContext<{
	signInWithPassword: (email: string, password: string) => void
	signOut: () => void
	session?: string | null
	isLoading: boolean
}>({
	signInWithPassword: (email: string, password: string) => null,
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

	const signInWithPassword = (email: string, password: string) => {
		//TODO: make api request to login
		//TODO: set session to user id
		// setSession(userId)
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
