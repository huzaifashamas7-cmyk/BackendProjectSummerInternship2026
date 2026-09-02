export default function WebhooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="prose max-w-3xl mx-auto p-10">
      {children}
    </div>
  );
}