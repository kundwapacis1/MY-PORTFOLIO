import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // EmailJS Configuration
      // Replace these with your actual EmailJS credentials from https://www.emailjs.com/
      const serviceId = 'YOUR_SERVICE_ID';  // e.g., 'service_abc123'
      const templateId = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xyz456'
      const publicKey = 'YOUR_PUBLIC_KEY';   // e.g., 'user_ABC123XYZ'

      // Check if credentials are configured
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        toast.error('EmailJS is not configured yet. Please add your credentials.');
        console.log('Form Data:', formData);
        console.log('👆 Configure EmailJS credentials in /components/Contact.tsx to enable email sending');
        setIsSending(false);
        return;
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Your Name', // Your name
        },
        publicKey
      );

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSending(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'gihozokundwapacis250@gmail.com',
      href: 'mailto:gihozokundwapacis250@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+250 798871298',
      href: 'tel:+250798871298',
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'KIGAKI, RWANDA',
      href: null,
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description" style={{ marginBottom: '3rem' }}>
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>

          <div className="about-content">
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              <h3 style={{ color: 'var(--color-slate-100)', marginBottom: 'var(--spacing-6)' }}>Contact Information</h3>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-cyan-400)'
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-slate-400)', fontSize: '0.875rem' }}>{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        style={{ color: 'var(--color-slate-100)', textDecoration: 'none', transition: 'color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-cyan-400)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-slate-100)'}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div style={{ color: 'var(--color-slate-100)' }}>{info.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="form-textarea"
                  style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', resize: 'none' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary form-submit"
                disabled={isSending}
                style={{ opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
              >
                <Send size={20} />
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 'var(--spacing-20)',
        paddingTop: 'var(--spacing-8)',
        borderTop: '1px solid var(--color-slate-700)',
        textAlign: 'center',
        color: 'var(--color-slate-500)'
      }}>
        <p>© {new Date().getFullYear()} Kundwa Pacis. All rights reserved.</p>
      </div>
    </section>
  );
}