import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { applicationId, phone, address, city, state, zip, resumeUrl } = await req.json();

    // Verify this application belongs to the logged-in user
    const app = await base44.asServiceRole.entities.JobApplication.get(applicationId);
    if (!app || app.email !== user.email) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updates = {};
    if (phone !== undefined) updates.phone = phone;
    if (address !== undefined) updates.address = address;
    if (city !== undefined) updates.city = city;
    if (state !== undefined) updates.state = state;
    if (zip !== undefined) updates.zip = zip;
    if (resumeUrl !== undefined) updates.resumeUrl = resumeUrl;

    await base44.asServiceRole.entities.JobApplication.update(applicationId, updates);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});