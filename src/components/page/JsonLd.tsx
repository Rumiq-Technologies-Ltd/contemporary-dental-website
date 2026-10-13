// Structured data is a non-executable JSON block, so the script CSP does not apply to it.
// "<" is escaped so content can never close the script element.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }} />;
}
