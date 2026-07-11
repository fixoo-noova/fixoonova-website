import emailjs from "@emailjs/browser";

export const FORM_SOURCES = {
  homePopup: "Home Popup",
  homeVideoBooking: "Home Video Booking",
  homeContact: "Home Contact",
  contactPage: "Contact Page",
  servicesPopup: "Services Popup",
  servicesInquiry: "Services Inquiry",
  maintenancePlan: "Maintenance Plan",
} as const;

export type FormSource = (typeof FORM_SOURCES)[keyof typeof FORM_SOURCES];

export type EmailTemplateKind = "general" | "maintenance";

export const ANNUAL_MAINTENANCE_SERVICE = "Annual Maintenance Plan";

export type ContactFormPayload = {
  form_source: FormSource;
  from_name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  property_type: string;
  plan: string;
  reply_to: string;
};

const FIELD_KEYS = {
  name: ["from_name", "name", "popup-name", "video-name", "home-name"],
  phone: ["phone", "popup-phone", "video-phone", "home-phone"],
  email: ["email", "popup-email", "video-email", "home-email"],
  service: ["service", "popup-service", "video-service", "home-service"],
  message: ["message", "popup-message", "video-message", "home-message"],
  property_type: ["property-type", "property_type"],
  plan: ["plan", "preferred-plan"],
} as const;

function readFormValue(formData: FormData, keys: readonly string[]): string {
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) return trimmed;
    }
  }
  return "";
}

function withFallback(value: string, fallback = "Not provided"): string {
  return value.trim() || fallback;
}

export function parseContactForm(
  form: HTMLFormElement,
  formSource: FormSource,
): ContactFormPayload {
  const formData = new FormData(form);

  const from_name = readFormValue(formData, FIELD_KEYS.name);
  const phone = readFormValue(formData, FIELD_KEYS.phone);
  const email = readFormValue(formData, FIELD_KEYS.email);
  const service = readFormValue(formData, FIELD_KEYS.service);
  const message = readFormValue(formData, FIELD_KEYS.message);
  const property_type = readFormValue(formData, FIELD_KEYS.property_type);
  const plan = readFormValue(formData, FIELD_KEYS.plan);

  const resolvedService =
    service ||
    (formSource === FORM_SOURCES.maintenancePlan ? ANNUAL_MAINTENANCE_SERVICE : "");

  return {
    form_source: formSource,
    from_name,
    phone,
    email,
    service: resolvedService,
    message,
    property_type,
    plan,
    reply_to: email || "info@fixoonova.ae",
  };
}

export function getEmailTemplateKind(payload: ContactFormPayload): EmailTemplateKind {
  if (payload.form_source === FORM_SOURCES.maintenancePlan) {
    return "maintenance";
  }

  if (payload.service === ANNUAL_MAINTENANCE_SERVICE) {
    return "maintenance";
  }

  return "general";
}

type RequiredField = keyof Pick<
  ContactFormPayload,
  "from_name" | "phone" | "email" | "service" | "message" | "property_type" | "plan"
>;

const REQUIRED_FIELDS: Record<FormSource, RequiredField[]> = {
  [FORM_SOURCES.homePopup]: ["from_name", "phone", "service", "message"],
  [FORM_SOURCES.homeVideoBooking]: ["from_name", "phone", "email", "service", "message"],
  [FORM_SOURCES.homeContact]: ["from_name", "phone", "email", "service", "message"],
  [FORM_SOURCES.contactPage]: ["from_name", "phone", "email", "message"],
  [FORM_SOURCES.servicesPopup]: ["from_name", "phone", "email", "service", "message"],
  [FORM_SOURCES.servicesInquiry]: ["from_name", "phone", "email", "service", "message"],
  [FORM_SOURCES.maintenancePlan]: ["from_name", "phone", "email", "property_type", "plan"],
};

const FIELD_LABELS: Record<RequiredField, string> = {
  from_name: "Name",
  phone: "Phone",
  email: "Email",
  service: "Service",
  message: "Message",
  property_type: "Property type",
  plan: "Preferred plan",
};

export function validateContactForm(payload: ContactFormPayload, formSource: FormSource): void {
  const missing = REQUIRED_FIELDS[formSource].filter((field) => !payload[field]?.trim());

  if (missing.length > 0) {
    const labels = missing.map((field) => FIELD_LABELS[field]).join(", ");
    throw new Error(`Please fill in all required fields: ${labels}.`);
  }
}

function getEmailJsConfig(templateKind: EmailTemplateKind) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const templateId =
    templateKind === "maintenance"
      ? import.meta.env.VITE_EMAILJS_TEMPLATE_ID_MAINTENANCE
      : import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !publicKey) {
    throw new Error(
      "Email service is not configured yet. Please call us directly at +971 50 800 1238.",
    );
  }

  if (!templateId) {
    const templateLabel =
      templateKind === "maintenance" ? "maintenance plan template" : "general enquiry template";
    throw new Error(
      `Email ${templateLabel} is not configured yet. Please call us directly at +971 50 800 1238.`,
    );
  }

  return { serviceId, templateId, publicKey };
}

function formatSubmissionTime(): string {
  return new Intl.DateTimeFormat("en-AE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dubai",
  }).format(new Date());
}

function buildTemplateParams(payload: ContactFormPayload) {
  const name = withFallback(payload.from_name);

  return {
    name,
    from_name: name,
    time: formatSubmissionTime(),
    form_source: payload.form_source,
    phone: withFallback(payload.phone),
    email: withFallback(payload.email),
    service: withFallback(payload.service),
    message: withFallback(payload.message, "No message provided"),
    property_type: withFallback(payload.property_type),
    plan: withFallback(payload.plan),
    reply_to: payload.reply_to,
  };
}

export async function sendContactForm(payload: ContactFormPayload): Promise<void> {
  const templateKind = getEmailTemplateKind(payload);
  const { serviceId, templateId, publicKey } = getEmailJsConfig(templateKind);
  const templateParams = buildTemplateParams(payload);

  await emailjs.send(serviceId, templateId, templateParams, { publicKey });
}

export async function submitContactForm(
  form: HTMLFormElement,
  formSource: FormSource,
): Promise<void> {
  const payload = parseContactForm(form, formSource);
  validateContactForm(payload, formSource);
  await sendContactForm(payload);
}
