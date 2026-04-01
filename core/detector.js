const fs = require('fs');
const path = require('path');

function isTailwindProject() {
  const tailwindConfig = path.join(process.cwd(), 'tailwind.config.js');

  // check config file
  if (fs.existsSync(tailwindConfig)) {
    return true;
  }

  // check package.json
  try {
    const pkg = require(path.join(process.cwd(), 'package.json'));

    return (
      pkg.dependencies?.tailwindcss ||
      pkg.devDependencies?.tailwindcss
    );
  } catch (err) {
    return false;
  }
}

module.exports = { isTailwindProject };