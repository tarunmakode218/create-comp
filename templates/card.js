function getCardTemplate(name, isTailwind) {
  if (isTailwind) {
    return `
const ${name} = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold">${name}</h2>
      <p className="text-gray-500">Card component</p>
    </div>
  );
};

export default ${name};
`;
  } else {
    return `
import './${name}.css';

const ${name} = () => {
  return (
    <div className="${name.toLowerCase()}">
      <h2>${name}</h2>
      <p>Card component</p>
    </div>
  );
};

export default ${name};
`;
  }
}

module.exports = { getCardTemplate };