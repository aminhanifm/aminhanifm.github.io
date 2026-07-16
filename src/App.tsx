import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, LazyMotion, LayoutGroup, MotionConfig, type Variants } from 'motion/react';
import * as m from 'motion/react-m';
import {
  FaApple,
  FaCheck,
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
  FaLink,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
  FaTimes,
  FaTrophy,
} from 'react-icons/fa';
import { SiGoogleplay, SiItchdotio } from 'react-icons/si';
import { trackEvent } from './analytics';
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
type ProjectDetailSource = 'featured_work' | 'project_library' | 'project_detail_drawer';
type ProjectDetailCloseMethod = 'backdrop' | 'button' | 'escape' | 'browser_back';
type ProjectBrowseDirection = 'previous' | 'next';

type RevealStyle = CSSProperties & {
  '--reveal-index'?: number;
};

type PortfolioHistoryState = {
  aminPortfolioDrawer?: boolean;
};

const PROJECT_QUERY_PARAM = 'project';
const loadMotionFeatures = () => import('./motionFeatures').then((module) => module.default);

const drawerLayerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const drawerBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

const drawerPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 42,
    scale: 0.985,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 360, damping: 34, mass: 0.82 },
  },
};

const drawerContentVariants: Variants = {
  enter: (direction: ProjectBrowseDirection | null) => ({
    opacity: 0,
    x: direction === 'previous' ? -24 : direction === 'next' ? 24 : 0,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 420, damping: 38, mass: 0.72 },
  },
  exit: (direction: ProjectBrowseDirection | null) => ({
    opacity: 0,
    x: direction === 'previous' ? 18 : direction === 'next' ? -18 : 0,
    transition: { duration: 0.14, ease: 'easeIn' },
  }),
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

function projectSlug(project: Project) {
  return project.title
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function projectFromLocation() {
  if (typeof window === 'undefined') return null;

  const slug = new URL(window.location.href).searchParams.get(PROJECT_QUERY_PARAM);
  return slug ? projects.find((project) => projectSlug(project) === slug) ?? null : null;
}

function createProjectUrl(project: Project) {
  const url = new URL(window.location.href);
  url.searchParams.set(PROJECT_QUERY_PARAM, projectSlug(project));
  return url.toString();
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through for browsers that expose the API but block access.
    }
  }

  const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand('copy');
  textarea.remove();
  activeElement?.focus({ preventScroll: true });

  if (!copied) throw new Error('Unable to copy project link.');
}

function updateProjectLocation(project: Project | null, mode: 'push' | 'replace', openedByPortfolio = false) {
  const url = new URL(window.location.href);
  const currentState = window.history.state && typeof window.history.state === 'object'
    ? window.history.state
    : {};
  const nextState: PortfolioHistoryState & Record<string, unknown> = { ...currentState };

  if (project) {
    url.searchParams.set(PROJECT_QUERY_PARAM, projectSlug(project));
    nextState.aminPortfolioDrawer = openedByPortfolio;
  } else {
    url.searchParams.delete(PROJECT_QUERY_PARAM);
    delete nextState.aminPortfolioDrawer;
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;

  if (mode === 'push') {
    window.history.pushState(nextState, '', nextUrl);
  } else {
    window.history.replaceState(nextState, '', nextUrl);
  }
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

function trackProjectLinkClick(project: Project, source: ProjectDetailSource) {
  trackEvent('project_link_click', {
    project_title: project.title,
    project_year: project.year,
    link_kind: project.linkKind,
    link_label: labelForLink(project.linkKind),
    source,
  });
}

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  index?: number;
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
};

const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard({
  project,
  compact = false,
  index = 0,
  onOpen,
}, ref) {
  const trackingSource: ProjectDetailSource = compact ? 'featured_work' : 'project_library';
  const revealDelay = compact ? (index % 6) * 0.055 : 0;

  return (
    <m.article
      ref={ref}
      layout={compact ? undefined : 'position'}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      exit={compact ? undefined : { opacity: 0, y: 6, transition: { duration: 0.16, ease: 'easeOut' } }}
      whileHover={{ y: -3 }}
      whileFocus={{ y: -3 }}
      transition={{
        layout: { type: 'spring', stiffness: 420, damping: 38, mass: 0.72 },
        opacity: { duration: 0.22, delay: revealDelay },
        y: { type: 'spring', stiffness: 420, damping: 34, mass: 0.68, delay: revealDelay },
      }}
      className={compact ? 'project-card featured-card' : 'project-card library-card'}
      data-link-kind={project.linkKind}
      data-project-slug={projectSlug(project)}
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
          <a
            className="icon-link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${labelForLink(project.linkKind)} link for ${project.title}`}
            onClick={() => trackProjectLinkClick(project, trackingSource)}
          >
            {iconForLink(project.linkKind)}
            <span>{labelForLink(project.linkKind)}</span>
          </a>
          <button className="detail-button" type="button" onClick={(event) => onOpen(project, event.currentTarget)} aria-label={`Open project details for ${project.title}`} title="Project details">
            <FaInfoCircle aria-hidden="true" />
          </button>
        </div>
      </div>
    </m.article>
  );
});

function ProjectDetailsDrawer({
  project,
  projectList,
  browseDirection,
  onClose,
  onSelectProject,
}: {
  project: Project;
  projectList: Project[];
  browseDirection: ProjectBrowseDirection | null;
  onClose: (method: ProjectDetailCloseMethod) => void;
  onSelectProject: (project: Project, direction: ProjectBrowseDirection) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const copyTimerRef = useRef<number | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveMediaIndex(0);
    setCopied(false);
    if (drawerRef.current) drawerRef.current.scrollTop = 0;

    const focusFrame = window.requestAnimationFrame(() => {
      if (!drawerRef.current?.contains(document.activeElement)) {
        closeButtonRef.current?.focus();
      }
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [project?.title]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return undefined;

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    drawer.addEventListener('keydown', trapFocus);
    return () => drawer.removeEventListener('keydown', trapFocus);
  }, [project]);

  useEffect(() => () => {
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
  }, []);

  const projectIndex = projectList.findIndex((item) => item.title === project.title);
  const projectPosition = projectIndex >= 0 ? projectIndex + 1 : 1;
  const hasPreviousProject = projectIndex > 0;
  const hasNextProject = projectIndex >= 0 && projectIndex < projectList.length - 1;
  const previousProject = hasPreviousProject ? projectList[projectIndex - 1] : null;
  const nextProject = hasNextProject ? projectList[projectIndex + 1] : null;
  const mediaItems = project.gallery?.length
    ? project.gallery
    : [{ src: project.imageUrl, alt: `${project.title} project artwork` }];
  const currentMediaIndex = Math.min(activeMediaIndex, mediaItems.length - 1);
  const currentMedia = mediaItems[currentMediaIndex];
  const hasGameplayGallery = Boolean(project.gallery?.length);

  const copyProjectLink = async () => {
    try {
      await copyTextToClipboard(createProjectUrl(project));
      setCopied(true);
      trackEvent('project_share_copy', {
        project_title: project.title,
        project_year: project.year,
      });

      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <m.div
      className="case-drawer-layer"
      variants={drawerLayerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <m.button className="drawer-backdrop" variants={drawerBackdropVariants} type="button" onClick={() => onClose('backdrop')} aria-hidden="true" tabIndex={-1} />
      <m.aside className="case-drawer" variants={drawerPanelVariants} role="dialog" aria-modal="true" aria-labelledby="case-drawer-title" ref={drawerRef}>
        <button className="icon-button case-close-button" type="button" onClick={() => onClose('button')} aria-label="Close project details" ref={closeButtonRef}>
          <FaTimes aria-hidden="true" />
        </button>

        <AnimatePresence initial={false} mode="wait" custom={browseDirection}>
          <m.div
            className="case-drawer-content"
            key={project.title}
            custom={browseDirection}
            variants={drawerContentVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
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
        </header>

        <div className={hasGameplayGallery ? 'case-showcase has-gallery' : 'case-showcase artwork-only'}>
          <div className="case-media-stage">
            <AnimatePresence initial={false} mode="wait">
              <m.div
                className="case-media-frame"
                key={currentMedia.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {hasGameplayGallery ? (
                  <img
                    className="case-media-backdrop"
                    src={currentMedia.src}
                    alt=""
                    aria-hidden="true"
                  />
                ) : null}
                <img
                  className="case-media-foreground"
                  src={currentMedia.src}
                  alt={currentMedia.alt}
                  onError={(event) => {
                    event.currentTarget.src = '/ah-mark.svg';
                  }}
                />
              </m.div>
            </AnimatePresence>
            <div className="case-media-meta" aria-hidden="true">
              <span>{hasGameplayGallery ? 'Gameplay gallery' : 'Project artwork'}</span>
              <strong>{currentMediaIndex + 1} / {mediaItems.length}</strong>
            </div>
          </div>

          {hasGameplayGallery ? (
            <div className="case-media-thumbnails" aria-label={`${project.title} gameplay gallery`}>
              {mediaItems.map((media, index) => (
                <button
                  className={index === currentMediaIndex ? 'is-active' : undefined}
                  type="button"
                  key={media.src}
                  onClick={() => setActiveMediaIndex(index)}
                  aria-label={`Show ${project.title} screenshot ${index + 1}`}
                  aria-pressed={index === currentMediaIndex}
                >
                  <img
                    src={media.src}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = '/ah-mark.svg';
                    }}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="case-overview">
            <span>Overview</span>
            <p>{project.description}</p>
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
          <div className="case-primary-actions">
            <a
              className="button primary"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${labelForLink(project.linkKind)} for ${project.title}`}
              onClick={() => trackProjectLinkClick(project, 'project_detail_drawer')}
            >
              {iconForLink(project.linkKind)}
              {labelForLink(project.linkKind)}
            </a>
            <button className="button ghost" type="button" onClick={() => void copyProjectLink()} aria-live="polite">
              {copied ? <FaCheck aria-hidden="true" /> : <FaLink aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy link'}
            </button>
          </div>
          <div className="drawer-nav" aria-label="Browse project details">
            <button
              className="nav-project-button"
              type="button"
              onClick={() => previousProject && onSelectProject(previousProject, 'previous')}
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
              onClick={() => nextProject && onSelectProject(nextProject, 'next')}
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
          </m.div>
        </AnimatePresence>
      </m.aside>
    </m.div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => projectFromLocation());
  const [drawerProjectList, setDrawerProjectList] = useState<Project[]>(projects);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);
  const [drawerBrowseDirection, setDrawerBrowseDirection] = useState<ProjectBrowseDirection | null>(null);
  const selectedProjectRef = useRef<Project | null>(selectedProject);
  const isDrawerClosingRef = useRef(false);
  const pendingCloseMethodRef = useRef<ProjectDetailCloseMethod | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const activeSection = useActiveSection(navSectionIds);
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesProjectFilter(project, activeFilter)),
    [activeFilter],
  );

  useRevealMotion(activeFilter);

  selectedProjectRef.current = selectedProject;

  useEffect(() => {
    if (selectedProject || isDrawerClosing) return undefined;

    const focusTarget = lastFocusedElementRef.current;
    if (!focusTarget) return undefined;

    lastFocusedElementRef.current = null;
    const focusTimer = window.setTimeout(() => {
      if (focusTarget.isConnected) focusTarget.focus({ preventScroll: true });
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [isDrawerClosing, selectedProject]);

  const cancelDrawerClose = useCallback(() => {
    isDrawerClosingRef.current = false;
    setIsDrawerClosing(false);
  }, []);

  const finishDrawerClose = useCallback(() => {
    isDrawerClosingRef.current = false;
    setIsDrawerClosing(false);
  }, []);

  const beginDrawerClose = useCallback((method: ProjectDetailCloseMethod) => {
    const projectToClose = selectedProjectRef.current;
    if (!projectToClose || isDrawerClosingRef.current) return;

    trackEvent('project_detail_close', {
      project_title: projectToClose.title,
      close_method: method,
    });

    isDrawerClosingRef.current = true;
    setIsDrawerClosing(true);
    selectedProjectRef.current = null;
    setSelectedProject(null);
    setDrawerBrowseDirection(null);
  }, []);

  const openProjectDetails = (project: Project, projectList: Project[], source: ProjectDetailSource, trigger?: HTMLElement) => {
    trackEvent('project_detail_open', {
      project_title: project.title,
      project_year: project.year,
      source,
    });

    if (!selectedProjectRef.current) {
      lastFocusedElementRef.current = trigger
        ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    }

    cancelDrawerClose();
    setDrawerProjectList(projectList);
    setDrawerBrowseDirection(null);
    selectedProjectRef.current = project;
    setSelectedProject(project);
    updateProjectLocation(project, 'push', true);
  };

  const closeProjectDetails = useCallback((method: ProjectDetailCloseMethod) => {
    if (!selectedProjectRef.current || isDrawerClosingRef.current) return;

    const historyState = window.history.state as PortfolioHistoryState | null;
    const hasProjectParameter = new URL(window.location.href).searchParams.has(PROJECT_QUERY_PARAM);

    if (historyState?.aminPortfolioDrawer && hasProjectParameter) {
      pendingCloseMethodRef.current = method;
      window.history.back();
      return;
    }

    pendingCloseMethodRef.current = null;
    updateProjectLocation(null, 'replace');
    beginDrawerClose(method);
  }, [beginDrawerClose]);

  const selectProjectFromDrawer = (project: Project, direction: ProjectBrowseDirection) => {
    trackEvent('project_detail_browse', {
      from_project_title: selectedProject?.title,
      project_title: project.title,
      direction,
    });

    cancelDrawerClose();
    setDrawerBrowseDirection(direction);
    selectedProjectRef.current = project;
    setSelectedProject(project);
    const historyState = window.history.state as PortfolioHistoryState | null;
    updateProjectLocation(project, 'replace', Boolean(historyState?.aminPortfolioDrawer));
  };

  const selectProjectFilter = (filterId: ProjectFilterId) => {
    const filter = projectFilterOptions.find((item) => item.id === filterId);

    trackEvent('project_filter_click', {
      filter_id: filterId,
      filter_label: filter?.label,
      project_count: filter?.count,
    });

    if (filterId === activeFilter) return;
    setActiveFilter(filterId);
  };

  const switchTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 340);
    trackEvent('theme_toggle', {
      theme_from: theme,
      theme_to: nextTheme,
    });
    setTheme(nextTheme);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onPopState = () => {
      const projectFromUrl = projectFromLocation();

      if (projectFromUrl) {
        cancelDrawerClose();
        setDrawerProjectList(projects);
        setDrawerBrowseDirection('next');
        selectedProjectRef.current = projectFromUrl;
        setSelectedProject(projectFromUrl);
        return;
      }

      if (selectedProjectRef.current) {
        const closeMethod = pendingCloseMethodRef.current ?? 'browser_back';
        pendingCloseMethodRef.current = null;
        beginDrawerClose(closeMethod);
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [beginDrawerClose, cancelDrawerClose]);

  useEffect(() => {
    const drawerLayerActive = Boolean(selectedProject) || isDrawerClosing;
    if (!drawerLayerActive) return undefined;

    const previousOverflow = document.body.style.overflow;
    const inertElements = Array.from(document.querySelectorAll<HTMLElement>('.site-header, main'));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectDetails('escape');
      }
    };

    document.body.style.overflow = 'hidden';
    inertElements.forEach((element) => element.setAttribute('inert', ''));
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      inertElements.forEach((element) => element.removeAttribute('inert'));
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeProjectDetails, isDrawerClosing, selectedProject]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <div className="site-shell">
      <header className="site-header">
        <div className="topbar section-shell">
          <a
            className="brand"
            href="#top"
            aria-label="Amin Hanif home"
            onClick={() => trackEvent('site_navigation_click', { target_section: 'top', source: 'header_brand' })}
          >
            AH
          </a>
          <div className="header-actions">
            <nav aria-label="Primary navigation">
              {navItems.map((item) => (
                <a
                  className={activeSection === item.id ? 'is-active' : undefined}
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  onClick={() => trackEvent('site_navigation_click', { target_section: item.id, source: 'header_nav' })}
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
              <a
                className="button primary"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('resume_click', { source: 'hero', document_type: 'resume' })}
              >
                <FaFilePdf aria-hidden="true" />
                Resume
              </a>
              <a
                className="button secondary"
                href={profile.portfolio}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('portfolio_click', { source: 'hero', document_type: 'portfolio' })}
              >
                <FaGamepad aria-hidden="true" />
                Portfolio
              </a>
              <a
                className="button ghost"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                onClick={() => trackEvent('external_profile_click', { profile_link: 'github', source: 'hero' })}
              >
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
                onOpen={(projectToOpen, trigger) => openProjectDetails(projectToOpen, featuredProjects, 'featured_work', trigger)}
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
            <div className="filter-heading" aria-live="polite">
              <FaFilter aria-hidden="true" />
              <span>{filteredProjects.length} of {projects.length} projects</span>
            </div>
            <div className="filter-group" aria-label="Filter projects">
              {projectFilterOptions.map((filter) => (
                <button
                  className={activeFilter === filter.id ? 'filter-button is-active' : 'filter-button'}
                  type="button"
                  key={filter.id}
                  onClick={() => selectProjectFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  <span>{filter.label}</span>
                  <strong>{filter.count}</strong>
                </button>
              ))}
            </div>
          </div>
          <LayoutGroup id="project-library">
            <m.div className="project-grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    onOpen={(projectToOpen, trigger) => openProjectDetails(projectToOpen, filteredProjects, 'project_library', trigger)}
                  />
                ))}
              </AnimatePresence>
            </m.div>
          </LayoutGroup>
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
              <details
                className="award-details"
                onToggle={(event) =>
                  trackEvent('awards_toggle', {
                    state: event.currentTarget.open ? 'open' : 'closed',
                    awards_count: additionalAwards.length,
                  })
                }
              >
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
            <a
              className="button primary"
              href={`mailto:${profile.email}`}
              onClick={() => trackEvent('contact_click', { contact_method: 'email', source: 'contact' })}
            >
              <FaEnvelope aria-hidden="true" />
              Email
            </a>
            <a
              className="button secondary"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('contact_click', { contact_method: 'linkedin', source: 'contact' })}
            >
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </a>
            <a
              className="button ghost"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('contact_click', { contact_method: 'github', source: 'contact' })}
            >
              <FaGithub aria-hidden="true" />
              GitHub
            </a>
          </div>
        </section>
      </main>
          <AnimatePresence onExitComplete={finishDrawerClose}>
            {selectedProject ? (
              <ProjectDetailsDrawer
                key="project-details-drawer"
                project={selectedProject}
                projectList={drawerProjectList}
                browseDirection={drawerBrowseDirection}
                onClose={closeProjectDetails}
                onSelectProject={selectProjectFromDrawer}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
