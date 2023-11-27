/* eslint-disable import/no-duplicates */
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { App as VueApp } from 'vue'
import type { QuasarIconSets as QuasarIconSet } from 'quasar'
import type * as _ from 'quasar'
import type { ModuleOptions } from './module'

type ExtractFont<T extends string> = T extends `svg-${string}` ? never : T
type ExtractSvg<T extends string> = T extends `svg-${infer F}` ? F : never

export type QuasarFontIconSet = ExtractFont<QuasarIconSet>
export type QuasarSvgIconSet = ExtractSvg<QuasarIconSet>

export type ResolveFn = (...paths: string[]) => string

export interface QuasarImports {
  raw: Record<string, string>
  components: ImportData[]
  composables: ImportData[]
  directives: (ImportData & { kebabCase: string })[]
  plugins: ImportData[]
}

export interface ImportData {
  name: string
  path: string
}

export interface ModuleContext {
  imports: QuasarImports
  options: ModuleOptions
  mode: 'server' | 'client'
  resolveLocal: ResolveFn
  resolveQuasar: ResolveFn
  resolveQuasarExtras: ResolveFn
}

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on client-side
 **/
export interface QuasarPluginClientContext {
  parentApp: VueApp<any>
  $q: _.QVueGlobals
  lang: _.QuasarLanguage
  iconSet: _.QuasarIconSet
  onSSRHydrated: (() => void)[]
}

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on server-side
 **/
export interface QuasarPluginServerContext {
  parentApp: VueApp<any>
  $q: _.QVueGlobals
  lang: _.QuasarLanguage
  iconSet: _.QuasarIconSet
  ssrContext: any
}

export interface QuasarSSRContext {
  req: IncomingMessage
  res: ServerResponse
  $q: any
  _meta: {
    htmlAttrs: string
    headTags: string
    endingHeadTags: string
    bodyClasses: string
    bodyAttrs: string
    bodyTags: string
  }
  _modules: any[]
  onRendered: ((...args: any[]) => any)[]
  __qPrevLang: string
}

export interface QuasarFrameworkInnerConfiguration {
  brand?: {
    primary?: string
    secondary?: string
    accent?: string
    dark?: string
    positive?: string
    negative?: string
    info?: string
    warning?: string
  }
  dark?: boolean | 'auto'
  lang?: {
    noHtmlAttrs?: boolean
  }
  loading?: {
    delay?: number
    message?: false | string
    html?: boolean
    boxClass?: string
    spinnerSize?: number
    spinnerColor?: string
    messageColor?: string
    backgroundColor?: string
    customClass?: string
  }
  ripple?: boolean | {
    early?: boolean
    stop?: boolean
    center?: boolean
    color?: string
    keyCodes?: number[] | number
  }
  loadingBar?: {
    position?: string
    size?: string
    color?: string
    reverse?: boolean
    skipHijack?: boolean
  }
  notify?: {
    type?: string
    color?: string
    textColor?: string
    message?: string
    caption?: string
    html?: boolean
    icon?: string
    iconColor?: string
    iconSize?: string
    avatar?: string
    spinner?: boolean
    spinnerColor?: string
    spinnerSize?: string
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center'
    group?: boolean | string | number
    badgeColor?: string
    badgeTextColor?: string
    badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    badgeStyle?: _.VueStyleProp
    badgeClass?: _.VueClassProp
    progress?: boolean
    progressClass?: _.VueClassProp
    classes?: string
    attrs?: object
    timeout?: number
    closeBtn?: boolean | string
    multiLine?: boolean
    actions?: { icon: string; color: string }[]
  }
}

//

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T] & keyof T

type OptionalKeys<T extends object> = Exclude<{
  [K in keyof T]: T extends Record<K, T[K]> ? never : K
}[keyof T], undefined>

type OmitMatching<T extends object, V> = Omit<T, KeysMatching<T, V>>

type OmitFnProps<T extends object> = OmitMatching<T, ((...args: any[]) => any) | undefined>

type PickOptionalProps<T extends object> = Pick<T, OptionalKeys<T>>

interface QuasarComponents {
  QAjaxBar: _.QAjaxBarProps
  QAvatar: _.QAvatarProps
  QBadge: _.QBadgeProps
  QBanner: _.QBannerProps
  QBar: _.QBarProps
  QBreadcrumbs: _.QBreadcrumbsProps
  QBreadcrumbsEl: _.QBreadcrumbsElProps
  QBtn: _.QBtnProps
  QBtnDropdown: _.QBtnDropdownProps
  QBtnGroup: _.QBtnGroupProps
  QBtnToggle: _.QBtnToggleProps
  QCard: _.QCardProps
  QCardActions: _.QCardActionsProps
  QCardSection: _.QCardSectionProps
  QCarousel: _.QCarouselProps
  QCarouselControl: _.QCarouselControlProps
  QCarouselSlide: _.QCarouselSlideProps
  QChatMessage: _.QChatMessageProps
  QCheckbox: _.QCheckboxProps
  QChip: _.QChipProps
  QCircularProgress: _.QCircularProgressProps
  QColor: _.QColorProps
  QDate: _.QDateProps
  QDialog: _.QDialogProps
  QDrawer: _.QDrawerProps
  QEditor: _.QEditorProps
  QExpansionItem: _.QExpansionItemProps
  QFab: _.QFabProps
  QFabAction: _.QFabActionProps
  QField: _.QFieldProps
  QFile: _.QFileProps
  QFooter: _.QFooterProps
  QForm: _.QFormProps
  QFormChildMixin: _.QFormChildMixinProps
  QHeader: _.QHeaderProps
  QIcon: _.QIconProps
  QImg: _.QImgProps
  QInfiniteScroll: _.QInfiniteScrollProps
  QInnerLoading: _.QInnerLoadingProps
  QInput: _.QInputProps
  QIntersection: _.QIntersectionProps
  QItem: _.QItemProps
  QItemLabel: _.QItemLabelProps
  QItemSection: _.QItemSectionProps
  QList: _.QListProps
  QKnob: _.QKnobProps
  QLayout: _.QLayoutProps
  QLinearProgress: _.QLinearProgressProps
  QMarkupTable: _.QMarkupTableProps
  QMenu: _.QMenuProps
  QNoSsr: _.QNoSsrProps
  QOptionGroup: _.QOptionGroupProps
  QPage: _.QPageProps
  QPageContainer: _.QPageContainerProps
  QPageScroller: _.QPageScrollerProps
  QPageSticky: _.QPageStickyProps
  QPagination: _.QPaginationProps
  QParallax: _.QParallaxProps
  QPopupEdit: _.QPopupEditProps
  QPopupProxy: _.QPopupProxyProps
  QPullToRefresh: _.QPullToRefreshProps
  QRadio: _.QRadioProps
  QRange: _.QRangeProps
  QRating: _.QRatingProps
  QResizeObserver: _.QResizeObserverProps
  QResponsive: _.QResponsiveProps
  QScrollArea: _.QScrollAreaProps
  QScrollObserver: _.QScrollObserverProps
  QSelect: _.QSelectProps
  QSeparator: _.QSeparatorProps
  QSkeleton: _.QSkeletonProps
  QSlideItem: _.QSlideItemProps
  QSlideTransition: _.QSlideTransitionProps
  QSlider: _.QSliderProps
  QSpace: _.QSpaceProps
  QSpinner: _.QSpinnerProps
  QSpinnerAudio: _.QSpinnerAudioProps
  QSpinnerBall: _.QSpinnerBallProps
  QSpinnerBars: _.QSpinnerBarsProps
  QSpinnerBox: _.QSpinnerBoxProps
  QSpinnerClock: _.QSpinnerClockProps
  QSpinnerComment: _.QSpinnerCommentProps
  QSpinnerCube: _.QSpinnerCubeProps
  QSpinnerDots: _.QSpinnerDotsProps
  QSpinnerFacebook: _.QSpinnerFacebookProps
  QSpinnerGears: _.QSpinnerGearsProps
  QSpinnerGrid: _.QSpinnerGridProps
  QSpinnerHearts: _.QSpinnerHeartsProps
  QSpinnerHourglass: _.QSpinnerHourglassProps
  QSpinnerInfinity: _.QSpinnerInfinityProps
  QSpinnerIos: _.QSpinnerIosProps
  QSpinnerOrbit: _.QSpinnerOrbitProps
  QSpinnerOval: _.QSpinnerOvalProps
  QSpinnerPie: _.QSpinnerPieProps
  QSpinnerPuff: _.QSpinnerPuffProps
  QSpinnerRadio: _.QSpinnerRadioProps
  QSpinnerRings: _.QSpinnerRingsProps
  QSpinnerTail: _.QSpinnerTailProps
  QSplitter: _.QSplitterProps
  QStep: _.QStepProps
  QStepper: _.QStepperProps
  QStepperNavigation: _.QStepperNavigationProps
  QTabPanel: _.QTabPanelProps
  QTabPanels: _.QTabPanelsProps
  QTable: _.QTableProps
  QTd: _.QTdProps
  QTh: _.QThProps
  QTr: _.QTrProps
  QRouteTab: _.QRouteTabProps
  QTab: _.QTabProps
  QTabs: _.QTabsProps
  QTime: _.QTimeProps
  QTimeline: _.QTimelineProps
  QTimelineEntry: _.QTimelineEntryProps
  QToggle: _.QToggleProps
  QToolbar: _.QToolbarProps
  QToolbarTitle: _.QToolbarTitleProps
  QTooltip: _.QTooltipProps
  QTree: _.QTreeProps
  QUploader: _.QUploaderProps
  QUploaderAddTrigger: _.QUploaderAddTriggerProps
  QVideo: _.QVideoProps
  QVirtualScroll: _.QVirtualScrollProps
}

export type QuasarComponentDefaults = {
  [K in keyof QuasarComponents]?: PickOptionalProps<OmitFnProps<QuasarComponents[K]>>
}

export interface QuasarComponentMetadata {
  mixins?: string[]
  props?: Record<string, QuasarPropMetadata>
}

export type QuasarPropType =
  | 'Boolean'
  | 'Number'
  | 'String'
  | 'Array'
  | 'Object'
  | 'File'
  | 'FileList'
  | 'Element'
  | 'Function'
  | 'Any'
  | 'null'
  | 'undefined'

export interface QuasarPropMetadata {
  type: QuasarPropType | QuasarPropType[]
  default?: any
  required?: boolean
  values?: string[]
  extends?: string
  category?: string
  desc?: string
  examples?: string[]
  addedIn?: string
  tsType?: string
  transformAssetUrls?: boolean
  syncable?: boolean
  internal?: boolean
}
