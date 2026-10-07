'use client';

import React, { useEffect, useMemo, useState } from 'react';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SoundEffects from '@/components/SoundEffects';
import { OUR_WORKS, COMPANIES_WE_WORKED_WITH, WORK_CATEGORIES } from '@/lib/data';

const CONTACT_EMAIL = 'arclume.us@gmail.com';

const matchesQuery = (project, q) => {
    if (!q) return true;
    return [
        project.title,
        project.client,
        project.subtitle,
        project.category,
        project.kind,
        ...(project.technologies || []),
        ...(project.deliverables || []),
    ].some((text) => text && text.toLowerCase().includes(q));
};

/**
 * The picture area of a card / popup. Three ways to fill it (set per project
 * in lib/data.js): a logo centred on a colour, a screenshot that fills the
 * frame, or — with no image at all — the project name set large.
 */
function ProjectCover({ project, className = '' }) {
    const fit = project.image ? (project.imageFit || 'contain') : 'type';
    const style = {
        '--cover-bg': project.coverBg || 'var(--color-black-deep)',
        '--cover-ink': project.coverInk || '#ffffff',
    };

    return (
        <div className={`project-cover project-cover--${fit} ${className}`} style={style}>
            {fit === 'type' ? (
                <div className="project-cover__type" aria-hidden="true">
                    <span className="project-cover__type-name">{project.client}</span>
                    <span className="project-cover__type-rule"></span>
                    <span className="project-cover__type-kind">{project.category}</span>
                </div>
            ) : (
                <img
                    src={project.image}
                    alt={`${project.client} — ${project.title}`}
                    className="project-cover__img"
                    loading="lazy"
                />
            )}
        </div>
    );
}

function ProjectCard({ project, actionLabel, onOpen, featured = false }) {
    const chip = project.highlight || project.impact;

    return (
        <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
            <button
                type="button"
                className="project-card__hit"
                onClick={() => onOpen(project)}
                aria-label={`${project.client}: ${project.title} — ${actionLabel}`}
            ></button>

            <div className="project-card__image-holder">
                <ProjectCover project={project} />
                <span className={`project-card__badge ${project.badgeClass || ''}`}>{project.client}</span>
                {chip && <span className="project-card__impact-tag">{chip}</span>}
            </div>

            <div className="project-card__content">
                {project.kind && <span className="project-card__kind">{project.kind}</span>}
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__subtitle">{project.subtitle}</p>

                <div className="project-card__tags">
                    {project.deliverables.slice(0, 4).map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                </div>

                <div className="project-card__action">
                    <span>{actionLabel}</span>
                    <div className="project-card__arrow" aria-hidden="true">→</div>
                </div>
            </div>
        </article>
    );
}

function EmptyState({ title, hint }) {
    return (
        <div className="work-empty">
            <h3>{title}</h3>
            <p>{hint}</p>
        </div>
    );
}

export default function WorkPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const q = searchQuery.trim().toLowerCase();

    // Only offer filters that actually have projects behind them.
    const categories = useMemo(() => [
        { label: 'All work', slug: 'all', count: OUR_WORKS.length },
        ...WORK_CATEGORIES
            .map((cat) => ({ ...cat, count: OUR_WORKS.filter((p) => p.categorySlug === cat.slug).length }))
            .filter((cat) => cat.count > 0),
    ], []);

    const filteredOurWorks = useMemo(() => OUR_WORKS.filter((project) => (
        (activeFilter === 'all' || project.categorySlug === activeFilter) && matchesQuery(project, q)
    )), [activeFilter, q]);

    // The first project gets a full-width lead card on the unfiltered view.
    const showFeatured = activeFilter === 'all' && !q;

    const filteredPartners = useMemo(
        () => COMPANIES_WE_WORKED_WITH.filter((project) => matchesQuery(project, q)),
        [q]
    );

    // Popup: Esc closes it, and the page behind stops scrolling while it's open.
    useEffect(() => {
        if (!selectedProject) return undefined;

        const onKey = (e) => { if (e.key === 'Escape') setSelectedProject(null); };
        window.addEventListener('keydown', onKey);
        window.__lenis?.stop();
        document.body.classList.add('is-modal-open');

        return () => {
            window.removeEventListener('keydown', onKey);
            window.__lenis?.start();
            document.body.classList.remove('is-modal-open');
        };
    }, [selectedProject]);

    const mailto = (project) => {
        const subject = encodeURIComponent(`Project inquiry — something like ${project.client}`);
        const body = encodeURIComponent(`Hi arclume! I saw your work on ${project.client} and would like to talk about something similar.`);
        return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <SoundEffects />
            <header className="main-header" style={{ height: 'auto' }}>
                <Navbar />
            </header>

            <main className="work-page-wrapper">
                {/* ─── Hero Header ───────────────────────────────────────────── */}
                <section className="work-hero">
                    <div className="work-hero__badge-header">
                        <img
                            src="/assets/Navbar SVG/nav-work-blob.svg"
                            alt=""
                            className="work-hero__star-icon"
                        />
                        <span className="work-hero__badge-text">products, client builds & partners</span>
                    </div>

                    <h1 className="work-hero__title">
                        all our <span className="highlight">work.</span>
                    </h1>

                    <p className="work-hero__subtitle">
                        AI platforms, web experiences and tools we've designed and shipped — for clients, and for ourselves.
                    </p>

                    <ul className="work-hero__counts">
                        <li><strong>{OUR_WORKS.length}</strong> builds</li>
                        <li><strong>{COMPANIES_WE_WORKED_WITH.length}</strong> partner brands</li>
                        <li><strong>{categories.length - 1}</strong> disciplines</li>
                    </ul>
                </section>

                {/* ─── SECTION 1: Our Works ──────────────────────────────────── */}
                <section className="work-section-block">
                    <div className="work-section-header">
                        <div className="work-section-top">
                            <div>
                                <h2 className="work-section-title">
                                    our works.
                                    <span className="section-tag">built by arclume</span>
                                </h2>
                                <p className="work-section-desc">
                                    Open any card for the story, the stack and the code.
                                </p>
                            </div>

                            <div className="work-search-box">
                                <svg
                                    className="work-search-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="search"
                                    placeholder="Search by name, tech or keyword…"
                                    aria-label="Search work"
                                    className="work-search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="work-filters" role="group" aria-label="Filter work by discipline">
                            {categories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    type="button"
                                    className={`filter-btn ${activeFilter === cat.slug ? 'active' : ''}`}
                                    aria-pressed={activeFilter === cat.slug}
                                    onClick={() => setActiveFilter(cat.slug)}
                                >
                                    {cat.label}
                                    <span className="filter-btn__count">{cat.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredOurWorks.length === 0 ? (
                        <EmptyState
                            title="nothing matches that yet"
                            hint="Try another discipline or clear the search."
                        />
                    ) : (
                        <div className="work-grid">
                            {filteredOurWorks.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    featured={showFeatured && index === 0}
                                    actionLabel="View case study"
                                    onOpen={setSelectedProject}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <hr className="work-divider" />

                {/* ─── SECTION 2: Companies we worked with ───────────────────── */}
                <section className="work-section-block">
                    <div className="work-section-header">
                        <h2 className="work-section-title">
                            companies we worked with.
                            <span className="section-tag section-tag--blue">partners</span>
                        </h2>
                        <p className="work-section-desc">
                            Brands we've partnered with and built for.
                        </p>
                    </div>

                    {filteredPartners.length === 0 ? (
                        <EmptyState title="no partners match that" hint="Try clearing the search." />
                    ) : (
                        <div className="work-grid">
                            {filteredPartners.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    actionLabel="View partnership"
                                    onOpen={setSelectedProject}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* ─── CTA Banner ─────────────────────────────────────────────── */}
                <section className="work-cta-section">
                    <h2 className="work-cta-title">ready to launch your next big idea?</h2>
                    <p className="work-cta-subtitle">
                        Tell us what you're building — websites, apps, AI systems or automation — and we'll take it from there.
                    </p>
                    <a
                        href={`mailto:${CONTACT_EMAIL}?subject=Project%20Inquiry%20-%20Arclume&body=Hi%20Arclume!%20I'm%20interested%20in%20discussing%20a%20project.`}
                        className="work-cta-btn"
                    >
                        <span>Start a project with us</span>
                        <span aria-hidden="true">→</span>
                    </a>
                </section>

                {/* ─── Case Study Popup ────────────────────────────────────────── */}
                {selectedProject && (
                    <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
                        <div
                            className="modal-content"
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedProject.client}: ${selectedProject.title}`}
                            data-lenis-prevent
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="modal-close-btn"
                                aria-label="Close"
                                onClick={() => setSelectedProject(null)}
                            >
                                ✕
                            </button>

                            <div className="modal-banner">
                                <ProjectCover project={selectedProject} />
                            </div>

                            <div className="modal-body">
                                <div className="modal-header-info">
                                    <div className="modal-badges">
                                        <span className={`project-card__badge project-card__badge--inline ${selectedProject.badgeClass || ''}`}>
                                            {selectedProject.client}
                                        </span>
                                        {selectedProject.kind && (
                                            <span className="project-card__kind">{selectedProject.kind}</span>
                                        )}
                                    </div>
                                    <h2 className="modal-title">{selectedProject.title}</h2>
                                    <p className="modal-subtitle">{selectedProject.summary}</p>
                                </div>

                                <div className="modal-grid-details">
                                    <div>
                                        <h3 className="modal-section-h3">the challenge</h3>
                                        <p className="modal-p">{selectedProject.challenge}</p>

                                        <h3 className="modal-section-h3">our solution</h3>
                                        <p className="modal-p">{selectedProject.solution}</p>

                                        {selectedProject.highlights?.length > 0 && (
                                            <>
                                                <h3 className="modal-section-h3">what it does</h3>
                                                <ul className="modal-highlights">
                                                    {selectedProject.highlights.map((item) => (
                                                        <li key={item}>
                                                            <svg width="13" height="16" aria-hidden="true">
                                                                <use href="#bullet-icon" />
                                                            </svg>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>

                                    <div className="modal-meta-box">
                                        <div className="modal-meta-item">
                                            <div className="modal-meta-label">Category</div>
                                            <div className="modal-meta-value">{selectedProject.category}</div>
                                        </div>
                                        {(selectedProject.highlight || selectedProject.impact) && (
                                            <div className="modal-meta-item">
                                                <div className="modal-meta-label">Highlight</div>
                                                <div className="modal-meta-value">
                                                    {selectedProject.highlight || selectedProject.impact}
                                                </div>
                                            </div>
                                        )}
                                        <div className="modal-meta-item">
                                            <div className="modal-meta-label">Year</div>
                                            <div className="modal-meta-value">{selectedProject.year}</div>
                                        </div>
                                        {selectedProject.builtBy && (
                                            <div className="modal-meta-item">
                                                <div className="modal-meta-label">Built by</div>
                                                <div className="modal-meta-value">{selectedProject.builtBy}</div>
                                            </div>
                                        )}
                                        <div className="modal-meta-item">
                                            <div className="modal-meta-label">Technologies</div>
                                            <div className="modal-tech">
                                                {selectedProject.technologies.map((tech) => (
                                                    <span key={tech} className="tag-pill">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <a href={mailto(selectedProject)} className="btn-primary-work">
                                        Request something similar →
                                    </a>
                                    {selectedProject.live && (
                                        <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="btn-secondary-work">
                                            Visit live site ↗
                                        </a>
                                    )}
                                    {selectedProject.repo && (
                                        <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary-work">
                                            View code on GitHub ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
        </>
    );
}
