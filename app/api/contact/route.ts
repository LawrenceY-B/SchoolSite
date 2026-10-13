const BACKEND = process.env.CONTACT_API_URL ?? "http://localhost:3003/api/addmessage";

/** Validates the contact form and forwards it to the existing Express backend. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  try {
    const res = await fetch(BACKEND, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Backend responded ${res.status}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form forwarding failed:", error);
    return Response.json({ ok: false, error: "Could not send message" }, { status: 502 });
  }
}
