export function processSvg(svg: string, color: string): string {
  let html = svg;
  html = html.replace(/<style>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/#006837/gi, color);
  html = html.replace(/stroke="#00000000?"/gi, `stroke="${color}"`);
  html = html.replace(/\s(width|height)="[^"]*"/g, "");
  html = html.replace(/<svg\b/, '<svg width="100%" height="auto"');
  html = html.replace(/<svg\b/, '<svg overflow="visible"');
  html = html.replace(
    "</svg>",
    `<style>path, polygon, rect, circle, ellipse, line, polyline { fill: ${color}; stroke: none; }</style></svg>`,
  );
  return html;
}
