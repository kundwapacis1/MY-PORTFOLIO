import { useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills, type SkillCategory } from './components/Skills';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { AdminLogin } from './components/AdminLogin';
import { ResumeManager, type ResumeData } from './components/ResumeManager';
import { Toaster } from 'sonner';
import './styles.css';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'software' | 'embedded' | 'iot';
  image?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Smart Home Automation System',
    description: 'IoT-based home automation system using ESP32 and MQTT protocol for real-time device control and monitoring.',
    technologies: ['ESP32', 'MQTT', 'React', 'Node.js'],
    category: 'iot',
  },
  {
    id: '2',
    title: 'Embedded Motor Controller',
    description: 'Real-time motor control system with PID algorithms implemented on STM32 microcontroller.',
    technologies: ['STM32', 'C', 'FreeRTOS', 'CAN Bus'],
    category: 'embedded',
  },
  {
    id: '3',
    title: 'Cloud-Based Analytics Platform',
    description: 'Full-stack web application for data analytics with real-time visualization and machine learning integration.',
    technologies: ['React', 'Python', 'TensorFlow', 'AWS'],
    category: 'software',
  },
];

const initialAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Best IoT Project Award',
    description: 'Awarded for innovative smart city solution at Tech Innovation Conference 2024',
    date: '2024',
  },
  {
    id: '2',
    title: 'Published Research Paper',
    description: 'Co-authored paper on "Optimizing Power Consumption in IoT Devices" published in IEEE Transactions',
    date: '2023',
  },
  {
    id: '3',
    title: 'Certified Embedded Systems Professional',
    description: 'Obtained professional certification in embedded systems design and development',
    date: '2023',
  },
];

const initialSkillCategories: SkillCategory[] = [
  {
    id: '1',
    category: 'Software Development',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Go', 'AWS', 'Docker'],
  },
  {
    id: '2',
    category: 'Embedded Systems',
    skills: ['C/C++', 'STM32', 'ARM Cortex', 'FreeRTOS', 'Embedded Linux', 'UART/SPI/I2C'],
  },
  {
    id: '3',
    category: 'IoT & Hardware',
    skills: ['ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'LoRaWAN', 'Sensor Integration'],
  },
  {
    id: '4',
    category: 'Tools & Technologies',
    skills: ['Git', 'JIRA', 'Oscilloscope', 'Logic Analyzer', 'PCB Design', 'CI/CD'],
  },
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(initialSkillCategories);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showResumeManager, setShowResumeManager] = useState(false);

  return (
    <div className="app-container">
      <Toaster richColors position="top-right" theme="dark" />
      <Navigation />
      <AdminLogin
        isAdmin={isAdmin}
        onLogin={() => setIsAdmin(true)}
        onLogout={() => setIsAdmin(false)}
      />
      <Hero
        resumeUrl={resume?.url}
        resumeFileName={resume?.fileName}
        isAdmin={isAdmin}
        onManageResume={() => setShowResumeManager(true)}
      />
      <About />
      <Skills skillCategories={skillCategories} setSkillCategories={setSkillCategories} isAdmin={isAdmin} />
      <Projects projects={projects} setProjects={setProjects} isAdmin={isAdmin} />
      <Achievements achievements={achievements} setAchievements={setAchievements} isAdmin={isAdmin} />
      <Contact />

      {showResumeManager && (
        <ResumeManager
          resume={resume}
          onUpdate={setResume}
          onClose={() => setShowResumeManager(false)}
        />
      )}
    </div>
  );
}
