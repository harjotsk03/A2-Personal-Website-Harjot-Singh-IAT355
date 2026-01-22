/** * Utility to create SVG elements with the correct namespace
 */
const createSVG = (tag, attrs, parent) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (let k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
};

function createSkillsChart() {
  const svg = document.getElementById("skillsChart");
  if (!svg) return;

  // Viewbox needs to be large enough for labels
  const size = 600;
  const center = size / 2;
  const radius = 200;
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

  const skills = [
    { name: "Frontend", value: 90 },
    { name: "Backend", value: 85 },
    { name: "Cloud/DevOps", value: 75 },
    { name: "Databases", value: 80 },
    { name: "Automation", value: 85 },
    { name: "UI/UX", value: 70 },
  ];

  const angleStep = (Math.PI * 2) / skills.length;

  // 1. Concentric Background Circles
  for (let i = 1; i <= 5; i++) {
    createSVG(
      "circle",
      {
        cx: center,
        cy: center,
        r: (radius / 5) * i,
        fill: "none",
        stroke: "#e0e0e0",
        "stroke-width": "1",
      },
      svg,
    );
  }

  // 2. Axes and Data Points
  const points = [];
  skills.forEach((skill, i) => {
    const angle = i * angleStep - Math.PI / 2;

    // Axis lines
    const x2 = center + Math.cos(angle) * radius;
    const y2 = center + Math.sin(angle) * radius;
    createSVG(
      "line",
      {
        x1: center,
        y1: center,
        x2,
        y2,
        stroke: "#333",
        "stroke-opacity": "0.3",
      },
      svg,
    );

    // Labels
    const lx = center + Math.cos(angle) * (radius + 40);
    const ly = center + Math.sin(angle) * (radius + 40);
    const txt = createSVG(
      "text",
      {
        x: lx,
        y: ly,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": "14",
        "font-weight": "600",
      },
      svg,
    );
    txt.textContent = skill.name;

    // Data coordinate
    const d = (skill.value / 100) * radius;
    points.push(
      `${center + Math.cos(angle) * d},${center + Math.sin(angle) * d}`,
    );
  });

  // 3. Draw Polygon
  createSVG(
    "polygon",
    {
      points: points.join(" "),
      fill: "rgba(255, 107, 53, 0.3)",
      stroke: "#ff6b35",
      "stroke-width": "3",
    },
    svg,
  );
}

function createHockeyRink() {
  const svg = document.getElementById("hockeyRink");
  if (!svg) return;

  // Standard rink is twice as long as wide
  svg.setAttribute("viewBox", "0 0 800 400");

  // Ice Surface
  createSVG(
    "rect",
    {
      x: 50,
      y: 50,
      width: 700,
      height: 300,
      rx: 140,
      fill: "#f0f8ff",
      stroke: "#333",
      "stroke-width": "4",
    },
    svg,
  );

  // Lines (Blue, Center Red)
  const lines = [
    { x: 250, c: "#0066cc" },
    { x: 550, c: "#0066cc" },
    { x: 400, c: "#cc0000", w: 4 },
  ];
  lines.forEach((l) =>
    createSVG(
      "line",
      {
        x1: l.x,
        y1: 52,
        x2: l.x,
        y2: 348,
        stroke: l.c,
        "stroke-width": l.w || 3,
      },
      svg,
    ),
  );

  // Goal Lines and Creases (Simplified)
  [100, 700].forEach((x) =>
    createSVG(
      "line",
      { x1: x, y1: 65, x2: x, y2: 335, stroke: "#cc0000", "stroke-width": "2" },
      svg,
    ),
  );

  // Animated Puck
  const puck = createSVG("circle", { r: 8, fill: "#0a0a0a" }, svg);
  const animX = createSVG(
    "animate",
    {
      attributeName: "cx",
      values: "400;150;650;400",
      dur: "5s",
      repeatCount: "indefinite",
    },
    puck,
  );
  const animY = createSVG(
    "animate",
    {
      attributeName: "cy",
      values: "200;120;280;200",
      dur: "5s",
      repeatCount: "indefinite",
    },
    puck,
  );
}

document.addEventListener("DOMContentLoaded", () => {
  createSkillsChart();
  createHockeyRink();
});
