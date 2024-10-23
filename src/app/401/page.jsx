import Link from 'next/link';

export default function Custom401() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>401 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
