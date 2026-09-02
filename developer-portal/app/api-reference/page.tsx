import SwaggerUIClient from './SwaggerUIClient';

export default function ApiReferencePage() {
  return (
    <div>
      <h1 style={{ padding: '20px', fontSize: '24px', fontWeight: 'bold' }}>
        API Reference
      </h1>
      <SwaggerUIClient />
    </div>
  );
}