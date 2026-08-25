"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { TEAM_MEMBERS } from "@/lib/data";

const LABEL_COLORS = ["pink", "orange", "red", "blue"];

export default function TeamSection() {
    const containerRef = useRef(null);

    // Inertia drag-on-hover for photo cards.
    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            const cards = containerRef.current.querySelectorAll(".motion-card__card");
            cards.forEach((card) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(card, "rotation");
                const startX = gsap.getProperty(card, "x");
                const startY = gsap.getProperty(card, "y");

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(card, {
                        inertia: {
                            x: { velocity: speedX * 20, end: startX },
                            y: { velocity: speedY * 20, end: startY },
                            rotation: { velocity: speedX * 1.5, end: startRotation },
                        },
                    });
                };

                card.addEventListener("mousemove", onMove);
                card.addEventListener("mouseenter", onEnter);
                card.addEventListener("mouseleave", onLeave);
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const featured = TEAM_MEMBERS.slice(0, 4);
    const overflow = TEAM_MEMBERS.slice(4);

    return (
        <div className="motion-card__cards-area" ref={containerRef}>
            <div className="motion-card__blob">
                <img
                    src="/assets/MotionCard SVG/motion-card-blob.svg"
                    alt=""
                    className="motion-card__blob-svg"
                />
            </div>

            {featured.length > 0 && (
                <div className="motion-card__cards">
                    {featured.map((member, i) => (
                        <div key={member.name} className={`motion-card__card motion-card__card--${i + 1}`}>
                            <div className="motion-card__card-image" style={member.bgColor ? { backgroundColor: member.bgColor } : undefined}>
                                <img
                                    src={member.photoUrl}
                                    loading="lazy"
                                    alt={member.name}
                                    className="cover-image"
                                    style={member.bgColor ? { objectFit: "contain" } : undefined}
                                />
                            </div>
                            <div className={`motion-card__card-name motion-card__card-name--${member.pillColor || LABEL_COLORS[i % LABEL_COLORS.length]}`}>
                                <p className="motion-card__floating-text">{member.name}</p>
                                {member.role && <p className="motion-card__floating-role">{member.role}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {overflow.length > 0 && (
                <div className="motion-card__team-extra">
                    {overflow.map((member, i) => (
                        <div key={member.name} className="motion-card__team-extra-item">
                            <div className="motion-card__team-extra-image" style={member.bgColor ? { backgroundColor: member.bgColor } : undefined}>
                                <img
                                    src={member.photoUrl}
                                    loading="lazy"
                                    alt={member.name}
                                    className="cover-image"
                                    style={member.bgColor ? { objectFit: "contain" } : undefined}
                                />
                            </div>
                            <div className={`motion-card__card-name motion-card__card-name--${member.pillColor || LABEL_COLORS[i % LABEL_COLORS.length]}`}>
                                <p className="motion-card__floating-text">{member.name}</p>
                                {member.role && <p className="motion-card__floating-role">{member.role}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {TEAM_MEMBERS.length === 0 && (
                <p className="motion-card__team-empty">Team photos coming soon.</p>
            )}
        </div>
    );
}
