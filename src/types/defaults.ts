import type {
  QAjaxBarProps,
  QAvatarProps,
  QBadgeProps,
  QBannerProps,
  QBarProps,
  QBreadcrumbsProps,
  QBtnDropdownProps,
  QBtnGroupProps,
  QBtnProps,
  QBtnToggleProps,
  QCardActionsProps,
  QCardProps,
  QCardSectionProps,
  QCarouselControlProps,
  QCarouselProps,
  QChatMessageProps,
  QCheckboxProps,
  QChipProps,
  QCircularProgressProps,
  QColorProps,
  QDateProps,
  QDialogProps,
  QEditorProps,
  QExpansionItemProps,
  QFabActionProps,
  QFabProps,
  QFieldProps,
  QFileProps,
  QFormProps,
  QIconProps,
  QImgProps,
  QInfiniteScrollProps,
  QInnerLoadingProps,
  QInputProps,
  QIntersectionProps,
  QItemLabelProps,
  QItemProps,
  QItemSectionProps,
  QKnobProps,
  QLinearProgressProps,
  QListProps,
  QMarkupTableProps,
  QMenuProps,
  QNoSsrProps,
  QOptionGroupProps,
  QPaginationProps,
  QParallaxProps,
  QPopupEditProps,
  QPopupProxyProps,
  QPullToRefreshProps,
  QRadioProps,
  QRangeProps,
  QRatingProps,
  QResizeObserverProps,
  QResponsiveProps,
  QRouteTabProps,
  QScrollAreaProps,
  QScrollObserverProps,
  QSelectProps,
  QSeparatorProps,
  QSkeletonProps,
  QSlideItemProps,
  QSlideTransitionProps,
  QSliderProps,
  QSpinnerCubeProps,
  QSpinnerProps,
  QSplitterProps,
  QStepProps,
  QStepperProps,
  QTabPanelsProps,
  QTabProps,
  QTableProps,
  QTabsProps,
  QTdProps,
  QTimeProps,
  QTimelineEntryProps,
  QTimelineProps,
  QToggleProps,
  QToolbarProps,
  QToolbarTitleProps,
  QTooltipProps,
  QTrProps,
  QTreeProps,
  QUploaderProps,
  QVideoProps,
  QVirtualScrollProps,
} from 'quasar'

export interface QuasarComponentDefaults {
  QAjaxBar: QAjaxBarDefaultProps
  QAvatar: QAvatarDefaultProps
  QBadge: QBadgeDefaultProps
  QBanner: QBannerDefaultProps
  QBar: QBarDefaultProps
  QBreadcrumbs: QBreadcrumbsDefaultProps
  QBtn: QBtnDefaultProps
  QBtnDropdown: QBtnDropdownDefaultProps
  QBtnGroup: QBtnGroupDefaultProps
  QCard: QCardDefaultProps
  QCardSection: QCardSectionDefaultProps
  QCardActions: QCardActionsDefaultProps
  QCarousel: QCarouselDefaultProps
  QCarouselControl: QCarouselControlDefaultProps
  QChatMessage: QChatMessageDefaultProps
  QCheckbox: QCheckboxDefaultProps
  QChip: QChipDefaultProps
  QCircularProgress: QCircularProgressDefaultProps
  QColor: QColorDefaultProps
  QDate: QDateDefaultProps
  QDialog: QDialogDefaultProps
  QEditor: QEditorDefaultProps
  QExpansionItem: QExpansionItemDefaultProps
  QFile: QFileDefaultProps
  QFab: QFabDefaultProps
  QFabAction: QFabActionDefaultProps
  QForm: QFormDefaultProps
  QField: QFieldDefaultProps
  QIcon: QIconDefaultProps
  QImg: QImgDefaultProps
  QInfiniteScroll: QInfiniteScrollDefaultProps
  QInnerLoading: QInnerLoadingDefaultProps
  QInput: QInputDefaultProps
  QIntersection: QIntersectionDefaultProps
  QKnob: QKnobDefaultProps
  QLinearProgress: QLinearProgressDefaultProps
  QList: QListDefaultProps
  QItem: QItemDefaultProps
  QItemSection: QItemSectionDefaultProps
  QItemLabel: QItemLabelDefaultProps
  QMarkupTable: QMarkupTableDefaultProps
  QMenu: QMenuDefaultProps
  QNoSsr: QNoSsrDefaultProps
  QResizeObserver: QResizeObserverDefaultProps
  QScrollObserver: QScrollObserverDefaultProps
  QOptionGroup: QOptionGroupDefaultProps
  QPagination: QPaginationDefaultProps
  QParallax: QParallaxDefaultProps
  QPopupEdit: QPopupEditDefaultProps
  QPopupProxy: QPopupProxyDefaultProps
  QPullToRefresh: QPullToRefreshDefaultProps
  QRadio: QRadioDefaultProps
  QRange: QRangeDefaultProps
  QRating: QRatingDefaultProps
  QResponsive: QResponsiveDefaultProps
  QScrollArea: QScrollAreaDefaultProps
  QSelect: QSelectDefaultProps
  QSeparator: QSeparatorDefaultProps
  QSkeleton: QSkeletonDefaultProps
  QSlideItem: QSlideItemDefaultProps
  QSlider: QSliderDefaultProps
  QSlideTransition: QSlideTransitionDefaultProps
  QSpinner: QSpinnerDefaultProps
  QSpinnerCube: QSpinnerCubeDefaultProps
  QSplitter: QSplitterDefaultProps
  QStepper: QStepperDefaultProps
  QStep: QStepDefaultProps
  QTable: QTableDefaultProps
  QTr: QTrDefaultProps
  QTd: QTdDefaultProps
  QTabPanels: QTabPanelsDefaultProps
  QTabs: QTabsDefaultProps
  QTab: QTabDefaultProps
  QRouteTab: QRouteTabDefaultProps
  QTimeline: QTimelineDefaultProps
  QTimelineEntry: QTimelineEntryDefaultProps
  QTime: QTimeDefaultProps
  QBtnToggle: QBtnToggleDefaultProps
  QToggle: QToggleDefaultProps
  QToolbar: QToolbarDefaultProps
  QToolbarTitle: QToolbarTitleDefaultProps
  QTooltip: QTooltipDefaultProps
  QTree: QTreeDefaultProps
  QUploader: QUploaderDefaultProps
  QVideo: QVideoDefaultProps
  QVirtualScroll: QVirtualScrollDefaultProps
}

export type QAjaxBarDefaultProps = Pick<
  QAjaxBarProps,
  'position' | 'size' | 'color' | 'reverse' | 'skipHijack' | 'hijackFilter'
>
export type QAvatarDefaultProps = Pick<
  QAvatarProps,
  'size' | 'fontSize' | 'color' | 'textColor' | 'square' | 'rounded'
>
export type QBadgeDefaultProps = Pick<
  QBadgeProps,
  'color' | 'textColor' | 'transparent' | 'outline' | 'rounded'
>
export type QBannerDefaultProps = Pick<QBannerProps, 'dense' | 'rounded'>
export type QBarDefaultProps = Pick<QBarProps, 'dense'>
export type QBreadcrumbsDefaultProps = Pick<QBreadcrumbsProps, 'activeColor' | 'separatorColor'>

export type QBtnDefaultProps = Pick<
  QBtnProps,
  | 'size'
  | 'outline'
  | 'flat'
  | 'unelevated'
  | 'rounded'
  | 'push'
  | 'square'
  | 'glossy'
  | 'fab'
  | 'fabMini'
  | 'padding'
  | 'color'
  | 'textColor'
  | 'dense'
  | 'ripple'
  | 'round'
  | 'size'
  | 'outline'
  | 'flat'
  | 'unelevated'
  | 'rounded'
  | 'push'
  | 'square'
  | 'glossy'
  | 'fab'
  | 'fabMini'
  | 'padding'
  | 'color'
  | 'textColor'
  | 'dense'
  | 'ripple'
  | 'round'
>
export type QBtnDropdownDefaultProps = Pick<
  QBtnDropdownProps,
  | 'size'
  | 'outline'
  | 'flat'
  | 'unelevated'
  | 'rounded'
  | 'push'
  | 'square'
  | 'glossy'
  | 'fab'
  | 'fabMini'
  | 'padding'
  | 'color'
  | 'textColor'
  | 'dense'
  | 'ripple'
  | 'noIconAnimation'
  | 'contentStyle'
  | 'contentClass'
  | 'size'
  | 'outline'
  | 'flat'
  | 'unelevated'
  | 'rounded'
  | 'push'
  | 'square'
  | 'glossy'
  | 'fab'
  | 'fabMini'
  | 'padding'
  | 'color'
  | 'textColor'
  | 'dense'
  | 'ripple'
  | 'noIconAnimation'
  | 'contentStyle'
  | 'contentClass'
>
export type QBtnGroupDefaultProps = Pick<
  QBtnGroupProps,
  'outline' | 'flat' | 'unelevated' | 'rounded' | 'square' | 'push' | 'glossy'
>
export type QCardDefaultProps = Pick<QCardProps, 'square' | 'flat' | 'bordered'>
export type QCardSectionDefaultProps = Pick<QCardSectionProps, 'horizontal' | 'tag'>
export type QCardActionsDefaultProps = Pick<QCardActionsProps, 'align' | 'vertical'>
export type QCarouselDefaultProps = Pick<
  QCarouselProps,
  | 'height'
  | 'controlColor'
  | 'controlTextColor'
  | 'controlType'
  | 'fullscreen'
  | 'noRouteFullscreenExit'
  | 'keepAlive'
  | 'keepAliveInclude'
  | 'keepAliveExclude'
  | 'keepAliveMax'
  | 'animated'
  | 'infinite'
  | 'swipeable'
  | 'vertical'
  | 'autoplay'
>
export type QCarouselControlDefaultProps = Pick<QCarouselControlProps, 'position' | 'offset'>

export type QChatMessageDefaultProps = Pick<
  QChatMessageProps,
  'bgColor' | 'textColor' | 'size' | 'labelHtml' | 'nameHtml' | 'textHtml' | 'stampHtml'
>
export type QCheckboxDefaultProps = Pick<
  QCheckboxProps,
  'size' | 'color' | 'dense' | 'size' | 'color' | 'dense'
>
export type QChipDefaultProps = Pick<
  QChipProps,
  'dense' | 'size' | 'color' | 'textColor' | 'square' | 'outline' | 'ripple'
>
export type QCircularProgressDefaultProps = Pick<
  QCircularProgressProps,
  | 'size'
  | 'color'
  | 'centerColor'
  | 'trackColor'
  | 'fontSize'
  | 'rounded'
  | 'thickness'
  | 'animationSpeed'
  | 'indeterminate'
  | 'showValue'
  | 'reverse'
  | 'instantFeedback'
>
export type QColorDefaultProps = Pick<
  QColorProps,
  'square' | 'flat' | 'bordered' | 'name' | 'defaultView'
>
export type QDateDefaultProps = Pick<
  QDateProps,
  | 'color'
  | 'textColor'
  | 'square'
  | 'flat'
  | 'bordered'
  | 'eventColor'
  | 'color'
  | 'textColor'
  | 'square'
  | 'flat'
  | 'bordered'
  | 'eventColor'
>
export type QDialogDefaultProps = Pick<
  QDialogProps,
  | 'square'
  | 'persistent'
  | 'noEscDismiss'
  | 'noBackdropDismiss'
  | 'noRouteDismiss'
  | 'autoClose'
  | 'noRefocus'
  | 'noFocus'
  | 'noShake'
  | 'allowFocusOutside'
>
export type QEditorDefaultProps = Pick<
  QEditorProps,
  | 'square'
  | 'flat'
  | 'dense'
  | 'minHeight'
  | 'maxHeight'
  | 'height'
  | 'toolbarOutline'
  | 'toolbarPush'
  | 'toolbarRounded'
  | 'contentStyle'
  | 'contentClass'
  | 'fullscreen'
  | 'noRouteFullscreenExit'
  | 'paragraphTag'
>
export type QExpansionItemDefaultProps = Pick<
  QExpansionItemProps,
  | 'expandIconClass'
  | 'dense'
  | 'denseToggle'
  | 'headerStyle'
  | 'headerClass'
  | 'expandIconClass'
  | 'dense'
  | 'denseToggle'
  | 'headerStyle'
  | 'headerClass'
>
export type QFileDefaultProps = Pick<
  QFileProps,
  | 'labelColor'
  | 'color'
  | 'bgColor'
  | 'filled'
  | 'outlined'
  | 'borderless'
  | 'standout'
  | 'hideBottomSpace'
  | 'rounded'
  | 'square'
  | 'dense'
  | 'itemAligned'
  | 'inputClass'
  | 'inputStyle'
  | 'labelColor'
  | 'color'
  | 'bgColor'
  | 'filled'
  | 'outlined'
  | 'borderless'
  | 'standout'
  | 'hideBottomSpace'
  | 'rounded'
  | 'square'
  | 'dense'
  | 'itemAligned'
  | 'inputClass'
  | 'inputStyle'
>
export type QFabDefaultProps = Pick<
  QFabProps,
  | 'outline'
  | 'push'
  | 'flat'
  | 'unelevated'
  | 'padding'
  | 'color'
  | 'textColor'
  | 'glossy'
  | 'externalLabel'
  | 'labelPosition'
  | 'hideLabel'
  | 'labelClass'
  | 'labelStyle'
  | 'square'
  | 'hideIcon'
  | 'verticalActionsAlign'
  | 'outline'
  | 'push'
  | 'flat'
  | 'unelevated'
  | 'padding'
  | 'color'
  | 'textColor'
  | 'glossy'
  | 'externalLabel'
  | 'labelPosition'
  | 'hideLabel'
  | 'labelClass'
  | 'labelStyle'
  | 'square'
  | 'hideIcon'
  | 'verticalActionsAlign'
>
export type QFabActionDefaultProps = Pick<
  QFabActionProps,
  | 'outline'
  | 'push'
  | 'flat'
  | 'unelevated'
  | 'padding'
  | 'color'
  | 'textColor'
  | 'glossy'
  | 'externalLabel'
  | 'labelPosition'
  | 'hideLabel'
  | 'labelClass'
  | 'labelStyle'
  | 'square'
  | 'anchor'
>
export type QFormDefaultProps = Pick<
  QFormProps,
  'autofocus' | 'noErrorFocus' | 'noResetFocus' | 'greedy'
>
export type QFieldDefaultProps = Pick<
  QFieldProps,
  | 'labelColor'
  | 'color'
  | 'bgColor'
  | 'filled'
  | 'outlined'
  | 'borderless'
  | 'standout'
  | 'hideBottomSpace'
  | 'rounded'
  | 'square'
  | 'dense'
  | 'itemAligned'
  | 'error'
  | 'rules'
  | 'reactiveRules'
  | 'lazyRules'
  | 'loading'
  | 'clearable'
  | 'autofocus'
  | 'for'
  | 'name'
>
export type QIconDefaultProps = Pick<QIconProps, 'size' | 'color'>
export type QImgDefaultProps = Pick<
  QImgProps,
  | 'ratio'
  | 'initialRatio'
  | 'width'
  | 'height'
  | 'fit'
  | 'position'
  | 'imgClass'
  | 'imgStyle'
  | 'spinnerColor'
  | 'spinnerSize'
  | 'loading'
  | 'crossorigin'
  | 'decoding'
  | 'referrerpolicy'
  | 'fetchpriority'
  | 'draggable'
  | 'noSpinner'
  | 'noNativeMenu'
  | 'noTransition'
>
export type QInfiniteScrollDefaultProps = Pick<
  QInfiniteScrollProps,
  'offset' | 'debounce' | 'initialIndex' | 'scrollTarget' | 'reverse'
>
export type QInnerLoadingDefaultProps = Pick<QInnerLoadingProps, 'size' | 'color'>
export type QInputDefaultProps = Pick<
  QInputProps,
  | 'labelColor'
  | 'color'
  | 'bgColor'
  | 'filled'
  | 'outlined'
  | 'borderless'
  | 'standout'
  | 'hideBottomSpace'
  | 'rounded'
  | 'square'
  | 'dense'
  | 'itemAligned'
  | 'inputClass'
  | 'inputStyle'
  | 'labelColor'
  | 'color'
  | 'bgColor'
  | 'filled'
  | 'outlined'
  | 'borderless'
  | 'standout'
  | 'hideBottomSpace'
  | 'rounded'
  | 'square'
  | 'dense'
  | 'itemAligned'
  | 'inputClass'
  | 'inputStyle'
>
export type QIntersectionDefaultProps = Pick<
  QIntersectionProps,
  | 'once'
  | 'ssrPrerender'
  | 'root'
  | 'margin'
  | 'threshold'
  | 'transition'
  | 'transitionDuration'
  | 'disable'
>
export type QKnobDefaultProps = Pick<
  QKnobProps,
  | 'size'
  | 'color'
  | 'centerColor'
  | 'trackColor'
  | 'fontSize'
  | 'thickness'
  | 'size'
  | 'color'
  | 'centerColor'
  | 'trackColor'
  | 'fontSize'
  | 'thickness'
>
export type QLinearProgressDefaultProps = Pick<
  QLinearProgressProps,
  | 'size'
  | 'color'
  | 'trackColor'
  | 'rounded'
  | 'animationSpeed'
  | 'buffer'
  | 'reverse'
  | 'indeterminate'
  | 'query'
  | 'instantFeedback'
>
export type QListDefaultProps = Pick<QListProps, 'bordered' | 'dense'>
export type QItemDefaultProps = Pick<QItemProps, 'dense'>
export type QItemSectionDefaultProps = Pick<
  QItemSectionProps,
  'avatar' | 'thumbnail' | 'side' | 'top' | 'noWrap'
>
export type QItemLabelDefaultProps = Pick<QItemLabelProps, 'lines'>
export type QMarkupTableDefaultProps = Pick<
  QMarkupTableProps,
  'dense' | 'flat' | 'bordered' | 'square'
>
export type QMenuDefaultProps = Pick<
  QMenuProps,
  | 'square'
  | 'maxHeight'
  | 'maxWidth'
  | 'target'
  | 'noParentEvent'
  | 'contextMenu'
  | 'scrollTarget'
  | 'touchPosition'
  | 'persistent'
  | 'noRouteDismiss'
  | 'autoClose'
  | 'separateClosePopup'
  | 'noRefocus'
  | 'noFocus'
>
export type QNoSsrDefaultProps = Pick<QNoSsrProps, 'tag' | 'placeholder'>
export type QResizeObserverDefaultProps = Pick<QResizeObserverProps, 'debounce'>
export type QScrollObserverDefaultProps = Pick<
  QScrollObserverProps,
  'debounce' | 'axis' | 'scrollTarget'
>
export type QOptionGroupDefaultProps = Pick<
  QOptionGroupProps,
  'size' | 'color' | 'dense' | 'name' | 'keepColor'
>
export type QPaginationDefaultProps = Pick<
  QPaginationProps,
  | 'size'
  | 'flat'
  | 'outline'
  | 'unelevated'
  | 'push'
  | 'color'
  | 'textColor'
  | 'activeDesign'
  | 'activeColor'
  | 'activeTextColor'
  | 'round'
  | 'rounded'
  | 'glossy'
  | 'gutter'
  | 'padding'
  | 'inputStyle'
  | 'inputClass'
  | 'ripple'
>
export type QParallaxDefaultProps = Pick<QParallaxProps, 'height' | 'speed' | 'scrollTarget'>
export type QPopupEditDefaultProps = Pick<
  QPopupEditProps,
  | 'color'
  | 'offset'
  | 'square'
  | 'maxHeight'
  | 'maxWidth'
  | 'color'
  | 'offset'
  | 'square'
  | 'maxHeight'
  | 'maxWidth'
>
export type QPopupProxyDefaultProps = Pick<
  QPopupProxyProps,
  'target' | 'noParentEvent' | 'contextMenu' | 'breakpoint'
>
export type QPullToRefreshDefaultProps = Pick<
  QPullToRefreshProps,
  'color' | 'bgColor' | 'noMouse' | 'scrollTarget'
>
export type QRadioDefaultProps = Pick<
  QRadioProps,
  'size' | 'color' | 'dense' | 'size' | 'color' | 'dense'
>
export type QRangeDefaultProps = Pick<
  QRangeProps,
  | 'color'
  | 'trackColor'
  | 'trackImg'
  | 'innerTrackColor'
  | 'innerTrackImg'
  | 'selectionColor'
  | 'selectionImg'
  | 'labelColor'
  | 'labelTextColor'
  | 'switchLabelSide'
  | 'markerLabelsClass'
  | 'switchMarkerLabelsSide'
  | 'trackSize'
  | 'thumbSize'
  | 'thumbColor'
  | 'thumbPath'
  | 'dense'
  | 'color'
  | 'trackColor'
  | 'trackImg'
  | 'innerTrackColor'
  | 'innerTrackImg'
  | 'selectionColor'
  | 'selectionImg'
  | 'labelColor'
  | 'labelTextColor'
  | 'switchLabelSide'
  | 'markerLabelsClass'
  | 'switchMarkerLabelsSide'
  | 'trackSize'
  | 'thumbSize'
  | 'thumbColor'
  | 'thumbPath'
  | 'dense'
>
export type QRatingDefaultProps = Pick<
  QRatingProps,
  | 'size'
  | 'color'
  | 'colorSelected'
  | 'colorHalf'
  | 'noDimming'
  | 'size'
  | 'color'
  | 'colorSelected'
  | 'colorHalf'
  | 'noDimming'
>
export type QResponsiveDefaultProps = Pick<QResponsiveProps, 'ratio'>
export type QScrollAreaDefaultProps = Pick<
  QScrollAreaProps,
  | 'barStyle'
  | 'verticalBarStyle'
  | 'horizontalBarStyle'
  | 'thumbStyle'
  | 'verticalThumbStyle'
  | 'horizontalThumbStyle'
  | 'contentStyle'
  | 'contentActiveStyle'
  | 'visible'
  | 'delay'
>
export type QSelectDefaultProps = Pick<
  QSelectProps,
  | 'labelColor'
  | 'color'
  | 'bgColor'
  | 'filled'
  | 'outlined'
  | 'borderless'
  | 'standout'
  | 'hideBottomSpace'
  | 'rounded'
  | 'square'
  | 'dense'
  | 'itemAligned'
  | 'popupContentClass'
  | 'popupContentStyle'
  | 'inputClass'
  | 'inputStyle'
  | 'labelColor'
  | 'color'
  | 'bgColor'
  | 'filled'
  | 'outlined'
  | 'borderless'
  | 'standout'
  | 'hideBottomSpace'
  | 'rounded'
  | 'square'
  | 'dense'
  | 'itemAligned'
  | 'popupContentClass'
  | 'popupContentStyle'
  | 'inputClass'
  | 'inputStyle'
>
export type QSeparatorDefaultProps = Pick<QSeparatorProps, 'size' | 'color'>
export type QSkeletonDefaultProps = Pick<
  QSkeletonProps,
  'animation' | 'animationSpeed' | 'square' | 'bordered' | 'size' | 'width' | 'height'
>
export type QSlideItemDefaultProps = Pick<
  QSlideItemProps,
  'leftColor' | 'rightColor' | 'topColor' | 'bottomColor'
>
export type QSliderDefaultProps = Pick<
  QSliderProps,
  | 'color'
  | 'trackColor'
  | 'trackImg'
  | 'innerTrackColor'
  | 'innerTrackImg'
  | 'selectionColor'
  | 'selectionImg'
  | 'labelColor'
  | 'labelTextColor'
  | 'switchLabelSide'
  | 'markerLabelsClass'
  | 'switchMarkerLabelsSide'
  | 'trackSize'
  | 'thumbSize'
  | 'thumbColor'
  | 'thumbPath'
  | 'dense'
  | 'color'
  | 'trackColor'
  | 'trackImg'
  | 'innerTrackColor'
  | 'innerTrackImg'
  | 'selectionColor'
  | 'selectionImg'
  | 'labelColor'
  | 'labelTextColor'
  | 'switchLabelSide'
  | 'markerLabelsClass'
  | 'switchMarkerLabelsSide'
  | 'trackSize'
  | 'thumbSize'
  | 'thumbColor'
  | 'thumbPath'
  | 'dense'
>
export type QSlideTransitionDefaultProps = Pick<QSlideTransitionProps, 'appear' | 'duration'>
export type QSpinnerDefaultProps = Pick<QSpinnerProps, 'size' | 'color' | 'thickness'>
export type QSpinnerCubeDefaultProps = Pick<QSpinnerCubeProps, 'size' | 'color'>
export type QSplitterDefaultProps = Pick<
  QSplitterProps,
  'beforeClass' | 'afterClass' | 'separatorClass' | 'separatorStyle'
>
export type QStepperDefaultProps = Pick<
  QStepperProps,
  | 'flat'
  | 'bordered'
  | 'headerClass'
  | 'keepAlive'
  | 'keepAliveInclude'
  | 'keepAliveExclude'
  | 'keepAliveMax'
  | 'animated'
  | 'infinite'
  | 'swipeable'
  | 'vertical'
  | 'headerNav'
  | 'contracted'
>
export type QStepDefaultProps = Pick<QStepProps, 'color' | 'headerNav'>
export type QTableDefaultProps = Pick<
  QTableProps,
  | 'color'
  | 'dense'
  | 'flat'
  | 'bordered'
  | 'square'
  | 'tableStyle'
  | 'tableClass'
  | 'tableHeaderStyle'
  | 'tableHeaderClass'
  | 'cardContainerStyle'
  | 'cardContainerClass'
  | 'cardStyle'
  | 'cardClass'
  | 'titleClass'
  | 'fullscreen'
  | 'noRouteFullscreenExit'
  | 'virtualScrollTarget'
  | 'virtualScrollStickySizeStart'
  | 'grid'
  | 'gridHeader'
  | 'loading'
>

export type QTrDefaultProps = Pick<QTrProps, 'noHover'>
export type QTdDefaultProps = Pick<QTdProps, 'noHover'>
export type QTabPanelsDefaultProps = Pick<
  QTabPanelsProps,
  | 'keepAlive'
  | 'keepAliveInclude'
  | 'keepAliveExclude'
  | 'keepAliveMax'
  | 'animated'
  | 'infinite'
  | 'swipeable'
  | 'vertical'
>
export type QTabsDefaultProps = Pick<
  QTabsProps,
  | 'activeColor'
  | 'activeBgColor'
  | 'indicatorColor'
  | 'contentClass'
  | 'activeClass'
  | 'dense'
  | 'breakpoint'
>
export type QTabDefaultProps = Pick<QTabProps, 'contentClass' | 'ripple'>
export type QRouteTabDefaultProps = Pick<QRouteTabProps, 'contentClass' | 'ripple'>
export type QTimelineDefaultProps = Pick<QTimelineProps, 'color' | 'side' | 'layout'>
export type QTimelineEntryDefaultProps = Pick<QTimelineEntryProps, 'color' | 'side'>
export type QTimeDefaultProps = Pick<
  QTimeProps,
  | 'color'
  | 'textColor'
  | 'square'
  | 'flat'
  | 'bordered'
  | 'name'
  | 'landscape'
  | 'format24h'
  | 'options'
  | 'hourOptions'
  | 'minuteOptions'
  | 'secondOptions'
  | 'withSeconds'
>
export type QBtnToggleDefaultProps = Pick<
  QBtnToggleProps,
  | 'color'
  | 'textColor'
  | 'toggleColor'
  | 'toggleTextColor'
  | 'outline'
  | 'flat'
  | 'unelevated'
  | 'rounded'
  | 'push'
  | 'glossy'
  | 'size'
  | 'padding'
  | 'ripple'
  | 'dense'
  | 'name'
>
export type QToggleDefaultProps = Pick<
  QToggleProps,
  'size' | 'color' | 'dense' | 'iconColor' | 'size' | 'color' | 'dense' | 'iconColor'
>
export type QToolbarDefaultProps = Pick<QToolbarProps, 'inset'>
export type QToolbarTitleDefaultProps = Pick<QToolbarTitleProps, 'shrink'>
export type QTooltipDefaultProps = Pick<
  QTooltipProps,
  'scrollTarget' | 'target' | 'noParentEvent' | 'delay' | 'hideDelay'
>
export type QTreeDefaultProps = Pick<
  QTreeProps,
  | 'noConnectors'
  | 'color'
  | 'controlColor'
  | 'textColor'
  | 'selectedColor'
  | 'dense'
  | 'duration'
  | 'tickStrategy'
  | 'noSelectionUnset'
  | 'defaultExpandAll'
  | 'accordion'
  | 'noTransition'
>
export type QUploaderDefaultProps = Pick<
  QUploaderProps,
  | 'color'
  | 'textColor'
  | 'square'
  | 'flat'
  | 'bordered'
  | 'multiple'
  | 'accept'
  | 'capture'
  | 'maxFileSize'
  | 'maxTotalSize'
  | 'maxFiles'
  | 'filter'
  | 'autoUpload'
  | 'hideUploadBtn'
>
export type QVideoDefaultProps = Pick<
  QVideoProps,
  'ratio' | 'fetchpriority' | 'loading' | 'referrerpolicy'
>
export type QVirtualScrollDefaultProps = Pick<
  QVirtualScrollProps,
  'virtualScrollHorizontal' | 'scrollTarget'
>
