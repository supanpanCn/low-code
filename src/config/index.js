const req = require.context('./', false, /[^.]+\.config\.vue/)
const componentsName = req.keys()
const uiConfig = componentsName.reduce((components, module) => {
  const mod = req(module)
  components[mod.default.name] = mod.default
  return components
}, {})
export { uiConfig }
