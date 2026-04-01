const { getCardTemplate } = require('../templates/card');
const { getNavbarTemplate } = require('../templates/navbar');
const { getButtonTemplate } = require('../templates/button');
const fs = require('fs-extra');
const path = require('path');
const { isTailwindProject } = require('./detector');

// 🔥 PascalCase utility
function toPascalCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\s+/g, '');
}

function generateComponent(name, option, variant) {
  // 🔥 Fix naming
  name = toPascalCase(name);

  const dir = path.join(process.cwd(), 'src/components', name);
  fs.ensureDirSync(dir);

  const filePath = path.join(dir, `${name}.jsx`);

  // ✅ prevent overwrite
  if (fs.existsSync(filePath)) {
    console.log(`⚠️ ${name} already exists. Skipping...`);
    return;
  }

  // 🧠 auto detect
  if (!option) {
    option = isTailwindProject() ? '--tailwind' : '--css';
  }

  let content = '';
  let styleImport = '';
  let className = '';

  const isTailwind = option === '--tailwind';

  // 🎯 TEMPLATE SYSTEM
  if (variant === '--variant=card') {
    content = getCardTemplate(name, isTailwind);

  } else if (variant === '--variant=navbar') {
    content = getNavbarTemplate(name, isTailwind);

  } else if (variant === '--variant=button') {
    content = getButtonTemplate(name, isTailwind);

  } else {
    // ✅ DEFAULT GENERATOR

    if (option === '--css') {
      styleImport = `import './${name}.css';`;
      className = name.toLowerCase();

      fs.writeFileSync(
        path.join(dir, `${name}.css`),
        `.${name.toLowerCase()} {\n  /* styles */\n}`
      );

    } else if (option === '--tailwind') {
      className = 'p-4 bg-blue-500 text-white';
    }

    content = `
${styleImport}

const ${name} = () => {
  return (
    <div className="${className}">
      ${name}
    </div>
  );
};

export default ${name};
`;
  }

  // ✅ write file
  fs.writeFileSync(filePath, content);

  console.log(`✅ ${name} created using ${variant || option}`);
}

module.exports = { generateComponent };