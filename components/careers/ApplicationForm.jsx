import { useState, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Send, CheckCircle, Loader2, Upload, ChevronDown } from "lucide-react";

const SECTION = ({ title, children }) => (
  <div className="space-y-4">
    <div className="border-b border-border pb-2">
      <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary">{title}</h3>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }) => (
  <div>
    <Label className="text-sm font-medium mb-1.5 block">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
  </div>
);

const Select = ({ value, onChange, children, placeholder }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {children}
  </select>
);

export default function ApplicationForm({ job, onClose }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resume, setResume] = useState(null);

  const [form, setForm] = useState({
    // Personal Info
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "",
    // Position
    positionApplied: job.title, desiredPay: "", availableStart: "", employmentType: "",
    // Work Authorization
    authorizedToWork: "", requireSponsorship: "", everWorkedHere: "", everWorkedHereDetails: "",
    // Education
    highestEducation: "", schoolName: "", fieldOfStudy: "", graduationYear: "",
    // Experience
    yearsExperience: "", currentEmployer: "", currentTitle: "", currentPay: "", reasonForLeaving: "",
    priorEmployer: "", priorTitle: "", priorDates: "", priorReason: "",
    // Skills
    certifications: "", tools: "", driversLicense: "", cdl: "", ownVehicle: "",
    // Availability
    availableDays: [], hoursPerWeek: "", willingToTravel: "", travelPercent: "",
    // Background
    convictionRecord: "", convictionDetails: "",
    // Military
    militaryService: "", militaryBranch: "", militaryDates: "", militaryRank: "", honorableDischarge: "",
    // EEO (Voluntary)
    gender: "", race: "", veteranStatus: "", disabilityStatus: "",
    // References
    ref1Name: "", ref1Relation: "", ref1Phone: "",
    ref2Name: "", ref2Relation: "", ref2Phone: "",
    // Additional
    hearAboutUs: "", additionalInfo: "", signature: "", signatureDate: "",
  });

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const toggleDay = (day) => {
    setForm((p) => ({
      ...p,
      availableDays: p.availableDays.includes(day)
        ? p.availableDays.filter((d) => d !== day)
        : [...p.availableDays, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let resumeUrl = null;
    if (resume) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: resume });
      resumeUrl = file_url;
    }

    await base44.functions.invoke("submitJobApplication", {
      ...form,
      resumeUrl: resumeUrl || "",
    });

    setLoading(false);
    setSuccess(true);
  };

  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <section ref={formRef} className="py-12 md:py-16 bg-muted/40" id="application-form">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-widest text-primary">Employment Application</span>
              <h2 className="font-heading font-bold text-2xl mt-1">{job.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{job.location} · {job.type} · {job.pay}</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 mt-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {success ? (
            <div className="py-10">
              {/* Success Banner */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-2">Application Received!</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Thank you, <strong>{form.firstName}</strong>! Your application for the <strong>{job.title}</strong> position has been successfully submitted.
                </p>
              </div>

              {/* What Happens Next */}
              <div className="bg-muted/50 border border-border rounded-xl p-6 mb-6">
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">What Happens Next</h4>
                <ol className="space-y-3">
                  {[
                    { step: "1", title: "Application Review", desc: "Our hiring team will carefully review your application within 2–3 business days." },
                    { step: "2", title: "Initial Contact", desc: "If your experience is a strong match, we'll reach out by phone or email to discuss next steps." },
                    { step: "3", title: "Interview", desc: "Qualified candidates will be invited to an in-person or phone interview with our team." },
                    { step: "4", title: "Decision", desc: "We'll notify all interviewed candidates of our hiring decision promptly." },
                  ].map(({ step, title, desc }) => (
                    <li key={step} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{step}</span>
                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Confirmation note */}
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-6 text-sm text-center">
                <p className="text-foreground/80">
                  📧 A confirmation email has been sent to <strong>{form.email}</strong>. Please check your spam folder if you don't see it within a few minutes.
                </p>
              </div>

              {/* Contact info */}
              <div className="text-center text-sm text-muted-foreground mb-6">
                Questions? Call us at <a href="tel:+15152009559" className="text-primary font-medium">(515) 200-9559</a> or email <a href="mailto:info@iowastructurecabling.com" className="text-primary font-medium">info@iowastructurecabling.com</a>
              </div>

              <Button variant="outline" className="w-full" onClick={onClose}>View Other Open Positions</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* 1. Personal Information */}
              <SECTION title="1. Personal Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" required><Input required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="John" /></Field>
                  <Field label="Last Name" required><Input required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Smith" /></Field>
                  <Field label="Email Address" required><Input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@email.com" /></Field>
                  <Field label="Phone Number" required><Input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(515) 000-0000" /></Field>
                  <Field label="Street Address"><Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="123 Main St" /></Field>
                  <Field label="City"><Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Des Moines" /></Field>
                  <Field label="State"><Input value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="IA" /></Field>
                  <Field label="ZIP Code"><Input value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="50301" /></Field>
                </div>
              </SECTION>

              {/* 2. Position */}
              <SECTION title="2. Position & Availability">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Position Applied For" required>
                    <Input required value={form.positionApplied} onChange={(e) => set("positionApplied", e.target.value)} />
                  </Field>
                  <Field label="Desired Pay / Salary">
                    <Input value={form.desiredPay} onChange={(e) => set("desiredPay", e.target.value)} placeholder="e.g. $25/hr or Open" />
                  </Field>
                  <Field label="Date Available to Start">
                    <Input type="date" value={form.availableStart} onChange={(e) => set("availableStart", e.target.value)} />
                  </Field>
                  <Field label="Employment Type Sought">
                    <Select value={form.employmentType} onChange={(v) => set("employmentType", v)} placeholder="Select...">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Temporary / Contract">Temporary / Contract</option>
                      <option value="Either">Either</option>
                    </Select>
                  </Field>
                </div>
              </SECTION>

              {/* 3. Work Authorization */}
              <SECTION title="3. Work Authorization">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Are you legally authorized to work in the United States?" required>
                    <Select required value={form.authorizedToWork} onChange={(v) => set("authorizedToWork", v)} placeholder="Select...">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </Field>
                  <Field label="Will you now or in the future require sponsorship for employment visa status?">
                    <Select value={form.requireSponsorship} onChange={(v) => set("requireSponsorship", v)} placeholder="Select...">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Select>
                  </Field>
                  <Field label="Have you ever been employed with Iowa Structure Cabling Solution?">
                    <Select value={form.everWorkedHere} onChange={(v) => set("everWorkedHere", v)} placeholder="Select...">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Select>
                  </Field>
                  {form.everWorkedHere === "Yes" && (
                    <Field label="If yes, when and in what position?">
                      <Input value={form.everWorkedHereDetails} onChange={(e) => set("everWorkedHereDetails", e.target.value)} placeholder="Year and title..." />
                    </Field>
                  )}
                </div>
              </SECTION>

              {/* 4. Education */}
              <SECTION title="4. Education">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Highest Level of Education Completed">
                    <Select value={form.highestEducation} onChange={(v) => set("highestEducation", v)} placeholder="Select...">
                      <option value="Some High School">Some High School</option>
                      <option value="High School Diploma / GED">High School Diploma / GED</option>
                      <option value="Vocational / Trade School">Vocational / Trade School</option>
                      <option value="Some College">Some College</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree or Higher">Master's Degree or Higher</option>
                    </Select>
                  </Field>
                  <Field label="School / Institution Name">
                    <Input value={form.schoolName} onChange={(e) => set("schoolName", e.target.value)} placeholder="Name of school" />
                  </Field>
                  <Field label="Field of Study / Major">
                    <Input value={form.fieldOfStudy} onChange={(e) => set("fieldOfStudy", e.target.value)} placeholder="e.g. Electrical Technology" />
                  </Field>
                  <Field label="Year Graduated / Completed">
                    <Input value={form.graduationYear} onChange={(e) => set("graduationYear", e.target.value)} placeholder="e.g. 2018" />
                  </Field>
                </div>
              </SECTION>

              {/* 5. Work Experience */}
              <SECTION title="5. Work Experience">
                <Field label="Total Years of Relevant Experience">
                  <Select value={form.yearsExperience} onChange={(v) => set("yearsExperience", v)} placeholder="Select...">
                    <option value="No experience">No experience (entry level)</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1–2 years">1–2 years</option>
                    <option value="3–5 years">3–5 years</option>
                    <option value="6–9 years">6–9 years</option>
                    <option value="10+ years">10+ years</option>
                  </Select>
                </Field>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider pt-2">Current / Most Recent Employer</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Employer Name"><Input value={form.currentEmployer} onChange={(e) => set("currentEmployer", e.target.value)} placeholder="Company name" /></Field>
                  <Field label="Job Title"><Input value={form.currentTitle} onChange={(e) => set("currentTitle", e.target.value)} placeholder="Your title" /></Field>
                  <Field label="Starting / Ending Pay"><Input value={form.currentPay} onChange={(e) => set("currentPay", e.target.value)} placeholder="e.g. $20/hr – $24/hr" /></Field>
                  <Field label="Reason for Leaving / Left"><Input value={form.reasonForLeaving} onChange={(e) => set("reasonForLeaving", e.target.value)} placeholder="Reason" /></Field>
                </div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider pt-2">Prior Employer (if applicable)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Employer Name"><Input value={form.priorEmployer} onChange={(e) => set("priorEmployer", e.target.value)} placeholder="Company name" /></Field>
                  <Field label="Job Title"><Input value={form.priorTitle} onChange={(e) => set("priorTitle", e.target.value)} placeholder="Your title" /></Field>
                  <Field label="Dates of Employment"><Input value={form.priorDates} onChange={(e) => set("priorDates", e.target.value)} placeholder="e.g. Jan 2019 – Mar 2022" /></Field>
                  <Field label="Reason for Leaving"><Input value={form.priorReason} onChange={(e) => set("priorReason", e.target.value)} placeholder="Reason" /></Field>
                </div>
              </SECTION>

              {/* 6. Skills */}
              <SECTION title="6. Skills, Certifications & Licenses">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Industry Certifications (e.g. BICSI, FOA, OSHA 10/30)">
                    <Input value={form.certifications} onChange={(e) => set("certifications", e.target.value)} placeholder="List any certifications" />
                  </Field>
                  <Field label="Tools & Equipment You Are Experienced With">
                    <Input value={form.tools} onChange={(e) => set("tools", e.target.value)} placeholder="e.g. Fluke tester, fusion splicer, OTDR..." />
                  </Field>
                  <Field label="Do you have a valid Driver's License?" required>
                    <Select required value={form.driversLicense} onChange={(v) => set("driversLicense", v)} placeholder="Select...">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </Field>
                  <Field label="Do you have a CDL?">
                    <Select value={form.cdl} onChange={(v) => set("cdl", v)} placeholder="Select...">
                      <option value="No">No</option>
                      <option value="Yes – Class A">Yes – Class A</option>
                      <option value="Yes – Class B">Yes – Class B</option>
                    </Select>
                  </Field>
                  <Field label="Do you have reliable transportation / own vehicle?">
                    <Select value={form.ownVehicle} onChange={(v) => set("ownVehicle", v)} placeholder="Select...">
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </Field>
                </div>
              </SECTION>

              {/* 7. Availability */}
              <SECTION title="7. Schedule Availability">
                <Field label="Days Available to Work">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                          form.availableDays.includes(day)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Hours Available Per Week">
                    <Select value={form.hoursPerWeek} onChange={(v) => set("hoursPerWeek", v)} placeholder="Select...">
                      <option value="Up to 20 hrs">Up to 20 hrs</option>
                      <option value="20–30 hrs">20–30 hrs</option>
                      <option value="30–40 hrs">30–40 hrs</option>
                      <option value="40+ hrs (Full-Time)">40+ hrs (Full-Time)</option>
                      <option value="Flexible">Flexible</option>
                    </Select>
                  </Field>
                  <Field label="Willing to Travel for Work?">
                    <Select value={form.willingToTravel} onChange={(v) => set("willingToTravel", v)} placeholder="Select...">
                      <option value="No travel">No travel</option>
                      <option value="Local only (within 30 miles)">Local only (within 30 miles)</option>
                      <option value="Regional (within Iowa)">Regional (within Iowa)</option>
                      <option value="Any – willing to travel as needed">Any – willing to travel as needed</option>
                    </Select>
                  </Field>
                </div>
              </SECTION>

              {/* 8. Background */}
              <SECTION title="8. Background Information">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A criminal record does not automatically disqualify you from employment. Each case is evaluated individually based on the nature of the offense, how long ago it occurred, and its relevance to the position.
                </p>
                <Field label="Have you ever been convicted of a felony or misdemeanor (excluding expunged records)?" required>
                  <Select required value={form.convictionRecord} onChange={(v) => set("convictionRecord", v)} placeholder="Select...">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </Field>
                {form.convictionRecord === "Yes" && (
                  <Field label="Please describe the offense(s), date(s), and outcome(s)">
                    <Textarea
                      rows={3}
                      value={form.convictionDetails}
                      onChange={(e) => set("convictionDetails", e.target.value)}
                      placeholder="Please provide details..."
                    />
                  </Field>
                )}
              </SECTION>

              {/* 9. Military */}
              <SECTION title="9. Military Service">
                <Field label="Have you served in the U.S. Armed Forces?">
                  <Select value={form.militaryService} onChange={(v) => set("militaryService", v)} placeholder="Select...">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Currently Serving / Reserve">Currently Serving / Reserve</option>
                  </Select>
                </Field>
                {(form.militaryService === "Yes" || form.militaryService === "Currently Serving / Reserve") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Branch of Service"><Input value={form.militaryBranch} onChange={(e) => set("militaryBranch", e.target.value)} placeholder="e.g. U.S. Army" /></Field>
                    <Field label="Dates of Service"><Input value={form.militaryDates} onChange={(e) => set("militaryDates", e.target.value)} placeholder="e.g. 2010–2014" /></Field>
                    <Field label="Rank at Discharge / Current Rank"><Input value={form.militaryRank} onChange={(e) => set("militaryRank", e.target.value)} placeholder="e.g. Staff Sergeant (E-6)" /></Field>
                    <Field label="Honorable Discharge?">
                      <Select value={form.honorableDischarge} onChange={(v) => set("honorableDischarge", v)} placeholder="Select...">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Other Than Honorable">Other Than Honorable</option>
                        <option value="N/A – Still Serving">N/A – Still Serving</option>
                      </Select>
                    </Field>
                  </div>
                )}
              </SECTION>

              {/* 10. References */}
              <SECTION title="10. Professional References">
                <p className="text-xs text-muted-foreground">Please list two professional references (not family members).</p>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider pt-1">Reference 1</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Full Name"><Input value={form.ref1Name} onChange={(e) => set("ref1Name", e.target.value)} placeholder="Name" /></Field>
                  <Field label="Relationship"><Input value={form.ref1Relation} onChange={(e) => set("ref1Relation", e.target.value)} placeholder="e.g. Former Supervisor" /></Field>
                  <Field label="Phone Number"><Input type="tel" value={form.ref1Phone} onChange={(e) => set("ref1Phone", e.target.value)} placeholder="(515) 000-0000" /></Field>
                </div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider pt-1">Reference 2</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Full Name"><Input value={form.ref2Name} onChange={(e) => set("ref2Name", e.target.value)} placeholder="Name" /></Field>
                  <Field label="Relationship"><Input value={form.ref2Relation} onChange={(e) => set("ref2Relation", e.target.value)} placeholder="e.g. Coworker" /></Field>
                  <Field label="Phone Number"><Input type="tel" value={form.ref2Phone} onChange={(e) => set("ref2Phone", e.target.value)} placeholder="(515) 000-0000" /></Field>
                </div>
              </SECTION>

              {/* 11. EEO - Voluntary */}
              <SECTION title="11. Equal Employment Opportunity (Voluntary)">
                <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground leading-relaxed mb-4">
                  Iowa Structure Cabling Solution LLC is an equal opportunity employer. The following information is requested for government reporting purposes only and is completely voluntary. This information will not be used in any employment decision and will be kept separate from your application.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Gender (Voluntary)">
                    <Select value={form.gender} onChange={(v) => set("gender", v)} placeholder="Prefer not to answer">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary / Third gender">Non-binary / Third gender</option>
                      <option value="Prefer to self-describe">Prefer to self-describe</option>
                      <option value="Prefer not to answer">Prefer not to answer</option>
                    </Select>
                  </Field>
                  <Field label="Race / Ethnicity (Voluntary)">
                    <Select value={form.race} onChange={(v) => set("race", v)} placeholder="Prefer not to answer">
                      <option value="Hispanic or Latino">Hispanic or Latino</option>
                      <option value="White (Not Hispanic or Latino)">White (Not Hispanic or Latino)</option>
                      <option value="Black or African American">Black or African American</option>
                      <option value="Asian">Asian</option>
                      <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                      <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                      <option value="Two or More Races">Two or More Races</option>
                      <option value="Prefer not to answer">Prefer not to answer</option>
                    </Select>
                  </Field>
                  <Field label="Veteran Status (Voluntary)">
                    <Select value={form.veteranStatus} onChange={(v) => set("veteranStatus", v)} placeholder="Prefer not to answer">
                      <option value="Not a Veteran">Not a Veteran</option>
                      <option value="Veteran">Veteran</option>
                      <option value="Recently Separated Veteran">Recently Separated Veteran</option>
                      <option value="Armed Forces Service Medal Veteran">Armed Forces Service Medal Veteran</option>
                      <option value="Disabled Veteran">Disabled Veteran</option>
                      <option value="Prefer not to answer">Prefer not to answer</option>
                    </Select>
                  </Field>
                  <Field label="Disability Status (Voluntary)">
                    <Select value={form.disabilityStatus} onChange={(v) => set("disabilityStatus", v)} placeholder="Prefer not to answer">
                      <option value="No, I don't have a disability">No, I don't have a disability</option>
                      <option value="Yes, I have a disability">Yes, I have a disability</option>
                      <option value="I don't wish to answer">I don't wish to answer</option>
                    </Select>
                  </Field>
                </div>
              </SECTION>

              {/* 12. Additional */}
              <SECTION title="12. Additional Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="How did you hear about this position?">
                    <Select value={form.hearAboutUs} onChange={(v) => set("hearAboutUs", v)} placeholder="Select...">
                      <option value="Company Website">Company Website</option>
                      <option value="Indeed">Indeed</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook / Social Media">Facebook / Social Media</option>
                      <option value="Employee Referral">Employee Referral</option>
                      <option value="Word of Mouth">Word of Mouth</option>
                      <option value="Job Fair">Job Fair</option>
                      <option value="Other">Other</option>
                    </Select>
                  </Field>
                </div>
                <Field label="Anything else you'd like us to know about you?">
                  <Textarea
                    rows={3}
                    value={form.additionalInfo}
                    onChange={(e) => set("additionalInfo", e.target.value)}
                    placeholder="Additional skills, context, or information..."
                  />
                </Field>
              </SECTION>

              {/* 13. Resume Upload */}
              <SECTION title="13. Resume / Attachments">
                <label className="flex items-center gap-3 border border-dashed border-border rounded-lg px-4 py-4 cursor-pointer hover:border-primary/40 transition-colors">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{resume ? resume.name : "Upload Resume (optional)"}</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX accepted</p>
                  </div>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setResume(e.target.files[0])} />
                </label>
              </SECTION>

              {/* 14. Signature */}
              <SECTION title="14. Applicant Certification & Signature">
                <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground leading-relaxed">
                  I certify that the information provided in this application is true and complete to the best of my knowledge. I understand that any misrepresentation or omission of facts may result in disqualification from consideration or, if hired, termination of employment. I authorize Iowa Structure Cabling Solution LLC to contact my references and prior employers to verify the information provided.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name (Electronic Signature)" required>
                    <Input required value={form.signature} onChange={(e) => set("signature", e.target.value)} placeholder="Type your full legal name" />
                  </Field>
                  <Field label="Date" required>
                    <Input required type="date" value={form.signatureDate} onChange={(e) => set("signatureDate", e.target.value)} />
                  </Field>
                </div>
              </SECTION>

              <Button type="submit" disabled={loading} className="w-full font-heading font-semibold gap-2 h-12 text-base" size="lg">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {loading ? "Submitting Application..." : "Submit Application"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Applications are reviewed within 2–3 business days. Qualified candidates will be contacted directly to schedule an interview.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}