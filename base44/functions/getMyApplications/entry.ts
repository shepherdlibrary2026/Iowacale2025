import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find applications by the logged-in user's email
    const applications = await base44.asServiceRole.entities.JobApplication.filter(
      { email: user.email },
      '-created_date',
      50
    );

    return Response.json({ applications });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});