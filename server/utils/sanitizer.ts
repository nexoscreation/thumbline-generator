const entityMap: Record < string, string > = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
}

export function sanitizeHtml(html: string): string {
    return String(html).replace(/[&<>"'/]/g, (key) => entityMap[key] || key)
}