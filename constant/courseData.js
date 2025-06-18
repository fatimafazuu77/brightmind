import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';
import banner4 from '../assets/images/banner4.png';

export const techCourses = [
  {
    title: 'Advanced SQL Techniques: Moderate',
    chapters: [
      { title: 'SQL Joins and Subqueries' },
      { title: 'Window Functions' },
      { title: 'Query Optimization' }
    ],
    filePath: banner1,
    description: 'Master advanced SQL queries and database optimization techniques for real-world applications.'
  },
  {
    title: 'React Native for Beginners',
    chapters: [
      { title: 'Introduction to React Native' },
      { title: 'Components and Props' },
      { title: 'State and Lifecycle' },
      { title: 'Navigation' },
      { title: 'Styling and Layout' }
    ],
    filePath: banner2,
    description: 'Start building mobile apps with React Native. No prior experience required!'
  },
  {
    title: 'Python Data Science Fundamentals',
    chapters: [
      { title: 'Python Basics' },
      { title: 'Data Analysis with Pandas' },
      { title: 'Data Visualization' },
      { title: 'Intro to Machine Learning' },
      { title: 'Working with Data Files' },
      { title: 'Project: Data Science Pipeline' }
    ],
    filePath: banner3,
    description: 'Learn the basics of data science using Python, including data analysis and visualization.'
  },
  {
    title: 'Web Development with Django',
    chapters: [
      { title: 'Django Overview' },
      { title: 'Models and Databases' },
      { title: 'Views and Templates' },
      { title: 'User Authentication' }
    ],
    filePath: banner4,
    description: 'Build robust web applications using Django, a powerful Python web framework.'
  }
];

export const businessCourses = [
  {
    title: 'Financial Planning and Budgeting',
    chapters: [
      { title: 'Setting Financial Goals' },
      { title: 'Budget Creation' },
      { title: 'Tracking Expenses' },
      { title: 'Saving and Investing' },
      { title: 'Review and Adjust' }
    ],
    filePath: banner1,
    description: 'Gain control of your finances with effective planning and budgeting strategies.'
  },
  {
    title: 'Entrepreneurship Essentials',
    chapters: [
      { title: 'Idea Validation' },
      { title: 'Business Planning' },
      { title: 'Funding Your Startup' },
      { title: 'Marketing Basics' }
    ],
    filePath: banner2,
    description: 'Discover the key skills and mindset needed to launch and grow your own business.'
  },
  {
    title: 'Digital Marketing Masterclass',
    chapters: [
      { title: 'SEO Fundamentals' },
      { title: 'Content Marketing' },
      { title: 'Social Media Strategy' },
      { title: 'Email Marketing' },
      { title: 'Analytics and Reporting' },
      { title: 'Paid Advertising' }
    ],
    filePath: banner3,
    description: 'Unlock the secrets of digital marketing to boost your brand and reach more customers.'
  },
  {
    title: 'Investment Strategies',
    chapters: [
      { title: 'Investment Basics' },
      { title: 'Stocks and Bonds' },
      { title: 'Portfolio Diversification' }
    ],
    filePath: banner4,
    description: 'Learn proven investment strategies to grow your wealth and secure your future.'
  }
];

export const healthCourses = [
  {
    title: 'Yoga for Beginners',
    chapters: [
      { title: 'Yoga Basics' },
      { title: 'Breathing Techniques' },
      { title: 'Flexibility and Balance' },
      { title: 'Building a Routine' },
      { title: 'Mindfulness and Meditation' }
    ],
    filePath: banner1,
    description: 'Improve your flexibility and well-being with easy-to-follow yoga routines.'
  },
  {
    title: 'Healthy Eating Habits',
    chapters: [
      { title: 'Nutrition Basics' },
      { title: 'Meal Planning' },
      { title: 'Smart Grocery Shopping' },
      { title: 'Cooking at Home' }
    ],
    filePath: banner2,
    description: 'Adopt healthy eating habits for a balanced and energetic lifestyle.'
  },
  {
    title: 'Mental Wellness Basics',
    chapters: [
      { title: 'Understanding Mental Health' },
      { title: 'Stress Management' },
      { title: 'Building Resilience' },
      { title: 'Seeking Support' },
      { title: 'Mindfulness Practices' },
      { title: 'Self-Care Strategies' }
    ],
    filePath: banner3,
    description: 'Explore techniques to manage stress and enhance your mental health.'
  },
  {
    title: 'Cardio Fitness Fundamentals',
    chapters: [
      { title: 'Cardio Basics' },
      { title: 'Types of Cardio Workouts' },
      { title: 'Building Endurance' }
    ],
    filePath: banner4,
    description: 'Boost your heart health and stamina with essential cardio exercises.'
  }
];

// Combine all courses for easy use
export const allCourses = [
  ...techCourses,
  ...businessCourses,
  ...healthCourses,
]; 