function getNavbarTemplate(name, isTailwind) {
  if (isTailwind) {
    return `
const ${name} = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">${name}</h1>
      <ul className="flex gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default ${name};
`;
  } else {
    return `
import './${name}.css';

const ${name} = () => {
  return (
    <nav className="${name.toLowerCase()}">
      <h1>${name}</h1>
    </nav>
  );
};

export default ${name};
`;
  }
}

module.exports = { getNavbarTemplate };