import SectionHeading from "@/components/Helper/SectionHeading";
import { Mail, MapPin, Phone, Clock, MessageCircle, Heart } from "lucide-react";

const contactDetails = [
  {
    title: "Visit Us",
    icon: MapPin,
    lines: ["CITAM Kisumu Church", "P.O. Box 19060 – 40100", "Kisumu, Kenya"],
  },
  {
    title: "Call",
    icon: Phone,
    lines: ["+254 713 348 463", "+254 709 861 370"],
  },
  {
    title: "Email",
    icon: Mail,
    lines: ["citamkisumu@citam.org"],
  },
];

const serviceTimes = [
  { day: "Sunday", time: "8:30 AM & 11:00 AM" },
  { day: "Wednesday -(Midweek Service)", time:  "5:30 PM to 7:00 PM" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="bg-gradient-to-b from-[#0a0505] via-[#180808] to-[#060303] text-white py-24">
      <div className="w-[90%] lg:w-[80%] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-red-300">Reach Out</p>
          <SectionHeading heading="We'd Love to Connect" />
          <p className="mt-4 text-gray-300">
            Reach out for prayer, counseling, ministry partnerships, or directions to the sanctuary.
          </p>
        </div>

        {/* Main grid: Left (contact + form) | Right (map + social + support) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-10">
          {/* Left column - Contact info & Form */}
          <div className="bg-gradient-to-br from-[#2b0a0f]/90 to-[#601324]/60 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Contact details */}
            <div className="grid md:grid-cols-2 gap-6 p-8 border-b border-white/10">
              {contactDetails.map(({ title, icon: Icon, lines }) => (
                <div key={title} className="bg-white/5 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-white/10">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <ul className="space-y-1 text-gray-200 text-sm">
                    {lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Service times + Message form */}
            <div className="flex flex-col md:flex-row gap-6 p-8">
              {/* Service Times */}
              <div className="bg-black/40 rounded-2xl p-5 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                  <p className="font-semibold">Service Times</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-200">
                  {serviceTimes.map(({ day, time }) => (
                    <li key={day} className="flex justify-between">
                      <span>{day}</span>
                      <span className="font-semibold text-white">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Message Form */}
              <div className="bg-black/40 rounded-2xl p-5 flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <p className="font-semibold">Send a Message</p>
                </div>
                <form className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <textarea
                    name="message"
                    placeholder="How can we pray for you?"
                    rows={4}
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-red-600 text-white font-semibold py-3 shadow-lg shadow-red-900/40 hover:bg-red-500 transition transform hover:-translate-y-0.5"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right column - Map + Social + Support box */}
          <div className="space-y-6">
            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                title="CITAM Kisumu Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.689937876259!2d34.752!3d-0.091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa9553dc0bdf9%3A0xe06b7bdcd4e63564!2sCITAM%20Kisumu!5e0!3m2!1sen!2ske!4v1730000000000!5m2!1sen!2ske" // Updated placeholder timestamp; replace with real embed if needed
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Stay Connected */}
            <div className="rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Stay Connected</p>
              <h4 className="text-2xl font-semibold mt-2">Follow @citamkisumu</h4>
              <p className="mt-3 text-gray-300">
                Receive devotion reminders, service highlights, and ministry updates on our social platforms.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { label: "Facebook", href: "https://facebook.com/citamkisumu" }, // ← update real links
                  { label: "Instagram", href: "https://instagram.com/citamkisumu" },
                  { label: "YouTube", href: "https://youtube.com/@citamkisumu" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Small support box - bottom right aligned */}
            <div className="rounded-3xl border border-white/10 p-5 bg-white/5 backdrop-blur text-sm text-gray-200">
              <p className="italic text-gray-300">
                This website has been built with love and dedication. If you would like to support my work, please provide me with a task or support me through
              </p>
              <div className="mt-3 flex items-center justify-end gap-2">
                <Heart className="w-4 h-4 text-red-400" aria-hidden="true" />
                <a
                  href="tel:+254715293537"
                  className="text-red-400 font-semibold hover:underline"
                >
                  +254715293537
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;