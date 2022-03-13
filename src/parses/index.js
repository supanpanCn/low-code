const reqParser = require.context('./', false, /parser-[^.]+\.js/)
const parsersName = reqParser.keys()
const parsers = parsersName.reduce((parsers, module) => {
    const mod = reqParser(module)
    parsers[mod.default.name] = mod.default
    return parsers
}, {})
export { parsers }