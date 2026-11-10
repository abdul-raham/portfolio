// Real commit history from every git repo under a folder, for one person's identities.
// Usage: node commits.cjs <root> [--authors]   (lists authors)   or   node commits.cjs <root> <out.json> <email,...>
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const [, , root, outOrFlag, emailList] = process.argv;

function findRepos(dir, depth = 0, found = []) {
  if (depth > 4) return found;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return found; }
  if (entries.some((e) => e.name === '.git')) found.push(dir);
  for (const e of entries) {
    if (!e.isDirectory() || ['node_modules', '.git', '.next', 'dist', '.open-next', '.wrangler'].includes(e.name)) continue;
    findRepos(path.join(dir, e.name), depth + 1, found);
  }
  return found;
}

const since = new Date();
since.setFullYear(since.getFullYear() - 3);
const repos = findRepos(root);
const seen = new Map();
for (const repo of repos) {
  let log = '';
  try {
    log = execFileSync('git', ['-C', repo, 'log', '--all', `--since=${since.toISOString().slice(0, 10)}`, '--format=%H|%ae|%an|%ad', '--date=short'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch { continue; }
  for (const line of log.split('\n').filter(Boolean)) {
    const [hash, email, name, date] = line.split('|');
    if (!seen.has(hash)) seen.set(hash, { email: email.toLowerCase(), name, date, repo: path.basename(repo) });
  }
}

if (outOrFlag === '--authors') {
  const tally = {};
  for (const c of seen.values()) {
    const k = `${c.name} <${c.email}>`;
    tally[k] = (tally[k] || 0) + 1;
  }
  console.log(`${repos.length} repos, ${seen.size} unique commits since ${since.toISOString().slice(0, 10)}`);
  Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([k, v]) => console.log(String(v).padStart(6), k));
} else {
  const mine = new Set(emailList.split(',').map((e) => e.trim().toLowerCase()));
  const days = {};
  const repoSet = new Set();
  for (const c of seen.values()) {
    if (!mine.has(c.email)) continue;
    days[c.date] = (days[c.date] || 0) + 1;
    repoSet.add(c.repo);
  }
  const total = Object.values(days).reduce((a, b) => a + b, 0);
  fs.writeFileSync(outOrFlag, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), since: since.toISOString().slice(0, 10), total, repos: repoSet.size, days }, null, 0));
  const byYear = {};
  for (const [d, n] of Object.entries(days)) byYear[d.slice(0, 4)] = (byYear[d.slice(0, 4)] || 0) + n;
  console.log(`total ${total} commits on ${Object.keys(days).length} days across ${repoSet.size} repos`, byYear);
}
