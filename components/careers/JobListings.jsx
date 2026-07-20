import { MapPin, Briefcase, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JOBS } from "./jobsData";

const LEVEL_COLORS = {
  "Entry Level": "bg-green-100 text-green-700",
  "Entry / Mid": "bg-blue-100 text-blue-700",
  "Mid": "bg-blue-100 text-blue-700",
  "Mid / Senior": "bg-purple-100 text-purple-700",
  "Senior": "bg-orange-100 text-orange-700",
};

export default function JobListings({ selectedJob, onSelectJob }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <section className="py-16 md:py-24" id="open-positions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">
            Open Positions
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl">Current Job Openings</h2>
          <p className="text-muted-foreground mt-3 text-sm md:text-base max-w-xl mx-auto">
            Click any position to see full details, then hit Apply to submit your application.
          </p>
        </div>

        <div className="space-y-4">
          {JOBS.map((job) => {
            const isOpen = expandedId === job.id;
            return (
              <div
                key={job.id}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-primary/40 shadow-md" : "border-border bg-card hover:border-primary/20"}`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggle(job.id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-heading font-bold text-base md:text-lg">{job.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[job.level] || "bg-muted text-muted-foreground"}`}>
                        {job.level}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{job.pay}</span>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-primary shrink-0 mt-1" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />}
                </button>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="px-5 pb-6 border-t border-border pt-5 space-y-5">
                    <p className="text-muted-foreground text-sm leading-relaxed">{job.summary}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-2">Responsibilities</h4>
                        <ul className="space-y-1.5">
                          {job.responsibilities.map((r) => (
                            <li key={r} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-2">Requirements</h4>
                        <ul className="space-y-1.5">
                          {job.requirements.map((r) => (
                            <li key={r} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button
                      onClick={() => onSelectJob(job)}
                      className="font-heading font-semibold gap-2"
                    >
                      Apply for This Position
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}