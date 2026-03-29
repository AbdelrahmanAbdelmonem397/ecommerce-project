import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass = "w-full px-4 py-3.5 bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="border-b border-border py-20 md:py-28 px-4 md:px-8">
        <div className="container mx-auto text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Contact <span className="italic text-gradient">Us</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Have a question or need assistance? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              {[
                { icon: Mail, title: "Email", info: "a24620732@gmail.com" },
                { icon: Phone, title: "Phone", info: "01093723723" },
                { icon: MapPin, title: "Address", info: "Elmonofya_Elbagour_Elmedan" },
              ].map(({ icon: Icon, title, info }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-xs uppercase tracking-widest mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{info}</p>
                  </div>
                </div>
              ))}

              <div className="border border-border p-6 mt-8 card-shine">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={16} className="text-primary" />
                  <h3 className="font-display font-bold text-sm">Business Hours</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>Sunday - Thursday</span>
                    <span>12pm - 12am</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10am - 10pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <input
                name="subject"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-3">
                <Send size={14} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
