// Tipo para los elementos de noticias
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  image: string;
  category: string;
  date: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Datos iniciales de noticias
const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'افتتاح مختبر الذكاء الاصطناعي الجديد',
    content: 'تم افتتاح مختبر الذكاء الاصطناعي الجديد في كلية الحاسوب بحضور رئيس الجامعة وعدد من أعضاء هيئة التدريس والطلاب. يهدف المختبر إلى توفير بيئة تعليمية متطورة للطلاب للتدريب على تقنيات الذكاء الاصطناعي وتطبيقاتها في مختلف المجالات.',
    summary: 'افتتاح مختبر متطور للذكاء الاصطناعي في كلية الحاسوب',
    image: '/image/news/ai-lab.jpg',
    category: 'أكاديمية',
    date: '2023-06-15',
    published: true,
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'الجامعة تستضيف المؤتمر الدولي للتكنولوجيا',
    content: 'استضافت جامعة الريادة المؤتمر الدولي للتكنولوجيا بمشاركة خبراء من مختلف دول العالم لمناقشة أحدث التطورات التكنولوجية. تضمن المؤتمر عدة جلسات حول الذكاء الاصطناعي والأمن السيبراني وإنترنت الأشياء وتطوير البرمجيات.',
    summary: 'مؤتمر دولي للتكنولوجيا بمشاركة خبراء عالميين',
    image: '/image/news/tech-conference.jpg',
    category: 'فعاليات',
    date: '2023-05-20',
    published: true,
    createdAt: '2023-05-18T09:15:00Z',
    updatedAt: '2023-05-18T09:15:00Z'
  },
  {
    id: '3',
    title: 'فريق كلية الهندسة يفوز بالمركز الأول في مسابقة الروبوتات',
    content: 'حقق فريق من طلاب كلية الهندسة في جامعة الريادة المركز الأول في المسابقة الوطنية للروبوتات التي أقيمت في العاصمة. قدم الفريق تصميماً مبتكراً لروبوت قادر على أداء مهام معقدة بدقة عالية.',
    summary: 'إنجاز علمي جديد لطلاب كلية الهندسة في مسابقة الروبوتات',
    image: '/image/news/robotics.jpg',
    category: 'طلابية',
    date: '2023-04-10',
    published: true,
    createdAt: '2023-04-11T14:20:00Z',
    updatedAt: '2023-04-11T14:20:00Z'
  }
];

/**
 * Verifica si el código se está ejecutando en el navegador
 */
const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Obtiene los datos de noticias del almacenamiento local o iniciales
 */
const getStoredNews = (): NewsItem[] => {
  try {
    if (!isBrowser()) {
      return initialNews;
    }
    
    const storedData = localStorage.getItem('university_news');
    if (!storedData) {
      // Si no hay datos almacenados, guardar los datos iniciales
      try {
        localStorage.setItem('university_news', JSON.stringify(initialNews));
      } catch (storageError) {
        console.error('Error initializing localStorage:', storageError);
      }
      return initialNews;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData : initialNews;
    } catch (parseError) {
      console.error('Error parsing stored news:', parseError);
      return initialNews;
    }
  } catch (error) {
    console.error('Error accessing stored news:', error);
    return initialNews;
  }
};

/**
 * Guarda los datos de noticias en el almacenamiento local
 */
const saveNewsToStorage = (news: NewsItem[]): boolean => {
  try {
    if (!isBrowser()) {
      return false;
    }
    
    localStorage.setItem('university_news', JSON.stringify(news));
    return true;
  } catch (error) {
    console.error('Error saving news to localStorage:', error);
    return false;
  }
};

/**
 * Obtiene todas las noticias con filtro opcional por categoría
 */
export const getNews = async (category?: string): Promise<NewsItem[]> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    let news = getStoredNews();
    
    // Aplicar filtro si se proporciona una categoría
    if (category) {
      news = news.filter(item => item.category === category);
    }
    
    // Ordenar por fecha descendente (más reciente primero)
    return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting news:', error);
    return [];
  }
};

/**
 * Obtiene una noticia por ID
 */
export const getNewsById = async (id: string): Promise<NewsItem | null> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 200));
  
  try {
    const news = getStoredNews();
    return news.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error getting news by ID:', error);
    return null;
  }
};

/**
 * Agrega una nueva noticia
 */
export const addNews = async (newsData: Partial<NewsItem>): Promise<NewsItem> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const news = getStoredNews();
    const now = new Date().toISOString();
    
    const newNews: NewsItem = {
      id: `news_${Date.now()}`,
      title: newsData.title || '',
      content: newsData.content || '',
      summary: newsData.summary || '',
      image: newsData.image || '',
      category: newsData.category || 'أكاديمية',
      date: newsData.date || now.split('T')[0],
      published: newsData.published ?? false,
      createdAt: now,
      updatedAt: now
    };
    
    const updatedNews = [newNews, ...news];
    const saved = saveNewsToStorage(updatedNews);
    
    if (!saved && isBrowser()) {
      console.warn('Failed to save to localStorage, but continuing operation');
    }
    
    return newNews;
  } catch (error) {
    console.error('Error adding news:', error);
    throw new Error('Failed to add news item');
  }
};

/**
 * Actualiza una noticia existente
 */
export const updateNews = async (id: string, newsData: Partial<NewsItem>): Promise<NewsItem | null> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const news = getStoredNews();
    const newsIndex = news.findIndex(item => item.id === id);
    
    if (newsIndex === -1) {
      return null;
    }
    
    const updatedNews = {
      ...news[newsIndex],
      ...newsData,
      updatedAt: new Date().toISOString()
    };
    
    news[newsIndex] = updatedNews;
    const saved = saveNewsToStorage(news);
    
    if (!saved && isBrowser()) {
      console.warn('Failed to save to localStorage, but continuing operation');
    }
    
    return updatedNews;
  } catch (error) {
    console.error('Error updating news:', error);
    throw new Error('Failed to update news item');
  }
};

/**
 * Elimina una noticia
 */
export const deleteNews = async (id: string): Promise<boolean> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const news = getStoredNews();
    const updatedNews = news.filter(item => item.id !== id);
    
    if (updatedNews.length === news.length) {
      return false; // No se encontró la noticia
    }
    
    const saved = saveNewsToStorage(updatedNews);
    
    if (!saved && isBrowser()) {
      console.warn('Failed to save to localStorage, but continuing operation');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw new Error('Failed to delete news item');
  }
}; 