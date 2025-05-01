document.addEventListener("DOMContentLoaded", function() {
  const includes = document.querySelectorAll("include");
  
  // Function to load each <include> sequentially
  const loadIncludesSequentially = async () => {
    for (let element of includes) {
      const src = element.getAttribute('src');
      if (!src) {
        console.warn('Include tag missing src attribute', element);
        continue;
      }
      
      try {
        const content = await loadInclude(`${src}.html`);
        element.insertAdjacentHTML("afterend", content);
        element.remove();
      } catch (error) {
        console.error(`Error loading include ${src}:`, error);
        element.style.display = 'none';
      }
    }
  };
  
  loadIncludesSequentially();
  
  // Function to load the content of each include tag
  async function loadInclude(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  }
});