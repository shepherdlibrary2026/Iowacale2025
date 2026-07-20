import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import usePageSEO from "../hooks/usePageSEO";
import { Calendar, Clock, Tag, ArrowRight, BookOpen } from "lucide-react";
import CTABanner from "../components/CTABanner";

const CATEGORY_COLORS = {
  "Industry Trends": "bg-blue-50 text-blue-700 border-blue-200",
  "How-To Guides": "bg-green-50 text-green-700 border-green-200",
  "Company News": "bg-purple-50 text-purple-700 border-purple-200",
  "Technical Tips": "bg-orange-50 text-orange-700 border-orange-200",
};

const CATEGORIES = ["All", "Industry Trends", "How-To Guides", "Company News", "Technical Tips"];

export default function Blog() {
  usePageSEO({
    title: "Blog | Iowa Structured Cabling Insights & Low-Voltage Tips",
    description: "Expert articles on structured cabling, CAT6A, fiber optic installations, network closet planning, and low-voltage best practices for Iowa businesses.",
    keywords: "Iowa structured cabling blog, CAT6A benefits, low-voltage contractor tips, fiber optic Iowa, network cabling guide, office cabling Iowa",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-published_date", 50)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-primary mb-3">Resources</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Cabling Insights & Guides
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Expert articles on structured cabling, network infrastructure, and low-voltage best practices — written for Iowa business owners and IT managers.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border bg-background sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors shrink-0 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-4/5" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">No articles yet</h3>
              <p className="text-muted-foreground text-sm">Check back soon — we're working on new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
                >
                  {post.cover_image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-white/30" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {post.category && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || "bg-muted text-muted-foreground border-border"}`}>
                          {post.category}
                        </span>
                      )}
                      {post.read_time && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" /> {post.read_time}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {post.published_date ? new Date(post.published_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                      </div>
                      <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Need Help Planning Your Cabling Project?"
        subtitle="Our experts are ready to answer your questions and provide a free estimate."
      />
    </>
  );
}