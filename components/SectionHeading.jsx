export default function SectionHeading({ label, title, description, align = "center", light = false }) {
  return (
    <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : "text-left"} max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
      {label && (
        <span className={`inline-block text-xs font-heading font-semibold uppercase tracking-widest mb-3 ${light ? "text-primary/80" : "text-primary"}`}>
          {label}
        </span>
      )}
      <h2 className={`font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4 ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed ${light ? "text-white/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}