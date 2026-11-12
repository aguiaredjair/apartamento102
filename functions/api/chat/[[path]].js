// functions/api/chat/[[path]].js
export async function onRequest(context) {
  const { request, env, params } = context;
  const path = params.path || [];
  
  if (request.headers.get("Upgrade") !== "websocket") {
    return new Response("Esperado Upgrade: websocket", { status: 426 });
  }

  // Rota Global (Hub) - /api/chat/hub
  if (path[0] === "hub") {
    const id = env.CHAT_HUB.idFromName("global");
    const stub = env.CHAT_HUB.get(id);
    return stub.fetch(request);
  }

  // Rota de Sala - /api/chat/sala/ID_DA_SALA
  if (path[0] === "sala" && path[1]) {
    const roomId = path[1];
    const id = env.CHAT_ROOM.idFromName(roomId);
    const stub = env.CHAT_ROOM.get(id);
    return stub.fetch(request);
  }

  return new Response("Rota inválida", { status: 404 });
}