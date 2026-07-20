import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const lead = await base44.asServiceRole.entities.Lead.create(body);

    const serviceLabel = body.service_type || "Not specified";
    const sqftLabel = body.square_footage || "Not specified";
    const timelineLabel = body.timeline || "Not specified";
    const infraLabel = body.infrastructure_status || "Not specified";

    // Notify the business
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "info@iowacabling.com",
      from_name: "Iowa Cabling Website",
      subject: `New Lead: ${body.name} — ${serviceLabel}`,
      body: `
<h2>New Quote Request Lead</h2>
<table cellpadding="6" style="border-collapse:collapse;">
  <tr><td><strong>Name</strong></td><td>${body.name}</td></tr>
  <tr><td><strong>Company</strong></td><td>${body.company || "—"}</td></tr>
  <tr><td><strong>Email</strong></td><td>${body.email}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${body.phone}</td></tr>
  <tr><td><strong>Service Type</strong></td><td>${serviceLabel}</td></tr>
  <tr><td><strong>Square Footage</strong></td><td>${sqftLabel}</td></tr>
  <tr><td><strong>Timeline</strong></td><td>${timelineLabel}</td></tr>
  <tr><td><strong>Infrastructure Status</strong></td><td>${infraLabel}</td></tr>
  <tr><td><strong>Notes</strong></td><td>${body.notes || "—"}</td></tr>
</table>
      `.trim(),
    });

    // Auto-reply to the lead
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: body.email,
      from_name: "Iowa Structure Cabling Solution",
      subject: "We received your quote request!",
      body: `
<p>Hi ${body.name},</p>
<p>Thank you for reaching out to Iowa Structure Cabling Solution LLC! We've received your quote request and a member of our team will be in touch within <strong>24 hours</strong>.</p>
<p><strong>Your request summary:</strong></p>
<ul>
  <li>Service: ${serviceLabel}</li>
  <li>Facility size: ${sqftLabel}</li>
  <li>Timeline: ${timelineLabel}</li>
</ul>
<p>If you need immediate assistance, call us at <strong>(515) 200-9559</strong> or reply to this email.</p>
<p>— Iowa Structure Cabling Solution Team</p>
      `.trim(),
    });

    return Response.json({ success: true, id: lead.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});