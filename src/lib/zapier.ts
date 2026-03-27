const ZAPIER_QUOTE_WEBHOOK = process.env.ZAPIER_QUOTE_WEBHOOK_URL;
const ZAPIER_CONTACT_WEBHOOK = process.env.ZAPIER_CONTACT_WEBHOOK_URL;

export async function sendToZapierQuote(payload: Record<string, unknown>) {
  if (!ZAPIER_QUOTE_WEBHOOK) {
    console.warn("ZAPIER_QUOTE_WEBHOOK_URL not set — skipping webhook");
    return;
  }

  const response = await fetch(ZAPIER_QUOTE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Zapier quote webhook failed: ${response.status}`);
  }
}

export async function sendToZapierContact(payload: Record<string, unknown>) {
  if (!ZAPIER_CONTACT_WEBHOOK) {
    console.warn("ZAPIER_CONTACT_WEBHOOK_URL not set — skipping webhook");
    return;
  }

  const response = await fetch(ZAPIER_CONTACT_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Zapier contact webhook failed: ${response.status}`);
  }
}
