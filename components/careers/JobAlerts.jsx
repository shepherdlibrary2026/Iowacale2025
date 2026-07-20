import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, CheckCircle, Loader2 } from "lucide-react";

export default function JobAlerts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await base44.entities.Subscriber.create({ email, name, source: "Careers Page" });
    setLoading(false);
    setSuccess(true);
  };

  return (
    <section className="py-14 bg-primary/5 border-t border-border">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Bell className="w-6 h-6 text-primary" />
        </div>
        <h2 className="font-heading font-bold text-xl md:text-2xl mb-2">Get Job Alerts</h2>
        <p className="text-sm text-muted-foreground mb-6">
          No openings that fit right now? Sign up and we'll email you when new positions become available.
        </p>

        {success ? (
          <div className="flex flex-col items-center gap-2 text-green-600">
            <CheckCircle className="w-8 h-8" />
            <p className="font-medium text-sm">You're signed up! We'll be in touch when new roles open.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading} className="font-heading font-semibold shrink-0">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Notify Me"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}