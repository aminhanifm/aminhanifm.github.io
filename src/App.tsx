import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  FaApple,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFilePdf,
  FaFilter,
  FaGamepad,
  FaGithub,
  FaGoogleDrive,
  FaInfoCircle,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
  FaTimes,
  FaTrophy,
} from 'react-icons/fa';
import { SiGoogleplay, SiItchdotio } from 'react-icons/si';
import { awards, experiences, profile, projects, stats, type LinkKind, type Project } from './data/portfolio';

const featuredProjects = projects.filter((project) => project.featured);
const currentRoles = experiences.filter((experience) => experience.period.includes('Present'));
const visibleAwards = awards.slice(0, 6);
const additionalAwards = awards.slice(6);
const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
const navSectionIds = navItems.map((item) => item.id);
const heroPreviewProjects = featuredProjects.slice(0, 4);

type Theme = 'dark' | 'light';
type ProjectFilterId = 'all' | 'featured' | 'mobile' | 'pc-web' | 'ar' | 'simulation' | 'leadership';

type RevealStyle = CSSProperties & {
  '--reveal-index'?: number;
};

const projectFilters: Array<{ id: ProjectFilterId; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'pc-web', label: 'PC / Web' },
  { id: 'ar', label: 'AR' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'leadership', label: 'Leadership' },
];

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';

  return window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
}

function revealStyle(index: number): RevealStyle {
  return { '--reveal-index': index };
}

function useRevealMotion(refreshKey: unknown) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (elements.length === 0) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [refreshKey]);
}

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return undefined;

    const updateActiveSection = () => {
      const anchorY = window.scrollY + window.innerHeight * 0.35;
      let currentSection = sections[0];

      sections.forEach((section) => {
        if (section.offsetTop <= anchorY) {
          currentSection = section;
        }
      });

      setActiveSection(currentSection?.id ?? sections[0].id);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIds]);

  return activeSection;
}

function matchesProjectFilter(project: Project, filter: ProjectFilterId) {
  if (filter === 'all') return true;
  if (filter === 'featured') return Boolean(project.featured);

  const platforms = project.platforms.map((platform) => platform.toLowerCase());
  const tags = project.tags.map((tag) => tag.toLowerCase());
  const genre = project.genre.toLowerCase();
  const role = project.role.toLowerCase();

  if (filter === 'mobile') {
    return platforms.some((platform) => ['android', 'ios', 'mobile'].includes(platform)) || tags.includes('mobile');
  }

  if (filter === 'pc-web') {
    return platforms.some((platform) => platform === 'pc' || platform === 'web');
  }

  if (filter === 'ar') {
    return genre.includes('augmented') || tags.includes('ar');
  }

  if (filter === 'simulation') {
    return genre.includes('simulation') || tags.includes('simulation');
  }

  return tags.includes('management') || role.includes('managed') || role.includes('lead');
}

const projectFilterOptions = projectFilters.map((filter) => ({
  ...filter,
  count: projects.filter((project) => matchesProjectFilter(project, filter.id)).length,
}));

function iconForLink(kind: LinkKind) {
  if (kind === 'play') return <SiGoogleplay aria-hidden="true" />;
  if (kind === 'appstore') return <FaApple aria-hidden="true" />;
  if (kind === 'itch') return <SiItchdotio aria-hidden="true" />;
  if (kind === 'drive') return <FaGoogleDrive aria-hidden="true" />;
  if (kind === 'github') return <FaGithub aria-hidden="true" />;
  return <FaExternalLinkAlt aria-hidden="true" />;
}

function labelForLink(kind: LinkKind) {
  if (kind === 'play') return 'Play Store';
  if (kind === 'appstore') return 'App Store';
  if (kind === 'itch') return 'itch.io';
  if (kind === 'drive') return 'Google Drive';
  if (kind === 'github') return 'GitHub';
  return 'Open link';
}

function ProjectCard({
  project,
  compact = false,
  index = 0,
  onOpen,
}: {
  project: Project;
  compact?: boolean;
  index?: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <article
      className={compact ? 'project-card featured-card' : 'project-card library-card'}
      data-link-kind={project.linkKind}
      data-reveal="card"
      style={revealStyle(index % 6)}
      tabIndex={compact ? undefined : 0}
    >
      <div className="project-media" aria-hidden="true">
        <img
          src={project.imageUrl}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = '/ah-mark.svg';
          }}
        />
      </div>
      <div className="project-body">
        <div className="project-kicker">
          <span>{project.year}</span>
          <span>{project.genre}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-platforms">{project.platforms.join(' / ')}</p>
        <div className="project-details">
          <p>{project.description}</p>
          <p className="role-copy">{project.role}</p>
          <div className="tag-row" aria-label={`${project.title} tags`}>
            {project.tags.map((tag) => (
              <span key={`${project.title}-${tag}`}>{tag}</span>
            ))}
          </div>
          {project.note ? <p className="project-note">{project.note}</p> : null}
        </div>
        <div className="project-actions">
          <a className="icon-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`${labelForLink(project.linkKind)} link for ${project.title}`}>
            {iconForLink(project.linkKind)}
            <span>{labelForLink(project.linkKind)}</span>
          </a>
          <button className="detail-button" type="button" onClick={() => onOpen(project)} aria-label={`Open project details for ${project.title}`} title="Project details">
            <FaInfoCircle aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectDetailsDrawer({
  project,
  projectList,
  onClose,
  onSelectProject,
}: {
  project: Project | null;
  projectList: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasFocusedDrawerRef = useRef(false);

  useEffect(() => {
    if (!project) {
      hasFocusedDrawerRef.current = false;
      return;
    }

    if (project) {
      if (hasFocusedDrawerRef.current) return;

      closeButtonRef.current?.focus();
      hasFocusedDrawerRef.current = true;
    }
  }, [project]);

  if (!project) return null;

  const projectIndex = projectList.findIndex((item) => item.title === project.title);
  const projectPosition = projectIndex >= 0 ? projectIndex + 1 : 1;
  const hasPreviousProject = projectIndex > 0;
  const hasNextProject = projectIndex >= 0 && projectIndex < projectList.length - 1;
  const previousProject = hasPreviousProject ? projectList[projectIndex - 1] : null;
  const nextProject = hasNextProject ? projectList[projectIndex + 1] : null;

  return (
    <div className="case-drawer-layer">
      <button className="drawer-backdrop" type="button" onClick={onClose} aria-label="Close project details" />
      <aside className="case-drawer" role="dialog" aria-modal="true" aria-labelledby="case-drawer-title">
        <header className="case-header">
          <div>
            <p className="eyebrow">Project {projectPosition} of {projectList.length}</p>
            <h2 id="case-drawer-title">{project.title}</h2>
            <div className="case-pill-row" aria-label={`${project.title} quick facts`}>
              <span>{project.year}</span>
              <span>{project.genre}</span>
              <span>{project.platforms.join(' / ')}</span>
            </div>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close project details" ref={closeButtonRef}>
            <FaTimes aria-hidden="true" />
          </button>
        </header>

        <div className="case-hero">
          <div className="case-hero-art" aria-hidden="true">
            <img
              src={project.imageUrl}
              alt=""
              onError={(event) => {
                event.currentTarget.src = '/ah-mark.svg';
              }}
            />
          </div>
          <div className="case-hero-copy">
            <span>Overview</span>
            <p>{project.description}</p>
          </div>
        </div>

        <div className="case-facts" aria-label={`${project.title} project facts`}>
          <div>
            <span>Year</span>
            <strong>{project.year}</strong>
          </div>
          <div>
            <span>Genre</span>
            <strong>{project.genre}</strong>
          </div>
          <div>
            <span>Platforms</span>
            <strong>{project.platforms.join(', ')}</strong>
          </div>
          <div>
            <span>Link</span>
            <strong>{labelForLink(project.linkKind)}</strong>
          </div>
        </div>

        <div className="case-section-grid">
          <section className="case-section">
            <span>My Role</span>
            <p>{project.role}</p>
          </section>

          <section className="case-section">
            <span>Systems</span>
            <p>{project.tags.join(', ')}</p>
          </section>
        </div>

        <div className="tag-row case-tags" aria-label={`${project.title} tags`}>
          {project.tags.map((tag) => (
            <span key={`case-${project.title}-${tag}`}>{tag}</span>
          ))}
        </div>

        {project.note ? <p className="project-note case-note">{project.note}</p> : null}

        <div className="case-actions">
          <a className="button primary" href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${labelForLink(project.linkKind)} for ${project.title}`}>
            {iconForLink(project.linkKind)}
            {labelForLink(project.linkKind)}
          </a>
          <div className="drawer-nav" aria-label="Browse project details">
            <button
              className="nav-project-button"
              type="button"
              onClick={() => previousProject && onSelectProject(previousProject)}
              disabled={!previousProject}
              aria-label={previousProject ? `Previous project: ${previousProject.title}` : 'No previous project'}
            >
              <FaChevronLeft aria-hidden="true" />
              <span>
                <small>Previous</small>
                {previousProject ? previousProject.title : 'Start'}
              </span>
            </button>
            <button
              className="nav-project-button"
              type="button"
              onClick={() => nextProject && onSelectProject(nextProject)}
              disabled={!nextProject}
              aria-label={nextProject ? `Next project: ${nextProject.title}` : 'No next project'}
            >
              <span>
                <small>Next</small>
                {nextProject ? nextProject.title : 'End'}
              </span>
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerProjectList, setDrawerProjectList] = useState<Project[]>(projects);
  const activeSection = useActiveSection(navSectionIds);
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesProjectFilter(project, activeFilter)),
    [activeFilter],
  );

  useRevealMotion(activeFilter);

  const openProjectDetails = (project: Project, projectList: Project[]) => {
    setDrawerProjectList(projectList);
    setSelectedProject(project);
  };

  const switchTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 340);
    setTheme(nextTheme);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="topbar section-shell">
          <a className="brand" href="#top" aria-label="Amin Hanif home">
            AH
          </a>
          <div className="header-actions">
            <nav aria-label="Primary navigation">
              {navItems.map((item) => (
                <a
                  className={activeSection === item.id ? 'is-active' : undefined}
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  key={item.id}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              className="theme-toggle"
              type="button"
              onClick={switchTheme}
              aria-label={`Switch to ${nextTheme} mode`}
            >
              {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="intro section-shell">
          <div className="intro-copy" data-reveal="hero" style={revealStyle(0)}>
            <p className="eyebrow">Unity Game Developer | Technical Initiative Lead</p>
            <h1>Amin Hanif</h1>
            <p className="lead">
              I build mobile, PC, web, AR, and simulation games from prototype through release,
              combining hands-on Unity development with technical planning, review, and production support.
            </p>
            <p className="availability-pill">
              <span aria-hidden="true" />
              Available for work
            </p>
            <div className="action-row" aria-label="Primary links">
              <a className="button primary" href={profile.resume} target="_blank" rel="noreferrer">
                <FaFilePdf aria-hidden="true" />
                Resume
              </a>
              <a className="button secondary" href={profile.portfolio} target="_blank" rel="noreferrer">
                <FaGamepad aria-hidden="true" />
                Portfolio
              </a>
              <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <FaGithub aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>

          <aside className="profile-panel" data-reveal="hero" style={revealStyle(1)} aria-label="Profile summary">
            <img src="/images/photo.jpg" alt="Amin Hanif" />
            <div>
              <p className="profile-name">{profile.title}</p>
              <p className="profile-location">
                <FaMapMarkerAlt aria-hidden="true" />
                {profile.location}
              </p>
            </div>
            <div className="hero-project-strip" aria-hidden="true">
              {heroPreviewProjects.map((project) => (
                <span key={`hero-${project.title}`}>
                  <img
                    src={project.imageUrl}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.src = '/ah-mark.svg';
                    }}
                  />
                </span>
              ))}
            </div>
          </aside>
        </section>

        <section className="stats-band" aria-label="Portfolio statistics">
          <div className="stats-grid section-shell">
            {stats.map((item, index) => (
              <div className="stat-item" data-reveal="item" style={revealStyle(index)} key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell current-work" id="work">
          <div className="section-heading" data-reveal="section">
            <p className="eyebrow">Current Work</p>
            <h2>Current roles across technical leadership and shipped mobile game systems.</h2>
          </div>
          <div className="current-layout">
            {currentRoles.map((experience, index) => (
              <article className="current-summary" data-reveal="card" style={revealStyle(index)} key={experience.company}>
                <span>{experience.company}</span>
                <h3>{experience.title}</h3>
                <p className="current-meta">{experience.period} | {experience.location}</p>
                <p>{experience.focus}</p>
                <ul>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="section-heading" data-reveal="section">
            <p className="eyebrow">Featured Work</p>
            <h2>Featured games across studio, indie, and contract work.</h2>
          </div>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                compact
                index={index}
                onOpen={(projectToOpen) => openProjectDetails(projectToOpen, featuredProjects)}
              />
            ))}
          </div>
        </section>

        <section className="section-shell projects-section" id="projects">
          <div className="section-heading" data-reveal="section">
            <p className="eyebrow">Project Library</p>
            <h2>Mobile, web, PC, AR, Web3, and simulation projects.</h2>
          </div>
          <div className="project-toolbar" data-reveal="item" style={revealStyle(0)}>
            <div className="filter-heading">
              <FaFilter aria-hidden="true" />
              <span>{filteredProjects.length} of {projects.length} projects</span>
            </div>
            <div className="filter-group" aria-label="Filter projects">
              {projectFilterOptions.map((filter) => (
                <button
                  className={activeFilter === filter.id ? 'filter-button is-active' : 'filter-button'}
                  type="button"
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  <span>{filter.label}</span>
                  <strong>{filter.count}</strong>
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid" key={activeFilter}>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${activeFilter}-${project.title}`}
                project={project}
                index={index}
                onOpen={(projectToOpen) => openProjectDetails(projectToOpen, filteredProjects)}
              />
            ))}
          </div>
        </section>

        <section className="section-shell experience-section" id="experience">
          <div className="section-heading" data-reveal="section">
            <p className="eyebrow">Experience</p>
            <h2>Recent roles across initiative leadership, studio work, and indie production.</h2>
          </div>
          <div className="timeline">
            {experiences.map((experience, index) => (
              <article className="timeline-item" data-reveal="item" style={revealStyle(index)} key={experience.company}>
                <div className="timeline-date">{experience.period}</div>
                <div className="timeline-card">
                  <span>{experience.location}</span>
                  <h3>{experience.company}</h3>
                  <p className="timeline-title">{experience.title}</p>
                  <p>{experience.focus}</p>
                  <ul>
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell proof-section">
          <div className="skills-panel" data-reveal="card" style={revealStyle(0)}>
            <p className="eyebrow">Core Stack</p>
            <h2>Unity-first, production-minded.</h2>
            <div className="skill-cloud">
              {[
                'Unity',
                'C#',
                'GitHub',
                'RFC Documents',
                'Gameplay Systems',
                'Mobile SDKs',
                'Photon',
                'Firebase',
                'AR',
                'Optimization',
                'QA Support',
                'Team Review',
              ].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="awards-panel" data-reveal="card" style={revealStyle(1)}>
            <p className="eyebrow">
              <FaTrophy aria-hidden="true" />
              Recognition
            </p>
            <h2>Selected awards and event results.</h2>
            <ol className="award-timeline">
              {visibleAwards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ol>
            {additionalAwards.length > 0 ? (
              <details className="award-details">
                <summary>
                  <span className="summary-more">Show {additionalAwards.length} more awards</span>
                  <span className="summary-less">Show fewer awards</span>
                </summary>
                <ol className="award-timeline award-timeline-extra">
                  {additionalAwards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ol>
              </details>
            ) : null}
          </div>
        </section>

        <section className="section-shell contact-section" id="contact" data-reveal="section">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Open to remote game development opportunities.</h2>
          </div>
          <div className="contact-actions">
            <a className="button primary" href={`mailto:${profile.email}`}>
              <FaEnvelope aria-hidden="true" />
              Email
            </a>
            <a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </a>
            <a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" />
              GitHub
            </a>
          </div>
        </section>
      </main>
      <ProjectDetailsDrawer
        project={selectedProject}
        projectList={drawerProjectList}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </div>
  );
}

export default App;
