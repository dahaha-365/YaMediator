export async function itunes(path: string, query: string): Promise<Response> {
  let itunesResponse: Response | undefined
  let data = ''
  switch (path.toLowerCase()) {
    case '/itunes/search':
      itunesResponse = await fetch('https://itunes.apple.com/search' + query)
      break
    case '/itunes/lookup':
      itunesResponse = await fetch('https://itunes.apple.com/lookup' + query)
      break
  }
  if (itunesResponse?.status === 200) {
    data = await itunesResponse.text()
  }
  const response = new Response(data)
  response.headers.set('Content-Type', 'text/json')
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, OPTIONS'
  )
  return response
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  Deno.serve(async (req) => {
    const url = new URL(req.url)
    switch (url.pathname.toLowerCase()) {
      case '/itunes/search':
      case '/itunes/lookup':
        return await itunes(url.pathname, url.search)
    }
    return new Response("Build by https://yanet.app/");
  })
}
