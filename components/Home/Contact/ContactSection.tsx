import SectionHeading from "@/components/Helper/SectionHeading";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

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
  { day: "Sunday", time: "7:30 AM & 12:00 PM" },
  { day: "Wednesday", time: "5:30 PM – Midweek Service" },
  { day: "Friday", time: "6:00 PM – Prayer Vigil" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="bg-[#090909] text-white py-20">
      <div className="w-[90%] lg:w-[80%] mx-auto space-y-12">
        <div className="text-center">
          <SectionHeading heading="We&apos;d Love to Connect" />
          <p className="mt-4 text-gray-300">
            Reach out for prayer, counseling, ministry partnerships, or directions to the sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-10">
          {/* Left column */}
          <div className="bg-gradient-to-br from-red-900/80 to-red-700/40 rounded-3xl border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 p-8 border-b border-white/10">
              {contactDetails.map(({ title, icon: Icon, lines }) => (
                <div key={title} className="bg-white/5 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-white/10">
                      <Icon className="w-5 h-5" aria-hidden />
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

            <div className="flex flex-col md:flex-row gap-6 p-8">
              <div className="bg-black/40 rounded-2xl p-5 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5" />
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

              <div className="bg-black/40 rounded-2xl p-5 flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5" />
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
                    className="w-full rounded-xl bg-white text-black font-semibold py-3 hover:bg-gray-100 transition"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                title="CITAM Kisumu Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.689937876259!2d34.752!3d-0.091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa9553dc0bdf9%3A0xe06b7bdcd4e63564!2sCITAM%20Kisumu!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            <div className="rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Stay Connected</p>
              <h4 className="text-2xl font-semibold mt-2">Follow @citamkisumu</h4>
              <p className="mt-3 text-gray-300">
                Receive devotion reminders, service highlights, and ministry updates on our social platforms.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { label: "Facebook", href: "https://facebook.com" },
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "YouTube", href: "https://youtube.com" },
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
