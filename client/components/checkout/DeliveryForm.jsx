import { Banknote, CheckCircle2 } from "lucide-react";

/**
 * validateDeliveryForm
 * Pure validation, colocated with the fields it checks so page.js can
 * call it before submitting without a second copy of field knowledge.
 * Landmark is optional per spec; everything else is required.
 */
export function validateDeliveryForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 3) {
    errors.name = "Name looks too short.";
  }

  const digitsOnly = values.mobile.replace(/\D/g, "");
  if (!values.mobile.trim()) {
    errors.mobile = "Please enter your mobile number.";
  } else if (!/^[6-9]\d{9}$/.test(digitsOnly) || digitsOnly.length > 10) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (!values.address.trim()) {
    errors.address = "Please enter your delivery address.";
  } else if (values.address.trim().length < 10) {
    errors.address = "Please enter a complete delivery address.";
  }

  if (!values.pincode.trim()) {
    errors.pincode = "Please enter your pincode.";
  } else if (!/^[1-9]\d{5}$/.test(values.pincode.trim())) {
    errors.pincode = "Enter a valid 6-digit pincode.";
  }

  return errors;
}

const FIELD_CLASSES =
  "h-11 w-full rounded-xl border border-[#1c6d24]/15 bg-white px-4 text-sm text-[#1a1c19] placeholder:text-[#9aa39a] transition-all duration-200 ease-out focus:border-[#1c6d24]/40 focus:outline-none focus:ring-2 focus:ring-[#1c6d24]/20";

const TEXTAREA_CLASSES =
  "w-full rounded-xl border border-[#1c6d24]/15 bg-white px-4 py-3 text-sm text-[#1a1c19] placeholder:text-[#9aa39a] transition-all duration-200 ease-out focus:border-[#1c6d24]/40 focus:outline-none focus:ring-2 focus:ring-[#1c6d24]/20";

function Field({ label, error, required, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-[#1a1c19]">
        {label}
        {required && <span className="text-[#1c6d24]"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

/**
 * DeliveryForm
 * Controlled delivery/customer form. Values, errors and change handling
 * all live in the parent (CheckoutPage) since the order payload needs
 * the same data on submit — this component just renders inputs.
 */
export default function DeliveryForm({ values, errors, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            className={FIELD_CLASSES}
          />
        </Field>

        <Field label="Mobile Number" required error={errors.mobile}>
          <div
            className={`flex h-11 items-center overflow-hidden rounded-xl border border-[#1c6d24]/15 bg-white transition-all duration-200 ease-out focus-within:border-[#1c6d24]/40 focus-within:ring-2 focus-within:ring-[#1c6d24]/20`}
          >
            <span className="flex h-full shrink-0 items-center border-r border-[#1c6d24]/15 px-3 text-sm font-medium text-[#707a6c]">
              +91
            </span>
            <input
              type="tel"
              value={values.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
              placeholder="98765 43210"
              autoComplete="tel"
              inputMode="numeric"
              maxLength={10}
              className="h-full w-full bg-transparent px-3 text-sm text-[#1a1c19] placeholder:text-[#9aa39a] focus:outline-none"
            />
          </div>
        </Field>

        <Field label="Street Address" required error={errors.address} className="sm:col-span-2">
          <textarea
            value={values.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Flat No., Wing, Building Name, Street, Area"
            rows={2}
            className={TEXTAREA_CLASSES}
          />
        </Field>

        <Field label="Landmark (optional)" error={errors.landmark}>
          <input
            type="text"
            value={values.landmark}
            onChange={(e) => onChange("landmark", e.target.value)}
            placeholder="Near Heritage Park"
            className={FIELD_CLASSES}
          />
        </Field>

        <Field label="Pincode" required error={errors.pincode}>
          <input
            type="text"
            value={values.pincode}
            onChange={(e) => onChange("pincode", e.target.value)}
            placeholder="400001"
            inputMode="numeric"
            maxLength={6}
            className={FIELD_CLASSES}
          />
        </Field>

        <Field label="Delivery Notes (optional)" className="sm:col-span-2">
          <textarea
            value={values.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Any instructions for delivery"
            rows={2}
            className={TEXTAREA_CLASSES}
          />
        </Field>
      </div>

      {/* Payment method — fixed, single option */}
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#1c6d24]/15 bg-[#ebf7ea] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1c6d24]">
            <Banknote className="h-4.5 w-4.5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1c19]">Cash on Delivery</p>
            <p className="mt-0.5 text-xs text-[#707a6c]">
              Pay when you receive your order.
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#1c6d24]">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          Active Method
        </span>
      </div>
    </div>
  );
}