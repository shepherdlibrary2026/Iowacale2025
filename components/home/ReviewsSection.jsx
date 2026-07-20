import { useState, useEffect } from "react";
import { Star, Quote, PenLine, X, CheckCircle } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              star <= (hovered || value)
                ? "text-yellow-400 fill-yellow-400"
                : "text-border"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-border"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed italic flex-1">"{review.review}"</p>
      <div>
        <p className="font-heading font-semibold text-sm">{review.name}</p>
        {(review.role || review.company) && (
          <p className="text-xs text-muted-foreground">
            {[review.role, review.company].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

function ReviewForm({ onClose, onSubmitted }) {
  const [form, setForm] = useState({ name: "", company: "", role: "", rating: 0, review: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) { setError("Please select a star rating."); return; }
    if (form.review.trim().length < 10) { setError("Please write a review of at least 10 characters."); return; }
    setError("");
    setLoading(true);
    await base44.entities.Review.create({ ...form, approved: false });
    setLoading(false);
    onSubmitted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h3 className="font-heading font-bold text-xl mb-1">Leave a Review</h3>
        <p className="text-sm text-muted-foreground mb-6">Share your experience with Iowa Structure Cabling Solution.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name *</label>
              <Input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Smith" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Company</label>
              <Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Your Company" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Job Title / Role</label>
            <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="IT Director" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Rating *</label>
            <StarPicker value={form.rating} onChange={(v) => set("rating", v)} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Your Review *</label>
            <textarea
              required
              value={form.review}
              onChange={(e) => set("review", e.target.value)}
              rows={4}
              placeholder="Tell us about your project and experience..."
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full font-heading font-semibold">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    base44.entities.Review.filter({ approved: true }, "-created_date", 50).then(setReviews);
  }, []);

  const handleSubmitted = () => {
    setShowForm(false);
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeading
            label="Customer Reviews"
            title="What Our Clients Say"
            description="Real reviews from Iowa businesses who've worked with our team."
            className="mb-0"
          />
          <div className="shrink-0">
            {submitted ? (
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                <CheckCircle className="w-4 h-4" />
                Thanks! Your review is pending approval.
              </div>
            ) : (
              <Button onClick={() => setShowForm(true)} className="gap-2 font-heading font-semibold">
                <PenLine className="w-4 h-4" />
                Leave a Review
              </Button>
            )}
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Quote className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="font-medium">No reviews yet — be the first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>

      {showForm && <ReviewForm onClose={() => setShowForm(false)} onSubmitted={handleSubmitted} />}
    </section>
  );
}