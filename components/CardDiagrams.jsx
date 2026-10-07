// Little animated "how it works" sketches revealed when a service card is
// hovered. Pure SVG + CSS (see cards.css → "Card hover diagrams"): everything
// is drawn in currentColor so each sketch picks up its card's text colour.
//
// Helper classes: viz-node (outlined shape), viz-solid (filled shape),
// viz-line (connector with flowing dashes), viz-label (tiny text),
// viz-pop / viz-grow (entrance), d1…d8 (entrance delay), viz-pulse + p0…p3
// (looping highlight, phase-shifted so it travels along the diagram).

function WebDiagram() {
    return (
        <svg viewBox="0 0 272 124" className="card-viz__svg">
            {/* Browser window */}
            <rect x="36" y="6" width="200" height="112" rx="10" className="viz-node viz-pop" />
            <path d="M36 26H236" className="viz-stroke" />
            <circle cx="50" cy="16" r="2.5" className="viz-solid viz-pop d1" />
            <circle cx="59" cy="16" r="2.5" className="viz-solid viz-pop d1" />
            <circle cx="68" cy="16" r="2.5" className="viz-solid viz-pop d1" />
            <rect x="84" y="11" width="104" height="10" rx="5" className="viz-fill viz-grow d2" />

            {/* Page blocks building in */}
            <rect x="48" y="36" width="108" height="34" rx="4" className="viz-fill viz-grow d3 viz-pulse p0" />
            <rect x="48" y="78" width="84" height="5" rx="2.5" className="viz-fill viz-grow d4" />
            <rect x="48" y="88" width="58" height="5" rx="2.5" className="viz-fill viz-grow d5" />
            <rect x="48" y="100" width="40" height="11" rx="5.5" className="viz-solid viz-grow d6 viz-pulse p2" />

            <rect x="168" y="36" width="56" height="75" rx="4" className="viz-fill viz-grow d4 viz-pulse p1" />
            <circle cx="184" cy="52" r="5" className="viz-solid viz-pop d6" />
            <path d="M172 104L188 82L199 95L207 87L220 104" className="viz-stroke viz-pop d6" />

            {/* Pointer gliding in to click the button */}
            <g className="viz-cursor">
                <path d="M0 0V14L4 10.5L6.8 16.5L9.2 15.4L6.5 9.5H11.5Z" className="viz-solid viz-cursor__arrow" />
            </g>
        </svg>
    );
}

// Neural net layout — kept as data so the layers stay easy to tweak.
const AI_LAYERS = [
    { x: 66, ys: [24, 62, 100] },
    { x: 134, ys: [14, 46, 78, 110] },
    { x: 202, ys: [40, 84] },
];

function AiDiagram() {
    const links = [];
    for (let l = 0; l < AI_LAYERS.length - 1; l++) {
        const a = AI_LAYERS[l];
        const b = AI_LAYERS[l + 1];
        a.ys.forEach((y1) => b.ys.forEach((y2) => {
            links.push(
                <path
                    key={`${l}-${y1}-${y2}`}
                    d={`M${a.x} ${y1}L${b.x} ${y2}`}
                    className="viz-line viz-line--thin"
                />
            );
        }));
    }

    return (
        <svg viewBox="0 0 272 124" className="card-viz__svg">
            <text x="24" y="65" className="viz-label">prompt</text>
            <path d="M44 62H54" className="viz-line" />
            {links}
            {AI_LAYERS.map((layer, l) => layer.ys.map((y) => (
                <circle
                    key={`${l}-${y}`}
                    cx={layer.x}
                    cy={y}
                    r="7"
                    className={`viz-node viz-pop d${l * 2 + 1} viz-pulse p${l}`}
                />
            )))}
            <path d="M214 62H224" className="viz-line" />
            <text x="246" y="65" className="viz-label">answer</text>
            {/* Spark over the answer */}
            <path d="M246 34L248.2 41.8L256 44L248.2 46.2L246 54L243.8 46.2L236 44L243.8 41.8Z" className="viz-solid viz-pop d7 viz-pulse p3" />
        </svg>
    );
}

function AutomationDiagram() {
    return (
        <svg viewBox="0 0 272 124" className="card-viz__svg">
            {/* Connectors */}
            <path d="M64 62H88" className="viz-line" />
            <path d="M110 40V37Q110 29 118 29H164" className="viz-line" />
            <path d="M110 84V87Q110 95 118 95H164" className="viz-line" />
            <path d="M238 29H246" className="viz-line" />
            <path d="M238 95H246" className="viz-line" />

            {/* Trigger */}
            <rect x="2" y="46" width="62" height="32" rx="8" className="viz-node viz-pop d1 viz-pulse p0" />
            <text x="33" y="65.5" className="viz-label">new lead</text>

            {/* Decision */}
            <path d="M110 40L132 62L110 84L88 62Z" className="viz-node viz-pop d2 viz-pulse p1" />
            <text x="110" y="65.5" className="viz-label">if</text>

            {/* Actions */}
            <rect x="164" y="14" width="74" height="30" rx="8" className="viz-node viz-pop d3 viz-pulse p2" />
            <text x="201" y="32.5" className="viz-label">add to CRM</text>
            <rect x="164" y="80" width="74" height="30" rx="8" className="viz-node viz-pop d4 viz-pulse p2" />
            <text x="201" y="98.5" className="viz-label">send email</text>

            {/* Done ticks */}
            <g className="viz-pop d5">
                <circle cx="258" cy="29" r="9" className="viz-node viz-pulse p3" />
                <path d="M253.5 29.2L256.8 32.4L262.6 26" className="viz-stroke viz-stroke--bold" />
            </g>
            <g className="viz-pop d6">
                <circle cx="258" cy="95" r="9" className="viz-node viz-pulse p3" />
                <path d="M253.5 95.2L256.8 98.4L262.6 92" className="viz-stroke viz-stroke--bold" />
            </g>
        </svg>
    );
}

function IntegrationsDiagram() {
    return (
        <svg viewBox="0 0 272 124" className="card-viz__svg">
            {/* Spokes — drawn hub → service so the dashes flow outward */}
            <path d="M116 50Q92 30 66 24" className="viz-line" />
            <path d="M116 74Q92 94 74 100" className="viz-line" />
            <path d="M156 50Q180 30 206 24" className="viz-line" />
            <path d="M156 74Q180 94 198 100" className="viz-line" />

            {/* Hub */}
            <circle cx="136" cy="62" r="31" className="viz-ring" />
            <circle cx="136" cy="62" r="24" className="viz-node viz-pop viz-pulse p0" />
            <text x="136" y="60" className="viz-label">your</text>
            <text x="136" y="70" className="viz-label">app</text>

            {/* Connected services */}
            <rect x="6" y="10" width="60" height="26" rx="13" className="viz-node viz-pop d2 viz-pulse p1" />
            <text x="36" y="26.5" className="viz-label">APIs</text>
            <rect x="2" y="88" width="72" height="26" rx="13" className="viz-node viz-pop d3 viz-pulse p2" />
            <text x="38" y="104.5" className="viz-label">payments</text>
            <rect x="206" y="10" width="60" height="26" rx="13" className="viz-node viz-pop d4 viz-pulse p3" />
            <text x="236" y="26.5" className="viz-label">CRM</text>
            <rect x="198" y="88" width="72" height="26" rx="13" className="viz-node viz-pop d5 viz-pulse p2" />
            <text x="234" y="104.5" className="viz-label">+ more</text>
        </svg>
    );
}

function Phone({ x, label, delay }) {
    return (
        <g>
            <rect x={x} y="6" width="52" height="112" rx="10" className={`viz-node viz-pop d${delay}`} />
            <rect x={x + 19} y="11" width="14" height="3" rx="1.5" className="viz-solid" />
            <text x={x + 26} y="30" className="viz-label">{label}</text>
            <rect x={x + 8} y="38" width="36" height="24" rx="4" className={`viz-fill viz-grow d${delay + 2} viz-pulse p2`} />
            <rect x={x + 8} y="69" width="36" height="5" rx="2.5" className={`viz-fill viz-grow d${delay + 3}`} />
            <rect x={x + 8} y="79" width="24" height="5" rx="2.5" className={`viz-fill viz-grow d${delay + 4}`} />
            <rect x={x + 8} y="97" width="36" height="11" rx="5.5" className={`viz-solid viz-grow d${delay + 5} viz-pulse p3`} />
        </g>
    );
}

function MobileDiagram() {
    return (
        <svg viewBox="0 0 272 124" className="card-viz__svg">
            {/* One codebase feeding both platforms */}
            <path d="M98 62H70" className="viz-line" />
            <path d="M174 62H202" className="viz-line" />
            <rect x="98" y="44" width="76" height="36" rx="8" className="viz-node viz-pop viz-pulse p0" />
            <text x="136" y="60" className="viz-label">one</text>
            <text x="136" y="70" className="viz-label">codebase</text>

            <Phone x={18} label="android" delay={1} />
            <Phone x={202} label="iOS" delay={2} />
        </svg>
    );
}

const DIAGRAMS = {
    web: WebDiagram,
    ai: AiDiagram,
    automation: AutomationDiagram,
    integrations: IntegrationsDiagram,
    mobile: MobileDiagram,
};

export default function CardDiagram({ type }) {
    const Diagram = DIAGRAMS[type];
    if (!Diagram) return null;

    return (
        <div className="card-viz" aria-hidden="true">
            <div className="card-viz__inner">
                <div className="card-viz__panel">
                    <Diagram />
                </div>
            </div>
        </div>
    );
}
