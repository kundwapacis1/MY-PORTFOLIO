import { Code2, Cpu, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const expertise = [
    {
      icon: <Code2 size={32} />,
      title: 'Software Engineering',
      description: 'Full-stack development with modern frameworks and cloud technologies',
    },
    {
      icon: <Cpu size={32} />,
      title: 'Embedded Systems',
      description: 'Firmware development, real-time systems, and microcontroller programming',
    },
    {
      icon: <Wifi size={32} />,
      title: 'IoT Solutions',
      description: 'Connected devices, sensor networks, and edge computing implementations',
    },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-description" style={{ marginBottom: '4rem' }}>
            A versatile engineer with expertise spanning software development, embedded systems, 
            and IoT. I bridge the gap between hardware and software to create intelligent, 
            connected solutions.
          </p>

          <div className="about-content" style={{ gridTemplateColumns: expertise.length === 3 ? 'repeat(auto-fit, minmax(250px, 1fr))' : undefined }}>
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="skill-category"
              >
                <div style={{ color: 'var(--color-cyan-400)', marginBottom: 'var(--spacing-4)' }}>{item.icon}</div>
                <h3 style={{ color: 'var(--color-slate-100)', marginBottom: 'var(--spacing-2)' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-slate-400)' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
