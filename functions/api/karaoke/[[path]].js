// functions/api/karaoke/[[path]].js
export async function onRequest(context) {
  const { request, env, params } = context;

  // A data vem como parâmetro: /api/karaoke/2026-11-10
  const data = params.path ? params.path.join("/") : "geral";

  if (request.headers.get("Upgrade") !== "websocket") {
    return new Response("Esperado Upgrade: websocket", { status: 426 });
  }

  // O binding KARAOKE_ROOM veio do wrangler.toml
  const id = env.KARAOKE_ROOM.idFromName(data);
  const stub = env.KARAOKE_ROOM.get(id);

  return stub.fetch(request);
}
