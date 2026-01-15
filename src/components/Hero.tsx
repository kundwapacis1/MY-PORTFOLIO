import { Github, Linkedin, Mail, ChevronDown, Download, FileText } from 'lucide-react';
import { motion } from 'motion/react';



interface HeroProps {
    resumeUrl?: string;
    resumeFileName?: string;
    isAdmin: boolean;
    onManageResume: () => void;
}

export function Hero({ resumeUrl, resumeFileName, isAdmin, onManageResume }: HeroProps) {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-6">
                        <div className="hero-avatar">
                            <img
                                src="/public/profile.png"
                                alt="Profile Picture"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 'var(--radius-full)'
                                }}
                            />
                        </div>
                    </div>

                    <h1 className="hero-title">
                        Hi, I'm <span className="hero-title-accent">John Doe</span>
                    </h1>

                    <h2 className="hero-subtitle">
                        Software Engineer | Embedded Systems | IoT Specialist
                    </h2>

                    <p className="hero-description">
                        Passionate about building innovative solutions across software development,
                        embedded systems, and IoT. Experienced in creating efficient, scalable, and
                        cutting-edge technology solutions.
                    </p>

                    <div className="hero-actions">
                        <a
                            href="#contact"
                            className="btn btn-primary"
                        >
                            Get In Touch
                        </a>
                        {resumeUrl ? (
                            <a
                                href={resumeUrl}
                                download={resumeFileName || 'resume.pdf'}
                                className="btn btn-secondary"
                            >
                                <Download size={20} />
                                Download Resume
                            </a>
                        ) : isAdmin ? (
                            <button
                                onClick={onManageResume}
                                className="btn btn-secondary"
                            >
                                <FileText size={20} />
                                Add Resume
                            </button>
                        ) : null}
                        {resumeUrl && isAdmin && (
                            <button
                                onClick={onManageResume}
                                className="btn btn-icon btn-ghost"
                                title="Manage Resume"
                            >
                                <FileText size={20} />
                            </button>
                        )}
                        <a
                            href="#projects"
                            className="btn btn-secondary"
                        >
                            View Projects
                        </a>
                    </div>

                    <div className="hero-social">
                        <a
                            href="https://github.com/kundwapacis1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/kundwa-pacis-08601035a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="mailto:gihozokundwapacis250@gmail.com"
                            className="hero-social-link"
                        >
                            <Mail size={24} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-scroll"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ChevronDown size={32} />
                </motion.div>
            </div>
        </section>
    );
}