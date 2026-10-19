/**
 * Store contact details shown on the /contact page.
 *
 * Every value is null on purpose: no confirmed business details exist in
 * the project yet, and the Contact page must not display invented ones.
 *
 * Fill in ONLY details that Gupta General Store has confirmed. Each
 * filled-in field automatically switches on its matching card on
 * /contact; a null field renders nothing at all (no placeholder, no
 * dead link). If every field is null, the page shows a single neutral
 * "details coming soon" notice instead.
 */
export const CONTACT_DETAILS = {
  // Shown as written and used for the tel: link, e.g. "+91 12345 67890"
  phone: null,

  // Shown as written. The wa.me link is built from its digits, so
  // include the country code, e.g. "+91 12345 67890"
  whatsapp: null,

  // e.g. "store@example.com"
  email: null,

  // Plain text. Use \n for line breaks.
  address: null,

  // Optional free text shown under the address, e.g. "Mon-Sat, 9 am - 8 pm".
  // Only shown when an address is also set.
  hours: null,
};