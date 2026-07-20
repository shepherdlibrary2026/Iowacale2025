import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import usePageSEO from "../hooks/usePageSEO";
import ReactMarkdown from "react-markdown";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, BookOpen } from "lucide-react";
import CTABanner from "../components/CTABanner";

const CATEGORY_COLORS = {
  "Industry Trends": "bg-blue-50 text-blue-700 border-blue-200",
  "How-To Guides": "bg-green-50 text-green-700 border-green-200",
  "Company News": "bg-purple-50 text-purple-700 border-purple-200",
  "Technical Tips": "bg-orange-50 text-orange-700 border-orange-200",
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    base44.entities.BlogPost.filter({ slug, published: true })
      .then((results) => {
        if (!results || results.length === 0) {
          setNotFound(true);
        } else {
          const p = results[0];
          setPost(p);
          // fetch related
          if (p.category) {
            base44.entities.BlogPost.filter({ published: true, category: p.category }, "-published_date", 4)
              .then((rel) => setRelated(rel.filter((r) => r.id !== p.id).slice(0, 3)));
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  usePageSEO(
    post
      ? {
          title: `${post.title} | Iowa Structure Cabling Blog`,
          description: post.meta_description || post.excerpt,
          keywords: post.tags?.join(", ") || "Iowa structured cabling, low-voltage contractor Iowa",
        }
      : {}
  );

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-64 bg-muted rounded-2xl" />
          <div className="space-y-2">
            {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-muted rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-heading font-bold text-2xl mb-2">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">This article may have been moved or doesn't exist.</p>
        <Link to="/blog" className="text-primary font-semibold hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary pt-32 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {post.category && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || "bg-white/10 text-white border-white/20"}`}>
                {post.category}
              </span>
            )}
            {post.read_time && (
              <span className="flex items-center gap-1 text-xs text-white/50">
                <Clock className="w-3 h-3" /> {post.read_time}
              </span>
            )}
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>{post.author || "Iowa Structure Cabling Team"}</span>
            {post.published_date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.published_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-0">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img src={post.cover_image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-slate prose-lg max-w-none
            prose-headings:font-heading prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-li:text-foreground/80
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border flex items-center gap-3 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author box */}
          <div className="mt-10 p-6 bg-muted/50 rounded-2xl border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Written by</p>
            <p className="font-heading font-semibold text-base">{post.author || "Iowa Structure Cabling Team"}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Iowa Structure Cabling Solution LLC — licensed & insured commercial low-voltage contractors serving Iowa businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading font-bold text-xl mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-primary/20 hover:shadow-md transition-all"
                >
                  <span className="text-xs text-muted-foreground">{r.category}</span>
                  <h3 className="font-heading font-semibold text-base mt-1 mb-2 group-hover:text-primary transition-colors leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{r.excerpt}</p>
                  <span className="text-xs font-semibold text-primary mt-3 inline-flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title="Have a Cabling Project in Mind?"
        subtitle="Get a free estimate from Iowa's trusted low-voltage contractor."
      />
    </>
  );
}