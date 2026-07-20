import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const formData = await req.json();

    // Save to database using service role (no user auth required)
    const application = await base44.asServiceRole.entities.JobApplication.create({
      ...formData,
      status: "New",
    });

    // Build email body
    const body = `
JOB APPLICATION — ${formData.positionApplied}
Submitted: ${new Date().toLocaleDateString()}
================================================

PERSONAL INFORMATION
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address || ""}, ${formData.city || ""}, ${formData.state || ""} ${formData.zip || ""}

POSITION DETAILS
Position Applied For: ${formData.positionApplied}
Desired Pay: ${formData.desiredPay || ""}
Available Start Date: ${formData.availableStart || ""}
Employment Type Sought: ${formData.employmentType || ""}

WORK AUTHORIZATION
Authorized to work in the US: ${formData.authorizedToWork || ""}
Requires Visa Sponsorship: ${formData.requireSponsorship || ""}
Previously Employed Here: ${formData.everWorkedHere || ""}
${formData.everWorkedHereDetails ? `Details: ${formData.everWorkedHereDetails}` : ""}

EDUCATION
Highest Level of Education: ${formData.highestEducation || ""}
School / Institution: ${formData.schoolName || ""}
Field of Study: ${formData.fieldOfStudy || ""}
Graduation Year: ${formData.graduationYear || ""}

WORK EXPERIENCE
Years of Relevant Experience: ${formData.yearsExperience || ""}
Current / Most Recent Employer: ${formData.currentEmployer || ""}
Current / Most Recent Title: ${formData.currentTitle || ""}
Current / Most Recent Pay: ${formData.currentPay || ""}
Reason for Leaving: ${formData.reasonForLeaving || ""}

Prior Employer: ${formData.priorEmployer || ""}
Prior Title: ${formData.priorTitle || ""}
Dates of Employment: ${formData.priorDates || ""}
Reason for Leaving: ${formData.priorReason || ""}

SKILLS & CERTIFICATIONS
Certifications / Licenses: ${formData.certifications || ""}
Tools & Equipment Experience: ${formData.tools || ""}
Valid Driver's License: ${formData.driversLicense || ""}
CDL: ${formData.cdl || ""}
Own Reliable Vehicle: ${formData.ownVehicle || ""}

AVAILABILITY
Days Available: ${Array.isArray(formData.availableDays) ? formData.availableDays.join(", ") : ""}
Hours Per Week Available: ${formData.hoursPerWeek || ""}
Willing to Travel: ${formData.willingToTravel || ""}

BACKGROUND
Convicted of a Felony or Misdemeanor: ${formData.convictionRecord || ""}
${formData.convictionDetails ? `Details: ${formData.convictionDetails}` : ""}

MILITARY SERVICE
Military Service: ${formData.militaryService || ""}
${formData.militaryService === "Yes" ? `Branch: ${formData.militaryBranch || ""}
Dates of Service: ${formData.militaryDates || ""}
Rank at Discharge: ${formData.militaryRank || ""}
Honorable Discharge: ${formData.honorableDischarge || ""}` : ""}

REFERENCES
1. ${formData.ref1Name || ""} — ${formData.ref1Relation || ""} — ${formData.ref1Phone || ""}
2. ${formData.ref2Name || ""} — ${formData.ref2Relation || ""} — ${formData.ref2Phone || ""}

HOW DID YOU HEAR ABOUT US: ${formData.hearAboutUs || ""}
ADDITIONAL INFO: ${formData.additionalInfo || ""}
${formData.resumeUrl ? `\nRESUME: ${formData.resumeUrl}` : ""}

---
EEO VOLUNTARY SELF-IDENTIFICATION
Gender: ${formData.gender || "Prefer not to answer"}
Race/Ethnicity: ${formData.race || "Prefer not to answer"}
Veteran Status: ${formData.veteranStatus || "Prefer not to answer"}
Disability Status: ${formData.disabilityStatus || "Prefer not to answer"}

SIGNATURE: ${formData.signature || ""}
DATE: ${formData.signatureDate || ""}
    `.trim();

    // Notify company
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "info@iowastructurecabling.com",
      subject: `Job Application: ${formData.positionApplied} — ${formData.firstName} ${formData.lastName}`,
      body,
    });

    // Thank-you email to applicant
    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: "Iowa Structure Cabling Solution LLC",
      to: formData.email,
      subject: `We Received Your Application — ${formData.positionApplied} | Iowa Structure Cabling Solution LLC`,
      body: `Hi ${formData.firstName},

Thank you for taking the time to apply for the ${formData.positionApplied} position at Iowa Structure Cabling Solution LLC. We've received your application and are excited to learn more about you!

──────────────────────────────
YOUR APPLICATION SUMMARY
──────────────────────────────
Position Applied For:  ${formData.positionApplied}
Employment Type:       ${formData.employmentType || "Not specified"}
Desired Pay:           ${formData.desiredPay || "Not specified"}
Available Start Date:  ${formData.availableStart || "Not specified"}
Submitted On:          ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}

──────────────────────────────
WHAT HAPPENS NEXT
──────────────────────────────

1. APPLICATION REVIEW (1–2 business days)
   Our hiring team will carefully review your qualifications and experience.

2. INITIAL CONTACT
   If your background is a strong match, a member of our team will reach out
   to you by phone or email to discuss the position and next steps.

3. INTERVIEW
   Candidates who move forward will be invited to an in-person or phone
   interview with our hiring team.

4. HIRING DECISION
   We will notify all interviewed candidates of our decision promptly.

──────────────────────────────

We appreciate your interest in joining Iowa Structure Cabling Solution LLC. We're a growing team of dedicated professionals building reliable network infrastructure across Iowa, and we take every application seriously.

If you have any questions about your application or the position, please don't hesitate to reach out:

📞  (515) 200-9559
📧  info@iowastructurecabling.com
🌐  iowastructurecabling.com

We look forward to connecting with you!

Best regards,
The Hiring Team
Iowa Structure Cabling Solution LLC
Des Moines, Iowa

─────────────────────────────────────────────────────────────
This is an automated confirmation. Please do not reply directly
to this email. Contact us at info@iowastructurecabling.com.
─────────────────────────────────────────────────────────────`.trim(),
    });

    return Response.json({ success: true, id: application.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});