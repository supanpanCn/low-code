import { parsers } from '../parses/index'
const req = require.context('./', false, /[^.]+\.vue/)
const componentsName = req.keys()
const uiComponents = componentsName.reduce((components, module) => {
  const mod = req(module)
  components[mod.default.name] = mod.default
  return components
}, {})
console.log(parsers,'parsers')
export { uiComponents, parsers }
