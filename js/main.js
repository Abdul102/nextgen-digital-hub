/* NextGen Digital Hub — Global JS */

document.addEventListener('DOMContentLoaded', () => {
  // ========= Page loader =========
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 350);
  });

  // ========= Mobile nav =========
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // ========= Header scroll effect =========
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ========= Reveal on scroll =========
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ========= Animated stat counters =========
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => counterObserver.observe(el));
  }

  // ========= Contact form =========
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 5000);
      }
    });
  }

  // ========= Chatbot =========
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatbotForm = document.querySelector('.chatbot-input');
  const chatbotBody = document.querySelector('.chatbot-body');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('open'));
  }
  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('open'));
  }
  if (chatbotForm && chatbotBody) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = chatbotForm.querySelector('input');
      const text = (input.value || '').trim();
      if (!text) return;

      const userBubble = document.createElement('div');
      userBubble.className = 'user-msg';
      userBubble.textContent = text;
      chatbotBody.appendChild(userBubble);

      input.value = '';
      chatbotBody.scrollTop = chatbotBody.scrollHeight;

      setTimeout(() => {
        const replies = [
          "Thanks for reaching out! Our team will get back to you within 24 hours.",
          "Great question! You can explore our services or request a quote on the Contact page.",
          "I'd love to help. Want me to connect you with a specialist?",
          "We offer AI Solutions, QA Testing, SaaS Development and more — what interests you most?"
        ];
        const bot = document.createElement('div');
        bot.className = 'bot-msg';
        bot.textContent = replies[Math.floor(Math.random() * replies.length)];
        chatbotBody.appendChild(bot);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      }, 700);
    });
  }
});
