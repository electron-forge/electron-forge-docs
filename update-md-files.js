const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function replaceCustomSyntax(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const updatedContent = content
    .replace(/{% hint style="info" %}/g, '> **Info:**')
    .replace(/{% hint style="warning" %}/g, ':::caution\n')
    .replace(/{% hint style="success" %}/g, ':::tip\n')
    .replace(/{% hint style="danger" %}/g, ':::danger\n')
    .replace(/{% endhint %}/g, ':::')
    .replace(/{% code title=".*" %}/g, '```')
    .replace(/{% endcode %}/g, '```')
    .replace(/<figure>\s*<img src="([^"]+)" alt="([^"]+)" \/>\s*<\/figure>/g, '![$2]($1)')
    .replace(/<\/?figure>/g, '') // Remove any remaining <figure> tags
    .replace(/<\/?img[^>]*>/g, '') // Remove any remaining <img> tags
    .replace(/```json5/g, '```json')
    .replace(/```javascript/g, '```js')
    .replace(/```jsx/g, '```js')
    .replace(/```js\nmodule\.exports = \{/g, '```js\nmodule.exports = {\n  packagerConfig: {},\n  rebuildConfig: {},\n  makers: [],\n  publishers: [],\n  plugins: [],\n  hooks: {},\n  buildIdentifier: "my-build",')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, p1, p2) => {
      // Resolve relative links
      const resolvedPath = path.resolve(path.dirname(filePath), p2);
      if (fs.existsSync(resolvedPath)) {
        return `[${p1}](${p2})`;
      } else {
        console.warn(`[WARNING] Docs markdown link couldn't be resolved: (${p2}) in source file "${filePath}"`);
        return match;
      }
    })
    .replace(/{% tabs %}/g, '<Tabs>')
    .replace(/{% tab title="([^"]+)" %}/g, '<TabItem value="$1" label="$1">')
    .replace(/{% endtab %}/g, '</TabItem>')
    .replace(/{% endtabs %}/g, '</Tabs>')
    .replace(/{% content-ref url="([^"]+)" %}/g, '[$1]($1)')
    .replace(/{% endcontent-ref %}/g, '');

  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (path.extname(fullPath) === '.md') {
      replaceCustomSyntax(fullPath);
    }
  });
}

processDirectory(docsDir);