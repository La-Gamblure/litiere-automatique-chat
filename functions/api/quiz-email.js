/**
 * Cloudflare Pages Function — POST /api/quiz-email
 * Captures quiz emails in KV store.
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const body = await request.json();
    const { email, result } = body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 320) {
      return new Response(JSON.stringify({ error: "Email invalide" }), {
        status: 400,
        headers,
      });
    }

    // Store in KV if available
    if (env.QUIZ_EMAILS) {
      const key = `quiz_${Date.now()}_${email.replace(/[^a-zA-Z0-9@.]/g, "")}`;
      await env.QUIZ_EMAILS.put(
        key,
        JSON.stringify({
          email: email.trim().toLowerCase(),
          result,
          timestamp: new Date().toISOString(),
          ua: request.headers.get("user-agent") || "",
        }),
        { expirationTtl: 60 * 60 * 24 * 365 } // 1 year
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers,
    });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers,
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
