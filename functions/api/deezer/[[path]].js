// functions/api/deezer/[[path]].js
export async function onRequest(context) {
  const { request } = context;

  // Pega a URL de destino dos parâmetros de query
  const url = new URL(request.url);
  const destino = url.searchParams.get("url");

  if (!destino || !destino.startsWith("https://api.deezer.com/")) {
    return new Response("URL inválida", { status: 400 });
  }

  // Faz a requisição para o Deezer
  const resposta = await fetch(destino);

  // Retorna o JSON com os headers CORS liberados para o seu site
  return new Response(resposta.body, {
    status: resposta.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
