import { useState } from 'react';
import { motion } from 'motion/react';
import { Edit2, Trash2, Plus, X, Save } from 'lucide-react';

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

interface SkillsProps {
  skillCategories: SkillCategory[];
  setSkillCategories: (categories: SkillCategory[]) => void;
  isAdmin: boolean;
}

export function Skills({ skillCategories, setSkillCategories, isAdmin }: SkillsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (category: SkillCategory) => {
    setEditingCategory(category);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setSkillCategories(skillCategories.filter(c => c.id !== id));
  };

  const handleSave = (category: SkillCategory) => {
    if (isAdding) {
      setSkillCategories([...skillCategories, { ...category, id: Date.now().toString() }]);
      setIsAdding(false);
    } else {
      setSkillCategories(skillCategories.map(c => c.id === category.id ? category : c));
      setIsEditing(false);
    }
    setEditingCategory(null);
  };

  const handleAdd = () => {
    setEditingCategory({
      id: '',
      category: '',
      skills: [],
    });
    setIsAdding(true);
    setIsEditing(true);
  };

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="skills-header">
            <h2 className="section-title" style={{ textAlign: 'left', flex: 1 }}>Technical Skills</h2>
            {isAdmin && (
              <button
                onClick={handleAdd}
                className="btn btn-primary btn-sm"
              >
                <Plus size={20} />
                Add Category
              </button>
            )}
          </div>

          <p className="section-description" style={{ marginBottom: '4rem' }}>
            A comprehensive skill set covering the full stack from low-level hardware to cloud applications
          </p>

          <div className="skills-grid">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="skill-category"
              >
                <div className="skill-category-header">
                  <h3 className="skill-category-title">{category.category}</h3>
                  {isAdmin && (
                    <div className="skill-actions">
                      <button
                        onClick={() => handleEdit(category)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        style={{ color: 'var(--color-slate-400)' }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-red-400)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-slate-400)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="skill-list">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag"
                      style={{
                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        color: 'var(--color-cyan-400)',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Edit/Add Modal */}
      {isEditing && editingCategory && (
        <SkillCategoryModal
          category={editingCategory}
          onSave={handleSave}
          onClose={() => {
            setIsEditing(false);
            setIsAdding(false);
            setEditingCategory(null);
          }}
          isAdding={isAdding}
        />
      )}
    </section>
  );
}

interface SkillCategoryModalProps {
  category: SkillCategory;
  onSave: (category: SkillCategory) => void;
  onClose: () => void;
  isAdding: boolean;
}

function SkillCategoryModal({ category, onSave, onClose, isAdding }: SkillCategoryModalProps) {
  const [formData, setFormData] = useState(category);
  const [skillInput, setSkillInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
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
          <h3 className="modal-title">{isAdding ? 'Add New Skill Category' : 'Edit Skill Category'}</h3>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-input"
              placeholder="e.g., Software Development"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills</label>
            <div className="tags-input-wrapper">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="form-input"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={addSkill}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
            <div className="tags-list">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="tag-item"
                  style={{
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: 'var(--color-cyan-400)'
                  }}
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="tag-remove"
                    style={{ color: 'var(--color-cyan-500)' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-red-400)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-cyan-500)'}
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
              {isAdding ? 'Add Category' : 'Save Changes'}
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
