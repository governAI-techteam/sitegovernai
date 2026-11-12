'use client';

import { tokens } from '@/theme/tokens';
import { slugify } from '@/config/insightsData';

function formatInlineText(text) {
  if (!text) return null;

  // Split by bold (**...**) and code (`...`) and links
  const parts = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Check for bold **...**
    const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*(.*)/s);
    // Check for code `...`
    const codeMatch = remaining.match(/^(.*?)`(.+?)`(.*)/s);

    if (boldMatch && (!codeMatch || boldMatch[1].length <= codeMatch[1].length)) {
      if (boldMatch[1]) {
        parts.push(<span key={keyIndex++}>{boldMatch[1]}</span>);
      }
      parts.push(
        <strong key={keyIndex++} style={{ fontWeight: 700, color: tokens.onSurface }}>
          {boldMatch[2]}
        </strong>
      );
      remaining = boldMatch[3];
    } else if (codeMatch) {
      if (codeMatch[1]) {
        parts.push(<span key={keyIndex++}>{codeMatch[1]}</span>);
      }
      parts.push(
        <code
          key={keyIndex++}
          style={{
            fontFamily: tokens.fonts.mono,
            fontSize: '0.88em',
            padding: '2px 6px',
            borderRadius: 4,
            background: 'rgba(241, 106, 36, 0.08)',
            color: '#c2410c',
            border: '1px solid rgba(241, 106, 36, 0.2)',
          }}
        >
          {codeMatch[2]}
        </code>
      );
      remaining = codeMatch[3];
    } else {
      parts.push(<span key={keyIndex++}>{remaining}</span>);
      break;
    }
  }

  return parts;
}

export function MarkdownContent({ content = '' }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let elementIndex = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // Horizontal Rule
    if (line === '---' || line === '***') {
      elements.push(
        <hr
          key={elementIndex++}
          style={{
            border: 'none',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
            margin: '36px 0',
          }}
        />
      );
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      const headingText = line.slice(2).trim();
      elements.push(
        <h1
          key={elementIndex++}
          id={slugify(headingText)}
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 800,
            color: tokens.onSurface,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            margin: '40px 0 20px',
            scrollMarginTop: 110,
          }}
        >
          {headingText}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      const headingText = line.slice(3).trim();
      elements.push(
        <h2
          key={elementIndex++}
          id={slugify(headingText)}
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(22px, 2.5vw, 28px)',
            fontWeight: 700,
            color: tokens.onSurface,
            letterSpacing: '-0.025em',
            lineHeight: 1.3,
            margin: '36px 0 16px',
            paddingBottom: 8,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            scrollMarginTop: 110,
          }}
        >
          {headingText}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      const headingText = line.slice(4).trim();
      elements.push(
        <h3
          key={elementIndex++}
          id={slugify(headingText)}
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(18px, 1.8vw, 21px)',
            fontWeight: 700,
            color: '#1e293b',
            letterSpacing: '-0.015em',
            lineHeight: 1.35,
            margin: '28px 0 12px',
            scrollMarginTop: 110,
          }}
        >
          {headingText}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i++;
      }
      elements.push(
        <blockquote
          key={elementIndex++}
          style={{
            margin: '24px 0',
            padding: '18px 24px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(241, 106, 36, 0.05) 0%, rgba(255, 140, 66, 0.02) 100%)',
            borderLeft: `4px solid ${tokens.primary}`,
            border: '1px solid rgba(241, 106, 36, 0.15)',
            borderLeftWidth: 4,
            fontSize: '15.5px',
            lineHeight: 1.65,
            color: '#2d3748',
            fontStyle: 'italic',
            fontFamily: tokens.fonts.body,
          }}
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} style={{ margin: qIdx > 0 ? '8px 0 0' : 0 }}>
              {formatInlineText(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Markdown Table
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableRows = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const rowStr = lines[i].trim();
        // check if separator row like | :--- | :--- |
        if (rowStr.replace(/[|\s:-]/g, '').length === 0) {
          i++;
          continue;
        }
        const cells = rowStr
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        tableRows.push(cells);
        i++;
      }

      if (tableRows.length > 0) {
        const headerCells = tableRows[0];
        const bodyRows = tableRows.slice(1);

        elements.push(
          <div
            key={elementIndex++}
            style={{
              overflowX: 'auto',
              margin: '28px 0',
              borderRadius: 12,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
                fontFamily: tokens.fonts.body,
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid rgba(0,0,0,0.08)' }}>
                  {headerCells.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      style={{
                        padding: '12px 16px',
                        fontWeight: 700,
                        color: tokens.onSurface,
                        fontSize: '13px',
                      }}
                    >
                      {formatInlineText(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((r, rIdx) => (
                  <tr
                    key={rIdx}
                    style={{
                      borderBottom: rIdx < bodyRows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                      background: rIdx % 2 === 1 ? '#fafbfc' : '#ffffff',
                    }}
                  >
                    {r.map((c, cIdx) => (
                      <td
                        key={cIdx}
                        style={{
                          padding: '12px 16px',
                          color: '#334155',
                          lineHeight: 1.5,
                        }}
                      >
                        {formatInlineText(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // List item (- or * or 1.)
    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const listItems = [];
      const isOrdered = /^\d+\.\s+/.test(line);

      while (
        i < lines.length &&
        ((isOrdered && /^\d+\.\s+/.test(lines[i].trim())) ||
          (!isOrdered && /^[-*]\s+/.test(lines[i].trim())))
      ) {
        const itemText = lines[i].trim().replace(/^([*-]|\d+\.)\s+/, '');
        listItems.push(itemText);
        i++;
      }

      elements.push(
        isOrdered ? (
          <ol
            key={elementIndex++}
            style={{
              margin: '18px 0 24px 24px',
              padding: 0,
              color: '#334155',
              fontSize: '16px',
              lineHeight: 1.7,
              fontFamily: tokens.fonts.body,
            }}
          >
            {listItems.map((li, liIdx) => (
              <li key={liIdx} style={{ marginBottom: 8, paddingLeft: 4 }}>
                {formatInlineText(li)}
              </li>
            ))}
          </ol>
        ) : (
          <ul
            key={elementIndex++}
            style={{
              margin: '18px 0 24px 20px',
              padding: 0,
              color: '#334155',
              fontSize: '16px',
              lineHeight: 1.7,
              fontFamily: tokens.fonts.body,
            }}
          >
            {listItems.map((li, liIdx) => (
              <li key={liIdx} style={{ marginBottom: 8, paddingLeft: 4 }}>
                {formatInlineText(li)}
              </li>
            ))}
          </ul>
        )
      );
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p
        key={elementIndex++}
        style={{
          fontSize: '16.5px',
          lineHeight: 1.75,
          color: '#334155',
          marginBottom: 20,
          fontFamily: tokens.fonts.body,
        }}
      >
        {formatInlineText(line)}
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
}
