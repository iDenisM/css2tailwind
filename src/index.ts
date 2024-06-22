import css from 'css';

const cssToTailwindMap: Record<string, Record<string, string>> = {
  'background-color': {
    '#3490dc': 'bg-blue-500',
    '#f8f9fa': 'bg-gray-100',
    // Add more mappings as needed
  },
  color: {
    white: 'text-white',
    '#343a40': 'text-gray-800',
    // Add more mappings as needed
  },
  padding: {
    '10px 20px': 'py-2 px-4',
    '20px': 'p-5',
    // Add more mappings as needed
  },
  'border-radius': {
    '5px': 'rounded-md',
    // Add more mappings as needed
  },
  'font-size': {
    '16px': 'text-lg',
    '24px': 'text-2xl',
    // Add more mappings as needed
  },
  'text-align': {
    center: 'text-center',
  },
  'box-shadow': {
    '0 4px 6px rgba(0, 0, 0, 0.1)': 'shadow-md',
  },
  'max-width': {
    '400px': 'max-w-md',
  },
  margin: {
    auto: 'mx-auto',
  },
};

function convertCssToTailwind(cssString: string) {
  const parsedCss = css.parse(cssString);
  const tailwindClasses: Record<string, string[]> = {};

  parsedCss.stylesheet?.rules.forEach((rule: css.Rule) => {
    if (rule.type === 'rule' && rule.selectors) {
      const selector = rule.selectors[0];
      tailwindClasses[selector] = [];

      rule.declarations?.forEach((declaration: css.Declaration) => {
        if (declaration.type === 'declaration') {
          const { property, value } = declaration;

          if (cssToTailwindMap[property] && cssToTailwindMap[property][value]) {
            tailwindClasses[selector].push(cssToTailwindMap[property][value]);
          } else {
            console.warn(`No Tailwind mapping found for ${property}: ${value}`);
          }
        }
      });
    }
  });

  return tailwindClasses;
}

const cssString = `
.button {
  background-color: #3490dc;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
}

.card {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: auto;
}
`;

const tailwindClasses = convertCssToTailwind(cssString);
console.log(tailwindClasses);
