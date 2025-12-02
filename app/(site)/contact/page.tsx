import { SectionIntro } from "@/components/ui/SectionIntro";
import { Card } from "@/components/ui/Card";
import { ServiceEnquiryForm } from "@/components/forms/ServiceEnquiryForm";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#fbe9e9] to-[#eef6ed] py-16">
        <div className="mx-auto max-w-4xl space-y-4 px-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-burgundy)]">
            Contact
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">Let’s build together.</h1>
          <p className="text-base text-slate-600">
            Share your requirement or proposal. We respond within two working days with next steps
            and a dedicated point of contact.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl gap-10 px-4 py-16 md:grid md:grid-cols-[1.2fr,1fr]">
        <div>
          <SectionIntro
            eyebrow="Business Enquiry"
            title="Send us a note"
            description="Use the form or email padmavathiconstructions18@gmail.com"
            align="left"
          />
          <div className="mt-6">
            <ServiceEnquiryForm />
          </div>
        </div>
        <div className="mt-12 space-y-6 md:mt-0">
          <Card>
            <h3 className="text-xl font-semibold text-slate-900">Visit us</h3>
            <p className="mt-2 text-sm text-slate-600">
              2-10-879/10 S.S Residency
              <br />
              Jyothinagar Karimnagar
            </p>
            <p className="mt-4 text-sm text-slate-600">
              India: +91 83743 66153
              <br />
              USA: +1 209-453-1730
              <br />
              Email: padmavathiconstructions18@gmail.com
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-slate-900">Operating hours</h3>
            <p className="mt-2 text-sm text-slate-600">
              Monday – Saturday: 9:30 AM to 7:00 PM IST
              <br />
              Sunday: Command center support only
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Staff parking and meeting rooms available. Please book 24 hours in advance for site
              reviews.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-slate-900">Quick connect</h3>
            <p className="mt-2 text-sm text-slate-600">
              WhatsApp: +91 90000 12345
              <br />
              Vendor desk: vendors@padmavathi.co
              <br />
              Careers: talent@padmavathi.co
            </p>
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-slate-900">Scan to chat</p>
              <img src="/qrcode.jpg" alt="WhatsApp QR Code" className="h-32 w-32 rounded-lg border border-slate-200" />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
