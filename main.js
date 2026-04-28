const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .portfolio-item, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
    });

    /* ─── Nav scroll ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    /* ─── Scroll progress ─── */
    const prog = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      prog.style.transform = `scaleX(${pct})`;
    });

    /* ─── Mobile Nav ─── */
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMobile.classList.toggle('open');
    });
    function closeMobileNav() {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
    }

    /* ─── Reveal on scroll ─── */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    /* ─── Portfolio filter ─── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.opacity = show ? '1' : '0.25';
          item.style.pointerEvents = show ? 'all' : 'none';
        });
      });
    });

    /* ─── Testimonials slider ─── */
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('testimonialsDots');
    const cards = track.querySelectorAll('.testimonial-card');
    let current = 0;
    let autoplay;

    const isMobile = () => window.innerWidth <= 900;
    const total = () => isMobile() ? cards.length : Math.ceil(cards.length / 2);

    // Build dots
    function buildDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total(); i++) {
        const d = document.createElement('button');
        d.className = 'dot-indicator' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', `Go to slide ${i+1}`);
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
      }
    }

    function goTo(idx) {
      current = (idx + total()) % total();
      const cardWidth = track.parentElement.offsetWidth + 24; // gap
      track.style.transform = `translateX(-${current * (isMobile() ? 100 : 50)}%)`;
      dotsContainer.querySelectorAll('.dot-indicator').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    document.getElementById('tPrev').addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
    document.getElementById('tNext').addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

    function resetAutoplay() { clearInterval(autoplay); autoplay = setInterval(() => goTo(current + 1), 4500); }
    buildDots();
    resetAutoplay();
    window.addEventListener('resize', () => { buildDots(); goTo(0); });

    /* ─── Contact form ─── */
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      this.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    });

    /* ─── Trigger initial reveal for hero ─── */
    window.addEventListener('load', () => {
      document.querySelectorAll('#hero .reveal').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
      });
    });