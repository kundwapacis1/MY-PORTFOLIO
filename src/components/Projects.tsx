import { useState } from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2, Plus, X, Save } from 'lucide-react';
import { type Project } from '../App';

interface ProjectsProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  isAdmin: boolean;
}

export function Projects({ projects, setProjects, isAdmin }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'software' | 'embedded' | 'iot'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleSave = (project: Project) => {
    if (isAdding) {
      setProjects([...projects, { ...project, id: Date.now().toString() }]);
      setIsAdding(false);
    } else {
      setProjects(projects.map(p => p.id === project.id ? project : p));
      setIsEditing(false);
    }
    setEditingProject(null);
  };

  const handleAdd = () => {
    setEditingProject({
      id: '',
      title: '',
      description: '',
      technologies: [],
      category: 'software',
    });
    setIsAdding(true);
    setIsEditing(true);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="projects-header">
            <h2 className="section-title">Projects</h2>
            {isAdmin && (
              <button
                onClick={handleAdd}
                className="btn btn-primary btn-sm"
              >
                <Plus size={20} />
                Add Project
              </button>
            )}
          </div>

          <p className="section-description">
            A selection of projects showcasing expertise across different domains
          </p>

          {/* Filter Buttons */}
          <div className="projects-filters">
            {(['all', 'software', 'embedded', 'iot'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'filter-btn-active' : 'filter-btn-inactive'}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`project-card project-card-${project.category}`}
              >
                <div className="project-header">
                  <span className="project-category-badge">
                    {project.category.toUpperCase()}
                  </span>
                  {isAdmin && (
                    <div className="skill-actions">
                      <button
                        onClick={() => handleEdit(project)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        style={{ color: 'var(--color-slate-400)' }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-red-400)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-slate-400)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="project-tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Edit/Add Modal */}
      {isEditing && editingProject && (
        <ProjectModal
          project={editingProject}
          onSave={handleSave}
          onClose={() => {
            setIsEditing(false);
            setIsAdding(false);
            setEditingProject(null);
          }}
          isAdding={isAdding}
        />
      )}
    </section>
  );
}

interface ProjectModalProps {
  project: Project;
  onSave: (project: Project) => void;
  onClose: () => void;
  isAdding: boolean;
}

function ProjectModal({ project, onSave, onClose, isAdding }: ProjectModalProps) {
  const [formData, setFormData] = useState(project);
  const [techInput, setTechInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech),
    });
  };

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modal-content"
      >
        <div className="modal-header">
          <h3 className="modal-title">{isAdding ? 'Add New Project' : 'Edit Project'}</h3>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
              className="form-select"
            >
              <option value="software">Software</option>
              <option value="embedded">Embedded</option>
              <option value="iot">IoT</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Technologies</label>
            <div className="tags-input-wrapper">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                className="form-input"
                placeholder="Add technology"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="tag-item"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="tag-remove"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={20} />
              {isAdding ? 'Add Project' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
