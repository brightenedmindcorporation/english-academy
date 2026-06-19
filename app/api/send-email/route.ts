import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, matricule, name } = body;

    await resend.emails.send({
      from: "Brightened Mind <onboarding@resend.dev>",
      to: email,
      subject: "Your Student Matricule",
      html: `
        <h2>Welcome ${name}</h2>
        <p>Your registration has been approved.</p>
        <h3>Your Matricule: <b>${matricule}</b></h3>
        <p>Keep it safe.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}