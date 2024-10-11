const style = document.createElement('style');
document.head.appendChild(style);

const insertedRules = [];

function insertCSS(rules, width = '1200px') {
  for (const className in rules) {
    if (rules.hasOwnProperty(className)) {
      const cssProperties = rules[className];
      const rule = `@media(min-width: ${width}) { ${className} { ${cssProperties} !important; } }`;

      try {
        const ruleIndex = style.sheet.insertRule(rule, style.sheet.cssRules.length);
        insertedRules.push(ruleIndex); // 인덱스를 저장
      } catch (e) {
        console.error('Failed to insert rule:', rule, e);
      }
    }
  }
}

function removeInsertedCSS() {
  for (let i = insertedRules.length - 1; i >= 0; i--) {
    style.sheet.deleteRule(insertedRules[i]); // 저장된 인덱스를 사용하여 규칙 삭제
  }
  insertedRules.length = 0;
}
