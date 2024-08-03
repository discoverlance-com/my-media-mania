const kv = await Deno.openKv()

Deno.serve(async (request: Request) => {
	const body = await request.json()
	const username = body.username
	const password = body.password

	if (!password || !username) {
		return new Response('Missing username or password', { status: 422 })
	}

	const result = await kv.get(['users', username])

	if (result && result.value?.password === password) {
		return new Response(JSON.stringify({ id: result.value.id }), {
			status: 200,
		})
	} else {
		return new Response('Invalid username or password', { status: 401 })
	}
})
