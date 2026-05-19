import { LOCATIONS, PHONE, PHONE_HREF, BUSINESS_NAME } from "./Brand";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="lg:col-span-2">
            <Logo className="h-10" inverse />
            <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-sm">
              Board-certified foot and ankle specialists serving Greater Richmond.
              Same-day appointments available for new and existing patients.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-4 inline-block text-white font-bold text-lg hover:underline"
            >
              {PHONE}
            </a>
          </div>
          {LOCATIONS.map((loc) => (
            <div key={loc.name} className="text-sm leading-relaxed">
              <div className="text-xs font-bold tracking-widest uppercase text-white/55 mb-2">
                {loc.name}
              </div>
              <div className="text-white/85 font-medium">{loc.line1}</div>
              <div className="text-white/75">{loc.line2}</div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(loc.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-white/85 hover:underline"
              >
                Get directions &rarr;
              </a>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="text-white/55">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </div>
          <div className="text-white/45 max-w-2xl sm:text-right">
            The information on this page is for educational purposes only and is not a substitute
            for professional medical advice, diagnosis or treatment.
          </div>
        </div>
      </div>
    </footer>
  );
}
