function getButtonTemplate(name, isTailwind) {
  if (isTailwind) {
    return `
const ${name} = () => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      Click Me
    </button>
  );
};

export default ${name};
`;
  } else {
    return `
import './${name}.css';

const ${name} = () => {
  return (
    <button className="${name.toLowerCase()}">
      Click Me
    </button>
  );
};

export default ${name};
`;
  }
}

module.exports = { getButtonTemplate };