// src/components/seo/JsonLd.tsx

/**
 * Server component that renders Schema.org JSON-LD structured data.
 * Used by every page to inject machine-readable business data.
 *
 * Usage:
 *   <JsonLd data={organizationSchema} />
 *   <JsonLd data={[schema1, schema2]} />
 */

type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLdData }) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
