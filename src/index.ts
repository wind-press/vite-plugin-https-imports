import { Plugin } from 'vite'

import { HttpsImportsOptions } from './types'
import { matcher } from './matcher'
import { resolver } from './resolver'
import { loader } from './loader'


export default function(options: HttpsImportsOptions = {}, customResolver, customLoader, customMatcher): Plugin {
  const match = customMatcher ? customMatcher(options) : matcher(options)

  return {
    name: 'vite-plugin-https-imports',
    enforce: 'pre',
    apply: 'build',

    resolveId: customResolver ? customResolver(match) : resolver(match),
    load: customLoader ? customLoader(match, options) : loader(match, options),
  }
}


export * from './types'
export { matcher, resolver, loader }