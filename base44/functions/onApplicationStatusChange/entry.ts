import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STATUS_MESSAGES = {
  "Reviewing": {
    subject: "Your Application is Being Reviewed — Iowa Structure Cabling Solution LLC",
    heading: "We're Reviewing Your Application",
    body: `Good news! Our hiring team has begun reviewing your application and will be in touch if your experience is a strong match for the role.`,
    nextStep: "If selected to move forward, we'll reach out by phone or email within 2–5 business days to discuss next steps.",
  },
  "Interview Scheduled": {
    subject: "Interview Invitation — Iowa Structure Cabling Solution LLC",
    heading: "You've Been Selected for an Interview!",
    body: `Congratulations! We were impressed by your application and would like to invite you to interview for this position.`,
    nextStep: "Our team will be in touch shortly with the specific date, time, and location details. Please keep an eye on your email and phone.",
  },
  "Hired": {
    subject: "Welcome to the Team! — Iowa Structure Cabling Solution LLC",
    heading: "Congratulations — You're Hired!",
    body: `We are thrilled to offer you a position with Iowa Structure Cabling Solution LLC! Your skills and experience stood out and we can't wait to have you on the team.`,
    nextStep: "Our team will be contacting you very soon with onboarding details, your start date, and everything you need to get started.",
  },
  "Not Selected": {
    subject: "Application Update — Iowa Structure Cabling Solution LLC",
    heading: "Thank You for Applying",
    body: `After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs. This was a difficult decision — we appreciate the time you took to apply.`,
    nextStep: "We encourage you to apply again in the future as new positions become available. We wish you the very best in your job search.",
  },
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { entity_id, data, old_data } = payload;

    const newStatus = data?.status;
    const oldStatus = old_data?.status;

    // Only act when status actually changed and we have a template for the new status
    if (!newStatus || newStatus === oldStatus || !STATUS_MESSAGES[newStatus]) {
      return Response.json({ skipped: true, reason: "No status change or no template for status" });
    }

    const app = data;
    if (!app?.email || !app?.firstName) {
      return Response.json({ skipped: true, reason: "Missing applicant email or name" });
    }

    const template = STATUS_MESSAGES[newStatus];

    const emailBody = `Hi ${app.firstName},

${template.body}

─────────────────────────────────
Position Applied: ${app.positionApplied}
Status Update: ${newStatus}
─────────────────────────────────

${template.nextStep}

If you have any questions, please don't hesitate to reach out:
📞 (515) 200-9559
📧 info@iowastructurecabling.com

Thank you for your interest in Iowa Structure Cabling Solution LLC.

Best regards,
Iowa Structure Cabling Solution LLC
Des Moines, Iowa`;

    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        from_name: "Iowa Structure Cabling Solution LLC",
        to: app.email,
        subject: template.subject,
        body: emailBody,
      });
      console.log(`Status email sent to ${app.email} for status: ${newStatus}`);
    } catch (emailErr) {
      console.warn("Email send failed (non-fatal):", emailErr.message);
    }

    return Response.json({ success: true, status: newStatus, recipient: app.email });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});