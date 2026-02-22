/**
 * Unified Digital Governance & Social Intelligence Platform
 * Demo - Mock data, no backend
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSectionReveal();
  initMetricAnimations();
  initNumberCounters();
  initExpandableCards();
  initNarrativeTopics();
  initTopicDetail();
  initCitizenForm();
  initMobileNav();
  initContentGenerate();
  initPerformanceFilter();
  initViewToggle();
  initIntelPanel();
});

// Smooth scroll for nav links
function initNav() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Section fade-in on scroll
function initSectionReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          if (entry.target.querySelector('.performance-chart')) {
            entry.target.querySelector('.performance-chart')?.classList.add('animate-bars');
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
  );

  document.querySelectorAll('[data-section]').forEach((section) => {
    observer.observe(section);
  });
}

// Number counters for metrics
function initNumberCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.metric-value[data-count]').forEach((el) => {
    observer.observe(el);
  });
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 800;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);
    el.textContent = value.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

// Expandable metric cards
function initExpandableCards() {
  document.querySelectorAll('.metric-card[data-expandable]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.metric-expand')) {
        card.classList.toggle('expanded');
      }
    });
  });

  document.querySelectorAll('.stance-card[data-expandable]').forEach((card) => {
    const trigger = card.querySelector('.expand-trigger');
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.toggle('expanded');
    });
  });
}

// Metric cards animate on scroll into view
function initMetricAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 60);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.metric-card[data-animate]').forEach((card) => {
    observer.observe(card);
  });
}

// Narrative: Click topic to show detail modal
function initNarrativeTopics() {
  const topicItems = document.querySelectorAll('.topic-item');
  const detailModal = document.getElementById('topic-detail');
  const topicNameEl = document.getElementById('detail-topic-name');
  const sourceEl = document.getElementById('detail-source');
  const summaryEl = document.getElementById('detail-summary');
  const strategyEl = document.getElementById('detail-strategy');

  const mockDetails = {
    'Skill Development Scheme Expansion': {
      source: 'Social media discourse, parliamentary records, news coverage',
      summary: 'Public interest in skill development initiatives has increased following recent policy announcements. Sentiment is largely positive with some concerns about implementation timelines.',
      strategy: 'Lead with data: share beneficiary numbers and district-wise breakdown. Address timeline concerns proactively. Consider town hall for youth engagement.',
    },
    'Higher Education Funding': {
      source: 'Academic circles, student unions, education ministry reports',
      summary: 'Discussion centers on allocation increases and scholarship disbursement. Mixed sentiment with calls for transparency in fund utilization.',
      strategy: 'Publish quarterly utilization reports. Highlight scholarship beneficiary stories. Engage with student representative bodies.',
    },
    'Employment Rate Concerns': {
      source: 'Labor statistics, youth forums, opposition discourse',
      summary: 'Rising concerns about graduate employment. Narrative focuses on job creation pace versus population growth.',
      strategy: 'Emphasize skill-job alignment. Share placement data from vocational programs. Propose industry partnership initiatives.',
    },
  };

  topicItems.forEach((item) => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.topic-name').textContent;
      const details = mockDetails[name] || mockDetails['Skill Development Scheme Expansion'];

      topicNameEl.textContent = name;
      sourceEl.textContent = details.source;
      summaryEl.textContent = details.summary;
      strategyEl.textContent = details.strategy;

      detailModal.hidden = false;
      detailModal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

// Close topic detail modal
function initTopicDetail() {
  const closeBtn = document.querySelector('.close-detail');
  const detailModal = document.getElementById('topic-detail');

  if (closeBtn && detailModal) {
    closeBtn.addEventListener('click', () => {
      detailModal.hidden = true;
    });
  }
}

// Citizen form: prevent submit, show mock success
function initCitizenForm() {
  const form = document.querySelector('.submission-fields');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Demo: Submission received. (No backend — mock only)');
  });
}

// Content Engine: Generate button with shimmer
function initContentGenerate() {
  const btn = document.getElementById('generate-content');
  const outputs = document.querySelectorAll('.content-output-item');

  if (btn && outputs.length) {
    btn.addEventListener('click', () => {
      btn.disabled = true;
      btn.textContent = 'Generating...';
      btn.classList.add('shimmer');
      outputs.forEach((el) => el.classList.add('output-pending'));

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Generate Content';
        btn.classList.remove('shimmer');
        outputs.forEach((el) => el.classList.remove('output-pending'));
      }, 1500);
    });
  }
}

// Performance: Search and filter
function initPerformanceFilter() {
  const search = document.getElementById('question-search');
  const filter = document.getElementById('category-filter');
  const rows = document.querySelectorAll('.questions-table tbody tr');

  const applyFilters = () => {
    const query = (search?.value || '').toLowerCase();
    const category = (filter?.value || '').toLowerCase();

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      const rowCategory = row.querySelector('.badge')?.textContent?.toLowerCase() || '';
      const matchSearch = !query || text.includes(query);
      const matchCategory = !category || rowCategory.includes(category);
      row.style.display = matchSearch && matchCategory ? '' : 'none';
    });
  };

  search?.addEventListener('input', applyFilters);
  filter?.addEventListener('change', applyFilters);
}

// Chart / List view toggle
function initViewToggle() {
  const container = document.querySelector('.performance-views');
  const buttons = document.querySelectorAll('.toggle-btn[data-view]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      container.classList.remove('performance-view-chart', 'performance-view-list');
      container.classList.add(`performance-view-${view}`);

      buttons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });
}

// Intelligence panel: click issue -> panel slides in
function initIntelPanel() {
  const panel = document.getElementById('intel-detail-panel');
  const closeBtn = panel?.querySelector('.panel-close');
  const radarItems = document.querySelectorAll('.radar-item[data-issue]');
  const btnPrepares = document.querySelectorAll('.btn-prepare');

  const mockPanelData = {
    'Scholarship disbursement delays': {
      summary: 'Student complaints regarding delayed scholarship disbursement across multiple districts. Average delay reported at 4-6 weeks beyond scheduled date.',
      sources: 'Citizen portal submissions, student union reports, education ministry data.',
      arguments: 'Administrative bottlenecks; verification process length; fund release timing.',
      questions: 'What is the current average processing time? How many applications are pending? What steps are being taken to reduce delays?',
      framing: 'Focus on solutions: automation, staffing, and timeline commitments.',
    },
    'Graduate employment rates': {
      summary: 'Public discourse on graduate employability and placement rates. Concerns about skill-job mismatch.',
      sources: 'Labor ministry statistics, campus placement reports, industry surveys.',
      arguments: 'Placement rates vary by institution; vocational vs academic divide; industry demand alignment.',
      questions: 'What is the latest placement data by sector? How does vocational compare to degree programs?',
      framing: 'Data-driven: share placement trends, industry partnership initiatives.',
    },
    'Vocational certification recognition': {
      summary: 'Emerging debate on recognition of vocational certifications by employers and higher education institutions.',
      sources: 'Employer surveys, accreditation body reports, student feedback.',
      arguments: 'Recognition varies by sector; some industries value experience over certification.',
      questions: 'What is the current employer recognition rate? Are there sector-specific gaps?',
      framing: 'Highlight industry partnerships and certification framework updates.',
    },
  };

  function openPanel(title) {
    const data = mockPanelData[title] || mockPanelData['Scholarship disbursement delays'];
    panel.querySelector('#panel-title').textContent = title;
    panel.querySelector('#panel-summary').textContent = data.summary;
    panel.querySelector('#panel-sources').textContent = data.sources;
    panel.querySelector('#panel-arguments').textContent = data.arguments;
    panel.querySelector('#panel-questions').textContent = data.questions;
    panel.querySelector('#panel-framing').textContent = data.framing;
    panel.hidden = false;
  }

  function closePanel() {
    panel.hidden = true;
  }

  radarItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('btn-prepare')) {
        const title = item.querySelector('.radar-title')?.textContent;
        if (title) openPanel(title);
      }
    });
  });

  btnPrepares.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = btn.closest('.radar-item');
      const title = item?.querySelector('.radar-title')?.textContent;
      if (title) openPanel(title);
    });
  });

  closeBtn?.addEventListener('click', closePanel);
}

// Mobile nav toggle
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
}
