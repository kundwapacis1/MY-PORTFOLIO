import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, X, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export interface ResumeData {
  url: string;
  fileName: string;
  uploadDate: string;
}

interface ResumeManagerProps {
  resume: ResumeData | null;
  onUpdate: (resume: ResumeData) => void;
  onClose: () => void;
}

export function ResumeManager({ resume, onUpdate, onClose }: ResumeManagerProps) {
  const [resumeUrl, setResumeUrl] = useState(resume?.url || '');
  const [fileName, setFileName] = useState(resume?.fileName || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeUrl || !fileName) {
      toast.error('Please provide both URL and filename');
      return;
    }

    onUpdate({
      url: resumeUrl,
      fileName: fileName,
      uploadDate: new Date().toISOString(),
    });
    
    toast.success('Resume updated successfully');
    onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload this to a server or cloud storage
      // For now, we'll create a local object URL
      const url = URL.createObjectURL(file);
      setResumeUrl(url);
      setFileName(file.name);
      toast.info('File selected. In production, this would be uploaded to cloud storage.');
    }
  };

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modal-content"
      >
        <div className="modal-header">
          <h3 className="modal-title">Manage Resume/CV</h3>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-form">
          {/* File Upload */}
          <div className="form-group">
            <label className="form-label">Upload Resume File</label>
            <div style={{
              border: '2px dashed var(--color-slate-600)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-8)',
              textAlign: 'center',
              transition: 'border-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-cyan-500)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-slate-600)'}
            >
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <label
                htmlFor="resume-upload"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--spacing-3)'
                }}
              >
                <Upload style={{ color: 'var(--color-cyan-400)' }} size={48} />
                <div>
                  <p style={{ color: 'var(--color-slate-300)' }}>Click to upload resume</p>
                  <p style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    PDF, DOC, or DOCX (Max 10MB)
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--color-slate-500)' }}>OR</div>

          {/* Manual URL Entry */}
          <div className="form-group">
            <label className="form-label">Resume URL</label>
            <input
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="form-input"
              placeholder="https://example.com/my-resume.pdf"
            />
            <p style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem', marginTop: 'var(--spacing-2)' }}>
              Host your resume on cloud storage (Google Drive, Dropbox, etc.) and paste the public link
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="form-input"
              placeholder="John_Doe_Resume.pdf"
            />
          </div>

          {resume && (
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--color-slate-700)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                <FileText style={{ color: 'var(--color-cyan-400)' }} size={24} />
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'var(--color-slate-300)' }}>{resume.fileName}</p>
                  <p style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem' }}>
                    Last updated: {new Date(resume.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <a
                  href={resume.url}
                  download={resume.fileName}
                  style={{
                    color: 'var(--color-cyan-400)',
                    transition: 'color 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-cyan-300)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-cyan-400)'}
                >
                  <Download size={20} />
                </a>
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Resume
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
