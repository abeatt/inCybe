const io = new IntersectionObserver(entries =>
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("in"); })
, {threshold:0.1});
document.querySelectorAll(".vcell,.phrow,.inverted").forEach(el => io.observe(el));

// Video scroll trigger logic
const videoIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('video').forEach(vid => videoIO.observe(vid));

// Smooth scroll for all anchor links starting with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = targetId === '#' ? document.body : document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fetch and render Markdown documents
async function loadDoc(url) {
  const container = document.getElementById('md-container');
  container.innerHTML = '<p style="color: var(--blue);">Loading document...</p>';
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Document could not be found.');
    
    const markdownText = await response.text();
    container.innerHTML = marked.parse(markdownText);
  } catch (error) {
    container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => nav.classList.toggle('nav-open'));
}