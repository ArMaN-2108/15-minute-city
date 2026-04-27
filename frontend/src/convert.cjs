const fs = require('fs');

const files = [
  { in: 'about.html', out: 'components/AboutUs.jsx', name: 'AboutUs' },
  { in: 'terms.html', out: 'components/TermsOfService.jsx', name: 'TermsOfService' },
  { in: 'contact.html', out: 'components/ContactUs.jsx', name: 'ContactUs' },
  { in: 'privacy.html', out: 'components/PrivacyPolicy.jsx', name: 'PrivacyPolicy' }
];

files.forEach(f => {
  let content = fs.readFileSync(f.in, 'utf-8');
  
  // Extract body
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return;
  
  let bodyContent = bodyMatch[1];
  
  // JSX replacements
  bodyContent = bodyContent.replace(/class=/g, 'className=');
  bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
  bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, ''); // remove comments
  // fix inline styles
  bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(s => s.trim()).reduce((acc, s) => {
      let [key, val] = s.split(':');
      if(key && val) {
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc[key] = val.trim();
      }
      return acc;
    }, {});
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  // self close tags
  bodyContent = bodyContent.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
  bodyContent = bodyContent.replace(/<input([^>]+[^\/])>/g, '<input$1 />');
  bodyContent = bodyContent.replace(/<hr([^>]+[^\/])>/g, '<hr$1 />');
  bodyContent = bodyContent.replace(/<br([^>]+[^\/])>/g, '<br$1 />');
  
  // Fix the links to work with React Router
  bodyContent = bodyContent.replace(/href="#"/g, 'href="/"');

  const jsx = `import React from 'react';
import { Link } from 'react-router-dom';

const ${f.name} = () => {
  return (
    <>
      ${bodyContent}
    </>
  );
};

export default ${f.name};
`;

  fs.writeFileSync(f.out, jsx);
});
