'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/theme-context';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);

  const handleToggleTheme = () => {
    setIsChanging(true);
    toggleTheme();
  };

  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        setIsChanging(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isChanging]);

  return (
    <button
      className={`${styles.themeToggle} ${className} ${isChanging ? styles.changing : ''}`}
      onClick={handleToggleTheme}
      aria-label={theme === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
      type="button"
    >
      <div className={styles.iconWrapper}>
        {theme === 'light' ? (
          <FaMoon className={styles.themeIcon} />
        ) : (
          <FaSun className={styles.themeIcon} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle; 