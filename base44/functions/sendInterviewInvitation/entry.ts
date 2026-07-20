import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { app, dateTimeStr, location, notes } = await req.json();

    try { await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: "Iowa Structure Cabling Solution LLC",
      to: app.email,
      subject: `Interview Invitation — ${app.positionApplied} | Iowa Structure Cabling Solution LLC`,
      body: `Hi ${app.firstName},

We are pleased to invite you to interview for the ${app.positionApplied} position at Iowa Structure Cabling Solution LLC!

INTERVIEW DETAILS
─────────────────
📅 Date & Time: ${dateTimeStr}
📍 Location: ${location}
${notes ? `📝 Notes: ${notes}\n` : ""}
Please reply to this email or call us at (515) 200-9559 to confirm your attendance or reschedule if needed.

We look forward to meeting you!

Best regards,
Iowa Structure Cabling Solution LLC
📞 (515) 200-9559
📧 info@iowastructurecabling.com`.trim(),
    }); } catch (emailError) {
      console.warn("Email send failed (non-fatal):", emailError.message);
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});