let scopeCounter = 0;

export function processSvg(svg: string, color: string): string {
  let html = svg;
  const scope = `gs-svg-${scopeCounter++}`;

  html = html.replace(/<style>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/#006837/gi, color);
  html = html.replace(/stroke="#00000000?"/gi, `stroke="${color}"`);
  html = html.replace(/\s(width|height)="[^"]*"/g, "");
  html = html.replace(
    /<svg\b/,
    `<svg data-scope="${scope}" width="100%" height="auto"`,
  );
  html = html.replace(/<svg\b/, '<svg overflow="visible"');
  html = html.replace(
    "</svg>",
    `<style>[data-scope="${scope}"] path, [data-scope="${scope}"] polygon, [data-scope="${scope}"] rect, [data-scope="${scope}"] circle, [data-scope="${scope}"] ellipse, [data-scope="${scope}"] line, [data-scope="${scope}"] polyline { fill: ${color}; stroke: none; }</style></svg>`,
  );
  return html;
}
