import { useState } from "react";
import CareersHero from "../components/careers/CareersHero";
import JobListings from "../components/careers/JobListings";
import ApplicationForm from "../components/careers/ApplicationForm";
import WhyWorkWithUs from "../components/careers/WhyWorkWithUs";
import usePageSEO from "../hooks/usePageSEO";
import CTABanner from "../components/CTABanner";
import JobAlerts from "../components/careers/JobAlerts";

export default function Careers() {
  usePageSEO({
    title: "Careers | Join Iowa Structure Cabling Solution LLC — Cabling Technician Jobs Iowa",
    description: "Looking for cabling technician jobs in Iowa? Join Iowa Structure Cabling Solution LLC. We hire experienced low-voltage technicians and cabling installers across Iowa.",
    keywords: "cabling technician jobs Iowa, low-voltage technician Iowa, structured cabling jobs Iowa, network installer Iowa, Des Moines cabling career",
  });
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
      <CareersHero />
      <WhyWorkWithUs />
      <JobListings selectedJob={selectedJob} onSelectJob={setSelectedJob} />
      {selectedJob && (
        <ApplicationForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
      <JobAlerts />
      <CTABanner
        title="Don't See the Right Fit?"
        subtitle="We're always looking for talented people. Send us your resume and we'll keep you in mind for future openings."
        primaryText="Submit General Application"
        primaryLink="#open-application"
        showPhone={true}
      />
    </>
  );
}