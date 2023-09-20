import { useState, useEffect } from 'react';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeFromLocalStorage = JSON.parse(
      localStorage.getItem('darkmode')
    );
    setIsDarkMode(darkModeFromLocalStorage);

    const themeColor = darkModeFromLocalStorage ? '#1a1a2e' : '#fff';
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', themeColor);

    // Add 'dark' class to the body based on the dark mode state
    if (darkModeFromLocalStorage) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkmode', JSON.stringify(newDarkMode));

    const themeColor = newDarkMode ? '#1a1a2e' : '#fff';
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', themeColor);

    // Update 'dark' class on the body
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div
      className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`}
      id='dark-mode-toggle'
    >
      <i className='bx bxs-sun' onClick={toggleDarkMode}></i>
      <i className='bx bxs-moon' onClick={toggleDarkMode}></i>
    </div>
  );
}

export default DarkModeToggle;
