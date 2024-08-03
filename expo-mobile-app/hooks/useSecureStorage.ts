import * as SecureStore from 'expo-secure-store'

import * as React from 'react'
import { Platform } from 'react-native'

type UseAsyncStateHook<T> = [
	[boolean, T | null],
	(value: T | null, options?: SecureStore.SecureStoreOptions) => void,
]

function useAsyncState<T>(
	key: [boolean, T | null] = [true, null],
): UseAsyncStateHook<T> {
	return React.useReducer(
		(
			state: [boolean, T | null],
			action: T | null = null,
		): [boolean, T | null] => [false, action],
		key,
	) as UseAsyncStateHook<T>
}

export async function setStorageItemAsync(
	key: string,
	value: string | null,
	options?: SecureStore.SecureStoreOptions,
) {
	if (Platform.OS === 'web') {
		try {
			if (value === null) {
				localStorage.removeItem(key)
			} else {
				localStorage.setItem(key, value)
			}
		} catch (e) {
			console.error('Local storage is unavailable:', e)
		}
	} else {
		if (value == null) {
			await SecureStore.deleteItemAsync(key, options)
		} else {
			await SecureStore.setItemAsync(key, value, options)
		}
	}
}

export function useSecureStorage(key: string): UseAsyncStateHook<string> {
	const [data, setData] = useAsyncState<string>()

	React.useEffect(() => {
		if (Platform.OS === 'web') {
			try {
				if (typeof localStorage !== 'undefined') {
					setData(localStorage.getItem(key))
				}
			} catch (e) {
				console.error('Local storage is unavailable:', e)
			}
		} else {
			SecureStore.getItemAsync(key).then((value) => {
				setData(value)
			})
		}
	}, [key])

	const setValue = React.useCallback(
		(value: string | null, options?: SecureStore.SecureStoreOptions) => {
			setData(value)
			setStorageItemAsync(key, value, options)
		},
		[key],
	)

	const getData = async (key: string) => {
		// try {
		// 	const value = await SecureStore.getItemAsync(key)
		// 	setData(value)
		// } catch (error) {
		// 	console.log(
		// 		`Error fetching data with key:(${key}) from secure storage:`,
		// 		error,
		// 	)
		// }
	}

	return [data, setValue]
}
