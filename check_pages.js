const urls = [
  'https://litiere-auto.pages.dev/',
  'https://litiere-auto.pages.dev/guides/litiere-automatique-entretien-nettoyage/',
  'https://litiere-auto.pages.dev/guides/cout-litiere-automatique-budget/',
  'https://litiere-auto.pages.dev/guides/',
  'https://litiere-auto.pages.dev/litieres-automatiques/meilleure-litiere-automatique/',
  'https://litiere-auto.pages.dev/avis/litter-robot-4/'
];

const results = {};

async function checkPages() {
  const allInternalLinks = new Set();
  
  for (const url of urls) {
    results[url] = {};
    try {
      const res = await fetch(url);
      results[url].status = res.status;
      if (!res.ok) {
        continue;
      }
      const html = await res.text();
      
      // Main content (basic check)
      results[url].hasMain = html.includes('<main');
      
      // Tables and CTAs
      results[url].hasTable = html.includes('<table');
      results[url].hasGoLink = html.includes('href="/go/') || html.includes('href="https://litiere-auto.pages.dev/go/');
      results[url].hasCtaClass = html.includes('btn') || html.includes('button');
      
      // Guides associés
      results[url].hasGuidesAssocies = html.toLowerCase().includes('guides associés') || html.toLowerCase().includes('guides utiles');
      
      // Internal links
      results[url].hasAvisLinks = html.includes('href="/avis/') || html.includes('href="/litieres-automatiques/');
      results[url].hasGuidesLinks = html.includes('href="/guides/');
      
      // Extract links to check for 404
      const linkRegex = /href="(\/[^"]+)"/g;
      let match;
      while ((match = linkRegex.exec(html)) !== null) {
        allInternalLinks.add('https://litiere-auto.pages.dev' + match[1]);
      }
    } catch (e) {
      results[url].error = e.message;
    }
  }

  // Check internal links
  const brokenLinks = [];
  const linksArray = Array.from(allInternalLinks).filter(link => !link.includes('/go/')); // we skip external affiliate links
  
  const chunkSize = 20;
  for (let i = 0; i < linksArray.length; i += chunkSize) {
    const chunk = linksArray.slice(i, i + chunkSize);
    await Promise.all(chunk.map(async (link) => {
      try {
        const res = await fetch(link, { method: 'HEAD' });
        if (res.status >= 400 && res.status !== 405) { // 405 is method not allowed, might happen with HEAD
            // Double check with GET if HEAD fails
            const getRes = await fetch(link, { method: 'GET' });
            if (getRes.status >= 400) {
                brokenLinks.push(`${link} (Status: ${getRes.status})`);
            }
        }
      } catch (e) {
        brokenLinks.push(`${link} (Error: ${e.message})`);
      }
    }));
  }

  console.log(JSON.stringify({ results, brokenLinks }, null, 2));
}

checkPages();
