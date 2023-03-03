import { ModuleOptions } from "./module";

export type QuasarPlugins =
  | 'AddressbarColor'
  | 'AppFullscreen'
  | 'AppVisibility'
  | 'BottomSheet'
  | 'Cookies'
  | 'Dark'
  | 'Dialog'
  | 'Loading'
  | 'LoadingBar'
  | 'LocalStorage'
  | 'Meta'
  | 'Notify';

/** Icon collections provided by `@quasar/extras` */
type QuasarCommonIconSets =
  | "bootstrap-icons"
  | "eva-icons"
  | "fontawesome-v5"
  | "fontawesome-v6"
  | "ionicons-v4"
  | "line-awesome"
  | "material-icons"
  | "material-icons-outlined"
  | "material-icons-round"
  | "material-icons-sharp"
  | "material-symbols-outlined"
  | "material-symbols-rounded"
  | "material-symbols-sharp"
  | "mdi-v4"
  | "mdi-v5"
  | "mdi-v6"
  | "mdi-v7"
  | "themify"

export type QuasarFontIconSets = QuasarCommonIconSets
  | "mdi-v3"

export type QuasarSvgIconSets = QuasarCommonIconSets
  | "svg-ionicons-v5"
  | "svg-ionicons-v6"


export interface QuasarImports {
  raw: Record<string, string>
  components: ImportData[]
  composables: ImportData[]
  directives: ImportData[]
}

export interface ImportData {
  name: string
  path: string
}

export interface ModuleContext {
  imports: QuasarImports
  options: ModuleOptions
  mode: 'server' | 'client'
}
