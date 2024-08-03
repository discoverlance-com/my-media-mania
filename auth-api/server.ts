import * as bcrypt from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'

const kv = await Deno.openKv()

async function verifyPassword(password: string, hashedPassword: string) {
	const isMatch = await bcrypt.compare(password, hashedPassword)
	return isMatch
}

Deno.serve(async (request: Request) => {
	const body = await request.json()
	const username = body.username
	const password = body.password

	if (!password || !username) {
		return new Response(
			JSON.stringify({ message: 'Missing username or password' }),
			{ status: 422 },
		)
	}

	const result = await kv.get<{ password: string; id: string }>([
		'users',
		username,
	])

	if (result && result.value) {
		// verify password
		const isMatch = await verifyPassword(password, result.value.password)
		if (!isMatch) {
			return new Response(
				JSON.stringify({ message: 'Invalid username or password' }),
				{ status: 400 },
			)
		}
		return new Response(
			JSON.stringify({ id: result.value.id, message: 'Success' }),
			{
				status: 200,
			},
		)
	} else {
		return new Response(
			JSON.stringify({ message: 'Invalid username or password' }),
			{ status: 400 },
		)
	}
})
