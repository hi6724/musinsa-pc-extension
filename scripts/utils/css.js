const style = document.createElement('style');
document.head.appendChild(style);

const insertedRules = [];

function insertCSS(rules, width = '1200px') {
  for (const className in rules) {
    if (rules.hasOwnProperty(className)) {
      const cssProperties = rules[className];
      const rule = `@media(min-width:${width}){${className} { ${cssProperties} !important }}`;
      style.sheet.insertRule(rule, style.sheet.cssRules.length);
      insertedRules.push(rule);
    }
  }
}
function removeInsertedCSS() {
  for (let i = insertedRules.length - 1; i >= 0; i--) {
    for (let j = style.sheet.cssRules.length - 1; j >= 0; j--) {
      if (style.sheet.cssRules[j].cssText === insertedRules[i]) {
        style.sheet.deleteRule(j);
        break;
      }
    }
  }
  insertedRules.length = 0;
}
