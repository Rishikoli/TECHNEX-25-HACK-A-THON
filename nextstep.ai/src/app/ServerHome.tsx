import Hero from '@/components/Hero';
import { Features } from '@/components/Features';
// import { CTA } from '@/components/CTA';

export default function ServerHome() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      {/* <CTA /> */}
    </main>
  );
}
