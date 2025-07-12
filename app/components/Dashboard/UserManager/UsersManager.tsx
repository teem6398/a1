'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AddUserModal from './AddUserModal';
import styles from './UsersManager.module.css';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaUsersCog,
  FaPlusCircle,
  FaFilter,
  FaSpinner, // تمت إضافتها
  FaExclamationTriangle, // تمت إضافتها
} from 'react-icons/fa';

// واجهات البيانات كما هي قادمة من الـ API
interface ApiStudent {
  id: string; // student_id
  name: string; // first_name_ar
  email: string | null;
  created_at: string;
  role: 'student';
  batch: string | null; // batch_name
  program_name: string | null; // program_name
  major: string | null; // major_name_ar
  college: string | null; // college_name_ar
}

interface ApiTeacher {
  id: string; // teacher_id
  name: string; // name_ar
  email: string | null;
  created_at: string; // أو hire_date
  role: 'teacher';
  department: string | null; // department_name
  college: string | null; // college_name_ar
}

interface ApiAdmin {
  id: string; // admin_id
  name: string;
  email: string;
  created_at: string;
  role: string; // 'admin' or other roles from DB
}

// واجهة المستخدم الموحدة داخل التطبيق
interface AppUser {
  id: string;
  name: string;
  email: string | null;
  role: 'student' | 'teacher' | 'admin' | 'unknown'; // 'unknown' للتعامل مع أدوار غير متوقعة
  createdAt: string; // سيتم تنسيقه
  college?: string | null;
  major?: string | null;
  batch?: string | null;
  department?: string | null;
  programName?: string | null; // لإضافة اسم البرنامج إذا لزم الأمر
}

const roleNameMap: Record<AppUser['role'], string> = {
  student: 'طالب',
  teacher: 'معلم',
  admin: 'إداري',
  unknown: 'غير معروف', // تم تحديث هذا
};

// دالة لتنسيق التاريخ
const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  } catch (e) {
    return 'Invalid Date';
  }
};

const UsersManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'admins'>('students');
  const [allUsers, setAllUsers] = useState<AppUser[]>([]); // تم تغيير الاسم وإزالة البيانات الوهمية
  const [isLoading, setIsLoading] = useState(true); // يبدأ بـ true
  const [error, setError] = useState<string | null>(null); // حالة للخطأ
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [activeCollegeFilter, setActiveCollegeFilter] = useState<string>('all'); // تم تغيير النوع إلى string
  const [activeMajorFilter, setActiveMajorFilter] = useState<string>('all'); // النوع string بالفعل
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [studentsRes, teachersRes, adminsRes] = await Promise.all([
        fetch('/api/api_academics/studentusers'),
        fetch('/api/api_academics/teacherusers'),
        fetch('/api/api_academics/admainusers'), // مسار الإداريين الصحيح
      ]);

      if (!studentsRes.ok || !teachersRes.ok || !adminsRes.ok) {
        // يمكنك التعامل مع كل خطأ على حدة إذا أردت
        throw new Error('Failed to fetch one or more user types');
      }

      const studentsData: ApiStudent[] = await studentsRes.json();
      const teachersData: ApiTeacher[] = await teachersRes.json();
      const adminsData: ApiAdmin[] = await adminsRes.json();

      const transformedStudents: AppUser[] = studentsData.map(s => ({
        id: s.id,
        name: s.name,
        email: s.email,
        role: 'student',
        createdAt: formatDate(s.created_at),
        college: s.college,
        major: s.major,
        batch: s.batch,
        programName: s.program_name,
      }));

      const transformedTeachers: AppUser[] = teachersData.map(t => ({
        id: t.id,
        name: t.name,
        email: t.email,
        role: 'teacher',
        createdAt: formatDate(t.created_at),
        college: t.college,
        department: t.department,
      }));

      const transformedAdmins: AppUser[] = adminsData.map(a => ({
        id: a.id,
        name: a.name,
        email: a.email,
        role: a.role === 'admain' ? 'admin' : (a.role as AppUser['role']), // تصحيح الدور
        createdAt: formatDate(a.created_at),
      }));

      setAllUsers([...transformedStudents, ...transformedTeachers, ...transformedAdmins]);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setAllUsers([]); // مسح المستخدمين في حالة الخطأ
    } finally {
      setIsLoading(false);
    }
  }, []); // لا توجد اعتمادات لأن formatDate يجب أن تكون خارج المكون أو مستقرة

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleUserAdded = () => {
    setIsAddModalOpen(false);
    fetchAllUsers(); // إعادة جلب المستخدمين
  };

  const handleTabChange = (tab: 'students' | 'teachers' | 'admins') => {
    setActiveTab(tab);
    setActiveCollegeFilter('all');
    setActiveMajorFilter('all'); // إعادة تعيين فلتر التخصص
    setSearchTerm(''); 
  };

  const handleCollegeFilterChange = (college: string) => {
    setActiveCollegeFilter(college);
    setActiveMajorFilter('all'); 
  };

  const handleMajorFilterChange = (major: string) => {
    setActiveMajorFilter(major);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const colleges = useMemo(() => {
    const uniqueColleges = new Set(
      allUsers 
        .filter(user => (user.role === 'student' || user.role === 'teacher') && user.college)
        .map(user => user.college!) 
    );
    return ['all', ...Array.from(uniqueColleges)];
  }, [allUsers]);

  const majors = useMemo(() => {
    if (activeCollegeFilter === 'all') {
      const uniqueMajors = new Set(
        allUsers 
          .filter(user => user.role === 'student' && user.major && user.college) 
          .map(user => user.major!)
      );
      return ['all', ...Array.from(uniqueMajors)];
    }
    
    const uniqueMajors = new Set(
      allUsers 
        .filter(user => user.role === 'student' && user.college === activeCollegeFilter && user.major)
        .map(user => user.major!)
    );
    return ['all', ...Array.from(uniqueMajors)];
  }, [allUsers, activeCollegeFilter]);

  const filteredUsers = useMemo(() => {
    let dataToFilter: AppUser[] = [];

    if (activeTab === 'students') {
      dataToFilter = allUsers.filter(user => user.role === 'student');
    } else if (activeTab === 'teachers') {
      dataToFilter = allUsers.filter(user => user.role === 'teacher');
    } else { // admins
      dataToFilter = allUsers.filter(user => user.role === 'admin');
    }

    
    if (activeCollegeFilter !== 'all' && (activeTab === 'students' || activeTab === 'teachers')) {
      dataToFilter = dataToFilter.filter(user => user.college === activeCollegeFilter);
    }

    
    if (activeTab === 'students' && activeMajorFilter !== 'all' && activeCollegeFilter !== 'all') {
         dataToFilter = dataToFilter.filter(user => user.major === activeMajorFilter && user.college === activeCollegeFilter);
    } else if (activeTab === 'students' && activeMajorFilter !== 'all' && activeCollegeFilter === 'all') {
        
        dataToFilter = dataToFilter.filter(user => user.major === activeMajorFilter);
    }
    
    if (!searchTerm) return dataToFilter;

    
    return dataToFilter.filter((user) => {
      const term = searchTerm.toLowerCase();
      
      const nameMatch = user.name.toLowerCase().includes(term);
      const emailMatch = user.email?.toLowerCase().includes(term) || false; 
      const majorMatch = user.major?.toLowerCase().includes(term) || false;
      const collegeMatch = user.college?.toLowerCase().includes(term) || false;
      const batchMatch = user.batch?.toLowerCase().includes(term) || false;
      const departmentMatch = user.department?.toLowerCase().includes(term) || false;
      const programNameMatch = user.programName?.toLowerCase().includes(term) || false;

      return nameMatch || emailMatch || majorMatch || collegeMatch || batchMatch || departmentMatch || programNameMatch;
    });
  }, [allUsers, activeTab, activeCollegeFilter, activeMajorFilter, searchTerm]);


  const renderCollegeFilters = () => {
    if (activeTab === 'admins') return null; 

    return (
      <div className={styles.collegeFilterContainer}>
        <span className={styles.collegeFilterLabel}><FaFilter /> تصفية حسب الكلية:</span>
        <div className={styles.collegeFilterTabs}>
          {colleges.map((collegeName) => (
            <button
              key={collegeName}
              className={`${styles.collegeFilterTab} ${activeCollegeFilter === collegeName ? styles.activeCollegeFilterTab : ''}`}
              onClick={() => handleCollegeFilterChange(collegeName)}
            >
              {collegeName}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>جاري تحميل المستخدمين...</p>
        </div>
      );
    }

    const data = filteredUsers;

    if (data.length === 0) {
        let message = 'لا يوجد مستخدمون لعرضهم حاليًا.';
        if (searchTerm) {
            message = `لا توجد نتائج بحث تطابق "${searchTerm}".`;
            if (activeCollegeFilter !== 'all' && activeTab !== 'admins') {
                message += ` في كلية ${activeCollegeFilter}`;
                if (activeMajorFilter !== 'all' && activeTab === 'students' && activeCollegeFilter !== 'all') {
                    message += `، تخصص ${activeMajorFilter}`;
                }
            }
        } else if (activeTab === 'students' && activeCollegeFilter !== 'all' && activeMajorFilter !== 'all') {
            message = `لا يوجد طلاب في كلية ${activeCollegeFilter}، تخصص ${activeMajorFilter} حاليًا.`;
        } else if (activeCollegeFilter !== 'all' && activeTab !== 'admins') {
            message = `لا يوجد ${activeTab === 'students' ? 'طلاب' : 'معلمون'} في كلية ${activeCollegeFilter} حاليًا.`;
        }
        return <div className={styles.emptyState}>{message}</div>;
    }

    return (
      <div className={styles.tableWrapper}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              {activeTab !== 'admins' && <th>الكلية</th>}
              {activeTab === 'students' && <th>التخصص</th>}
              {activeTab === 'students' && <th>الدفعة</th>}
              <th>الدور</th>
              <th>تاريخ الإنشاء</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: AppUser) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email || '-'}</td>
                {activeTab !== 'admins' && 
                  <td>
                    {user.college || '-'}
                  </td>
                }
                {activeTab === 'students' && 
                  <td>
                    {user.major || '-'}
                  </td>
                }
                {activeTab === 'students' && <td>{user.batch || '-'}</td>}
                <td>{roleNameMap[user.role]}</td>
                <td>{user.createdAt}</td> 
                <td className={styles.actionButtons}>
                  <button className={`${styles.iconButton} ${styles.editButton}`} title="تعديل">
                    <FaUsersCog />
                  </button>
                  <button className={`${styles.iconButton} ${styles.deleteButton}`} title="حذف">
                    <FaUserShield /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMajorFilters = () => {
    // majors already includes 'all', so if it only has 'all', length is 1.
    // We show filters only if there's more than just 'all'.
    if (activeTab !== 'students' || majors.length <= 1) return null;

    return (
      <div className={styles.majorFilterContainer}>
        <span className={styles.majorFilterLabel}><FaFilter style={{ transform: 'scaleX(-1)' }} /> تصفية حسب التخصص:</span>
        <div className={styles.majorFilterTabs}>
          {majors.map((majorName) => (
            <button
              key={majorName}
              className={`${styles.majorFilterTab} ${activeMajorFilter === majorName ? styles.activeMajorFilterTab : ''}`}
              onClick={() => handleMajorFilterChange(majorName)} // Use the new handler
            >
              {majorName} 
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  return (
    <div className={styles.userManagerContainer}>
      <div className={styles.editorHeader}>
        <h1 className={styles.editorTitle}>
          <FaUsersCog /> إدارة المستخدمين
        </h1>
        <button className={styles.addButton} onClick={handleOpenAddModal}>
          <FaPlusCircle /> إضافة مستخدم جديد
        </button>
      </div>

      <div className={styles.controlsContainer}>
        <input 
          type="text"
          placeholder="بحث بالاسم، البريد، أو التخصص (للطلاب)..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.userTabs}>
        <button
          className={`${styles.userTab} ${activeTab === 'students' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('students')}
        >
          <FaUserGraduate className={styles.tabIcon} /> الطلاب
        </button>
        <button
          className={`${styles.userTab} ${activeTab === 'teachers' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('teachers')}
        >
          <FaChalkboardTeacher className={styles.tabIcon} /> المعلمون
        </button>
        <button
          className={`${styles.userTab} ${activeTab === 'admins' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('admins')}
        >
          <FaUserShield className={styles.tabIcon} /> الإداريون
        </button>
      </div>

      {renderCollegeFilters()}
      {/* عرض فلاتر التخصصات */}
      {activeTab === 'students' && activeCollegeFilter !== 'all' && renderMajorFilters()}

      <div className={styles.userContent}>
        {error && <div className={styles.errorMessage}>خطأ: {error}</div>}
        {!isLoading && !error && renderContent()}
      </div>
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
};

export default UsersManager;
