export function ThreadsLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      aria-label="Threads"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      {/* Simplified Threads @ symbol design that renders well at small sizes */}
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="white" strokeWidth="1" />
    </svg>
  );
}
