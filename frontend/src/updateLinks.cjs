const fs = require('fs');
const path = require('path');

const dir = 'components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add import Link if not present
  if (!content.includes("import { Link } from 'react-router-dom';")) {
    content = content.replace(/(import React[^;]*;)/, "$1\nimport { Link } from 'react-router-dom';");
  }

  // Replace anchor tags with Link
  content = content.replace(/<a([^>]*)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (match, p1, p2, p3, p4) => {
    // Determine the route
    let route = p2;
    if (p4.includes('Home')) route = '/';
    else if (p4.includes('About')) route = '/about';
    else if (p4.includes('Terms')) route = '/terms';
    else if (p4.includes('Privacy')) route = '/privacy';
    else if (p4.includes('Contact')) route = '/contact';
    else route = p2 === '#' ? '/' : p2;

    return `<Link${p1}to="${route}"${p3}>${p4}</Link>`;
  });

  fs.writeFileSync(filePath, content);
});
