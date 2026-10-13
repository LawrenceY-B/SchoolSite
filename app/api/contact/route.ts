import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export const runtime = "nodejs";

/** Validates the contact form and saves it to MongoDB. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body?.name);
  const email = str(body?.email);
  const message = str(body?.message);

  // Honeypot: real visitors never see or fill this field.
  if (str(body?.company)) return Response.json({ ok: true });

  if (!name || name.length > 120 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 200 || message.length < 10 || message.length > 5000) {
    return Response.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  try {
    await connectDB();
    await Contact.create({ Name: name, Email: email, Message: message });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Saving contact message failed:", error);
    return Response.json({ ok: false, error: "Could not send message" }, { status: 502 });
  }
}
