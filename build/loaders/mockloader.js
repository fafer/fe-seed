var { getOptions } = require('loader-utils');
var validateOptions = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
};

module.exports = function(source) {
  const options = getOptions(this);
  // validateOptions(schema, options, 'Example Loader');
  // Apply some transformations to the source...
  console.log('asdadasd')
  source = source.replace(/\/\/@mock/g, '');
  return `export default ${ JSON.stringify(source) }`;
}