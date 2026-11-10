export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const destino = url.searchParams.get("url");

  if (!destino || !destino.startsWith("https://itunes.apple.com/")) {
    return new Response("URL inválida", { status: 400 });
  }

  const resposta = await fetch(destino);
  return new Response(resposta.body, {
    status: resposta.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
