// app/components/Dashboard/UserManager/AddUserModal.tsx
'use client';

import React, { useState } from 'react';
import styles from './AddUserModal.module.css';
import { FaTimes } from 'react-icons/fa'; // أيقونة للإغلاق

interface UserFormData {
  name: string;
  email: string;
  role: 'admin'; // ثابت على إداري حاليًا
  password?: string;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void; // دالة لاستدعائها بعد إضافة المستخدم بنجاح لتحديث القائمة
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onUserAdded }) => {
  if (!isOpen) {
    return null;
  }

  const initialFormData: UserFormData = {
    name: '',
    email: '',
    role: 'admin', // الدور ثابت
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('يرجى ملء حقول الاسم، البريد، وكلمة المرور.');
      return;
    }
    // TODO: إضافة دالة لمعالجة إرسال النموذج
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.modalHeader}>
            if (activeTab === 'students"){
<h2>اضافة طالب جديد </h2>
            }
            
            <button type="button" onClick={onClose} className={styles.closeButton}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.modalBody}>
            {formError && <p className={styles.formError}>{formError}</p>}
            
            <div className={styles.formGroup}>
              <label htmlFor="name">الاسم الكامل:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">البريد الإلكتروني:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">كلمة المرور:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">تأكيد كلمة المرور:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* الدور ثابت حاليًا ولا يتم عرضه كحقل تعديل */}
            <input type="hidden" name="role" value="admin" />

          </div>
          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>إلغاء</button>
            <button type="submit" className={styles.submitButton}>إضافة إداري</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
