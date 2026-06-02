import { PageNav } from '@/components/organisms/PageNav';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with GovernAI for AI governance capacity building, compliance auditing, and policy advisory. We respond within one business day.',
  openGraph: {
    title: 'Contact GovernAI',
    description:
      'Partner with GovernAI to deploy AI with absolute compliance and zero bias. Reach our team today.',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageNav />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
