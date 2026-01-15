import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Edit2, Trash2, Plus, X, Save } from 'lucide-react';
import { type Achievement } from '../App';

interface AchievementsProps {
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  isAdmin: boolean;
}

export function Achievements({ achievements, setAchievements, isAdmin }: AchievementsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  const handleSave = (achievement: Achievement) => {
    if (isAdding) {
      setAchievements([...achievements, { ...achievement, id: Date.now().toString() }]);
      setIsAdding(false);
    } else {
      setAchievements(achievements.map(a => a.id === achievement.id ? achievement : a));
      setIsEditing(false);
    }
    setEditingAchievement(null);
  };

  const handleAdd = () => {
    setEditingAchievement({
      id: '',
      title: '',
      description: '',
      date: new Date().getFullYear().toString(),
    });
    setIsAdding(true);
    setIsEditing(true);
  };

  return (
    <section id="achievements" className="section" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="achievements-header">
            <h2 className="section-title">Achievements</h2>
            {isAdmin && (
              <button
                onClick={handleAdd}
                className="btn btn-primary btn-sm"
              >
                <Plus size={20} />
                Add Achievement
              </button>
            )}
          </div>

          <p className="section-description" style={{ marginBottom: '3rem' }}>
            Notable accomplishments and recognitions throughout my career
          </p>

          <div className="projects-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="achievement-card"
              >
                <div className="achievement-header">
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Trophy size={24} />
                  </div>
                  {isAdmin && (
                    <div className="skill-actions">
                      <button
                        onClick={() => handleEdit(achievement)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(achievement.id)}
                        style={{ color: 'var(--color-slate-400)' }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-red-400)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-slate-400)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="achievement-date">{achievement.date}</div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Edit/Add Modal */}
      {isEditing && editingAchievement && (
        <AchievementModal
          achievement={editingAchievement}
          onSave={handleSave}
          onClose={() => {
            setIsEditing(false);
            setIsAdding(false);
            setEditingAchievement(null);
          }}
          isAdding={isAdding}
        />
      )}
    </section>
  );
}

interface AchievementModalProps {
  achievement: Achievement;
  onSave: (achievement: Achievement) => void;
  onClose: () => void;
  isAdding: boolean;
}

function AchievementModal({ achievement, onSave, onClose, isAdding }: AchievementModalProps) {
  const [formData, setFormData] = useState(achievement);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modal-content"
      >
        <div className="modal-header">
          <h3 className="modal-title">{isAdding ? 'Add New Achievement' : 'Edit Achievement'}</h3>
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
            <label className="form-label">Date/Year</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="form-input"
              placeholder="e.g., 2024 or January 2024"
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={20} />
              {isAdding ? 'Add Achievement' : 'Save Changes'}
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
