import { Phone, MessageCircle, Mail, MapPin, ArrowUpRight, Info } from "lucide-react";
import { CONTACT_DETAILS } from "@/lib/data/contact";

/**
 * Builds the list of contact methods from CONTACT_DETAILS. A method only
 * exists if its detail is configured — nothing is ever invented here.
 */
function getContactMethods(details) {
  const methods = [];

  if (details.phone) {
    methods.push({
      key: "phone",
      icon: Phone,
      label: "Phone",
      value: details.phone,
      action: "Call the store",
      href: `tel:${details.phone.replace(/[^\d+]/g, "")}`,
    });
  }

  if (details.whatsapp) {
    methods.push({
      key: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      value: details.whatsapp,
      action: "Chat on WhatsApp",
      href: `https://wa.me/${details.whatsapp.replace(/\D/g, "")}`,
      external: true,
    });
  }

  if (details.email) {
    methods.push({
      key: "email",
      icon: Mail,
      label: "Email",
      value: details.email,
      action: "Send an email",
      href: `mailto:${details.email}`,
    });
  }

  if (details.address) {
    methods.push({
      key: "visit",
      icon: MapPin,
      label: "Visit the store",
      value: details.address,
      note: details.hours,
    });
  }

  return methods;
}

const CARD_BASE =
  "flex h-full flex-col gap-4 rounded-2xl border border-[#bfcaba]/50 bg-white p-5 shadow-[0_4px_20px_rgba(45,66,50,0.05)] transition-all duration-200 ease-out motion-reduce:transition-none";

function ContactCard({ method }) {
  const Icon = method.icon;

  const content = (
    <>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ebf7ea] text-[#1c6d24]">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4e6452]">
          {method.label}
        </p>
      </div>

      <div className="min-w-0">
        <p className="whitespace-pre-line break-words text-base font-semibold text-[#1a1c19]">
          {method.value}
        </p>
        {method.note && (
          <p className="mt-1.5 whitespace-pre-line text-sm text-[#40493d]">
            {method.note}
          </p>
        )}
      </div>

      {method.href && (
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#1c6d24]">
          {method.action}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          {method.external && <span className="sr-only"> (opens in a new tab)</span>}
        </span>
      )}
    </>
  );

  if (!method.href) {
    return <div className={CARD_BASE}>{content}</div>;
  }

  return (
    <a
      href={method.href}
      {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${CARD_BASE} hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(45,66,50,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c6d24]/50 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0`}
    >
      {content}
    </a>
  );
}

/**
 * ContactOptions
 * Server component. Renders a card per configured contact method; if the
 * store hasn't confirmed any details yet, shows one neutral notice rather
 * than empty or fake cards.
 */
export default function ContactOptions() {
  const methods = getContactMethods(CONTACT_DETAILS);

  if (methods.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl items-start gap-3 rounded-2xl border border-dashed border-[#bfcaba] bg-white/60 p-5 text-left">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#1c6d24]" aria-hidden="true" />
        <p className="text-sm leading-6 text-[#40493d]">
          Direct contact details for Gupta General Store will appear here once
          they are confirmed.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
      {methods.map((method) => (
        <li key={method.key}>
          <ContactCard method={method} />
        </li>
      ))}
    </ul>
  );
}