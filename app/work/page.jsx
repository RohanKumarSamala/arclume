'use client';

import React, { useState, useMemo } from 'react';
import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SoundEffects from '@/components/SoundEffects';
import { OUR_WORKS, AFFILIATED_COMPANIES, CLIENT_REVIEWS } from '@/lib/data';

export default function WorkPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const categories = [
        { label: 'All Works', slug: 'all' },
        { label: 'Mobile Apps', slug: 'mobile' },
        { label: 'Socials & Campaigns', slug: 'socials' },
        { label: 'Web Dev', slug: 'webdev' },
        { label: 'AI & Automation', slug: 'ai' },
    ];

    const filteredOurWorks = useMemo(() => {
        return OUR_WORKS.filter((project) => {
            const matchesFilter = activeFilter === 'all' || project.categorySlug === activeFilter;
            const q = searchQuery.trim().toLowerCase();
            if (!q) return matchesFilter;
            return (
                project.title.toLowerCase().includes(q) ||
                project.client.toLowerCase().includes(q) ||
                project.subtitle.toLowerCase().includes(q) ||
                project.category.toLowerCase().includes(q) ||
                project.technologies.some(t => t.toLowerCase().includes(q))
            );
        });
    }, [activeFilter, searchQuery]);

    const filteredAffiliated = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return AFFILIATED_COMPANIES;
        return AFFILIATED_COMPANIES.filter((project) => {
            return (
                project.title.toLowerCase().includes(q) ||
                project.client.toLowerCase().includes(q) ||
                project.subtitle.toLowerCase().includes(q) ||
                project.category.toLowerCase().includes(q) ||
                project.technologies.some(t => t.toLowerCase().includes(q))
            );
        });
    }, [searchQuery]);

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
                <section className="work-hero" style={{ marginBottom: '32px' }}>
                    <div className="work-hero__badge-header">
                        <img
                            src="/assets/Navbar SVG/nav-work-blob.svg"
                            alt="Star Emblem"
                            className="work-hero__star-icon"
                        />
                        <span className="work-hero__badge-text">our client portfolio & partners</span>
                    </div>

                    <h1 className="work-hero__title">
                        all our <span className="highlight">work.</span>
                    </h1>

                    <p className="work-hero__subtitle">
                        Discover our client case studies, digital apps, viral campaigns, modern web platforms & affiliated venture partners.
                    </p>
                </section>

                {/* ─── SECTION 1: Our Works (TOP) ────────────────────────────── */}
                <section className="work-section-block">
                    <div className="work-section-header">
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '24px' }}>
                            <div>
                                <h2 className="work-section-title">
                                    our works.
                                    <span className="section-tag">client case studies</span>
                                </h2>
                                <p className="work-section-desc">
                                    High-impact projects delivered for our clients across AI, web, and automation.
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
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by client or keyword..."
                                    className="work-search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category Filter Pills positioned directly above Our Works */}
                        <div className="work-filters">
                            {categories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    className={`filter-btn ${activeFilter === cat.slug ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(cat.slug)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredOurWorks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: '24px' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>no works found in this category</h3>
                            <p style={{ color: 'rgba(0,0,0,0.6)' }}>Try selecting another category or clearing your search.</p>
                        </div>
                    ) : (
                        <div className="work-grid">
                            {filteredOurWorks.map((project) => (
                                <article
                                    key={project.id}
                                    className="project-card"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="project-card__image-holder">
                                        <span className={`project-card__badge ${project.badgeClass}`}>
                                            {project.client}
                                        </span>
                                        {project.impact && (
                                            <span className="project-card__impact-tag">
                                                ⚡ {project.impact}
                                            </span>
                                        )}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-card__img"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="project-card__content">
                                        <h3 className="project-card__title">{project.title}</h3>
                                        <p className="project-card__subtitle">{project.subtitle}</p>

                                        <div className="project-card__tags">
                                            {project.deliverables.map((tag, idx) => (
                                                <span key={idx} className="tag-pill">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="project-card__action">
                                            <span>Explore Case Study</span>
                                            <div className="project-card__arrow">→</div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <hr className="work-divider" />

                {/* ─── SECTION 2: Affiliated Companies (BOTTOM) ──────────────── */}
                <section className="work-section-block">
                    <div className="work-section-header">
                        <h2 className="work-section-title">
                            affiliated companies.
                            <span className="section-tag" style={{ background: 'var(--color-lightblue)' }}>
                                strategic partners
                            </span>
                        </h2>
                        <p className="work-section-desc">
                            Our trusted venture collaborations, strategic brand partnerships & ecosystem affiliates.
                        </p>
                    </div>

                    {filteredAffiliated.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: '24px' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>no affiliated partners found</h3>
                            <p style={{ color: 'rgba(0,0,0,0.6)' }}>Try clearing your search query.</p>
                        </div>
                    ) : (
                        <div className="work-grid">
                            {filteredAffiliated.map((project) => (
                                <article
                                    key={project.id}
                                    className="project-card"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="project-card__image-holder">
                                        <span className={`project-card__badge ${project.badgeClass}`}>
                                            {project.client}
                                        </span>
                                        {project.impact && (
                                            <span className="project-card__impact-tag">
                                                ⚡ {project.impact}
                                            </span>
                                        )}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-card__img"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="project-card__content">
                                        <h3 className="project-card__title">{project.title}</h3>
                                        <p className="project-card__subtitle">{project.subtitle}</p>

                                        <div className="project-card__tags">
                                            {project.deliverables.map((tag, idx) => (
                                                <span key={idx} className="tag-pill">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="project-card__action">
                                            <span>Explore Partnership</span>
                                            <div className="project-card__arrow">→</div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* ─── Client Testimonials ────────────────────────────────────── */}
                <section className="work-testimonials">
                    <h2 className="work-testimonials__heading">what clients say about us.</h2>
                    <div className="reviews-grid">
                        {CLIENT_REVIEWS.map((rev, index) => (
                            <div key={index} className="review-card">
                                <div style={{ marginBottom: '16px', color: '#ffb400' }}>
                                    {'★'.repeat(rev.rating)}
                                </div>
                                <p className="review-quote">"{rev.quote}"</p>
                                <div>
                                    <div className="review-author">{rev.author}</div>
                                    <div className="review-company">{rev.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── CTA Banner ─────────────────────────────────────────────── */}
                <section className="work-cta-section">
                    <h2 className="work-cta-title">ready to launch your next big idea?</h2>
                    <p className="work-cta-subtitle">
                        Partner with Arclume to craft high-performance digital apps, viral content, and cutting-edge AI systems.
                    </p>
                    <a
                        href="https://wa.me/?text=Hi%20Arclume!%20I'm%20interested%20in%20discussing%20a%20project."
                        target="_blank"
                        rel="noreferrer"
                        className="work-cta-btn"
                    >
                        <span>Start A Project With Us</span>
                        <span>→</span>
                    </a>
                </section>

                {/* ─── Case Study Modal ────────────────────────────────────────── */}
                {selectedProject && (
                    <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                                ✕
                            </button>

                            <div className="modal-banner">
                                <img src={selectedProject.image} alt={selectedProject.title} />
                            </div>

                            <div className="modal-body">
                                <div className="modal-header-info">
                                    <span className={`project-card__badge ${selectedProject.badgeClass}`} style={{ position: 'static' }}>
                                        {selectedProject.client}
                                    </span>
                                    <h2 className="modal-title">{selectedProject.title}</h2>
                                    <p className="modal-subtitle">{selectedProject.summary}</p>
                                </div>

                                <div className="modal-grid-details">
                                    <div>
                                        <h3 className="modal-section-h3">the challenge</h3>
                                        <p className="modal-p">{selectedProject.challenge}</p>

                                        <h3 className="modal-section-h3">our solution</h3>
                                        <p className="modal-p">{selectedProject.solution}</p>
                                    </div>

                                    <div className="modal-meta-box">
                                        <div className="modal-meta-item">
                                            <div className="modal-meta-label">Category</div>
                                            <div className="modal-meta-value">{selectedProject.category}</div>
                                        </div>
                                        <div className="modal-meta-item">
                                            <div className="modal-meta-label">Key Result</div>
                                            <div className="modal-meta-value">{selectedProject.impact}</div>
                                        </div>
                                        <div className="modal-meta-item">
                                            <div className="modal-meta-label">Year</div>
                                            <div className="modal-meta-value">{selectedProject.year}</div>
                                        </div>
                                        <div className="modal-meta-item">
                                            <div className="modal-meta-label">Technologies</div>
                                            <div className="modal-meta-value">
                                                {selectedProject.technologies.join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <a
                                        href="https://wa.me/?text=Hi%20Arclume!%20I%20saw%20your%20case%20study%20and%20want%20something%20similar."
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-primary-work"
                                    >
                                        Request Similar Solution →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
