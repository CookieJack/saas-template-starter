import type { Component } from "vue"

export interface UserState {
  user_id: number
  access_token: string,
  refresh_token: string,
  role_ids: string[]
  roles: string[] | null
  username: string
  nickname: string
  avatar: string
  ecommerce: string | null
}

export enum ComponentTypesEnum {
  HEADER = 1,        // 页头(已用)
  FOOTER = 2,        // 页尾(已用)
  NOTICE = 3,        // 公告
  NEWS = 4,          // 新闻(已用)
  UPDATES = 5,       // 动态/更新
  BANNER = 6,        // 横幅(已用)
  CAROUSEL = 7,      // 轮播图
  MARQUEE = 8,       // 跑马灯
  GRAPHICS = 9,      // 图文
  HONOR = 10,        // 荣誉墙(已用)
  SERVICE = 11,      // 服务(已用)
  CAROUSEL_TYPE = 12,// 类型轮播图(已用)
  COOPERATE = 13,    // 合作(已用)
  SINGLE_POINT = 14, // 单点
  MULTI_POINT = 15,  // 多点
  PROCESS = 16,       // 流程
  CARDGRID = 17, // 卡片网格一二
  IMAGE_DISPLAY = 18, // 图片展示(已用)
  PRODUCT_DISPLAY = 19, //商品展示
  NEWS_LIST = 20, // 新闻列表/新闻列表二
  //21已用
  GRAPHICS_ARTICLE = 23, // 图文-文章
  LARGE_CAROUSEL = 24,// 大轮播图
  ADVANTAGE_CARD = 25,// 优势卡片
  PAIN_POINTS_LIST = 26,// 痛点列表
  GRAPHICS_HONOR = 27,// 图文荣誉墙
  RICH_TEXT = 28,// 富文本
  GENERAL = 29,// 通用组件
}

export interface BaseComponent {
  name: string,
  type: ComponentTypesEnum,
  component: Component
  disabled: boolean
}

export interface LibComponent extends BaseComponent {
  sort: number,
  icon: any,
}

interface BaseComponentConfig {
  id?: number //ID
  themeId?: number //组件主题ID
  name: string //组件名称
  style: Record<string, any> //组件样式
  tags?: string[] //组件标签
  sort?: number //组件排序
  upsertBy?: string //操作人
  upsertTime?: string //操作时间
  tenantId?: string //组件租户ID
}

export type DynamicComponentConfig =
  | NewsComponentConfig
  | CarouselComponentConfig
  | LargeCarouselComponentConfig
  | GraphicsComponentConfig
  | HonorComponentConfig
  | ServiceComponentConfig
  | CarouselTypeComponentConfig
  | CooperateComponentConfig
  | BannerComponentConfig
  | CardgridOneComponentConfig
  | CardgridTwoComponentConfig
  | ImageDisplayComponentConfig
  | SinglePointComponentConfig
  | MultiPointComponentConfig
  | ProcessComponentConfig
  | ProductDisplayComponentConfig
  | NewsListComponentConfig
  | NewsListTwoComponentConfig
  | ImageGridComponentConfig

  | AdvantageCardComponentConfig
  | RichTextComponentConfig
  ;

export interface DecorationThemeConfig {
  id?: number
  themeId?: number //主题ID
  name: string //主题名称
  description: string //主题描述
  level: number //主题等级
  mainColor: string //主颜色
  enabled: boolean //是否启用
  shortcut: string //快照Url
  componentList: {
    themeList: String[]
  }
  components: (HeaderComponentConfig | DynamicComponentConfig | FooterComponentConfig)[]
}

export interface HeaderComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.HEADER //页头
  isCarouselShow?: boolean //是否显示轮播图（已废弃，保留向下兼容）
  carousel?: string[] //轮播图集合（已废弃，保留向下兼容）
  backImage?: string //背景图片Url
  logo: string //logo图片Url
  extra: {
    isInternationalization?: boolean //是否支持国际化
    isShowFirstLevelNav?: boolean //是否显示一级导航
    isShowSearch?: boolean //是否显示搜索框
    ExpandIcon?: string //展开图标
    ArrowIcon?: string //箭头图标
    SearchIcon?: string //搜索图标
  } //预留字段
  elements: {
    title: string //顶部导航名称
    titleEN?: string //顶部导航英文名称
    sort: number //排序
    level: number //导航层级
    link: string //一级导航链接
    isCarouselShow?: boolean //是否显示轮播图
    carousel?: string[] //该导航的轮播图集合
    children?: {
      title: string //二级导航名称
      titleEN?: string //二级导航英文名称
      level: number //导航层级
      sort: number //排序
      icon: string //二级导航图标
      link: string //二级导航链接
      children?: {
        title: string //三级导航名称
        titleEN?: string //三级导航英文名称
        level: number //导航层级
        sort: number //排序
        icon: string //三级导航图标
        link: string //三级导航链接
      }[]
    }[]
  }[]
}

export interface FooterComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.FOOTER //页尾
  logo?: string //logo图片Url
  telephone?: string //联系电话
  address?: string //联系地址
  email?: string //联系邮箱
  qrCode?: string //二维码
  copyright: string //版权
  icp: string //备案号
  gwab?: string //网文备案号
  elements?: {
    title: string //导航栏标题
    url: string //链接地址
    sort: number //排序
    bodys?: {
      title: string //二次导航栏标题
      url: string //链接地址
      sort: number //排序
    }[]
  }[]
  extra: {
    isShowRelatedLinks: boolean //是否显示相关链接
    relatedLinks: {
      title: string //链接标题
      url: string //链接地址
    }[]
    isShowQrCode: boolean //是否显示二维码（未传入时默认显示）
  }
}

export interface NewsComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.NEWS //新闻
  cmpBackground: string //组件背景图片Url
  backImage: string //背景图片Url
  title: string //主标题
  subtitle: string //副标题
  link: string //链接
  extra?: {
    type: string[] //选择的分类类型列表
    typeId: number[] //选择的分类ID列表
    path: string //跳转路由路径
  }
  elements: {
    title: string //分类标题
    subtitle: string //新闻标题
    sort: number //排序
    image: string //图片Url
    description: string //描述
  }[]
}

export interface CarouselComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.CAROUSEL //轮播图
  backImage: string //大背景图片Url
  cmpBackground: string //组件背景图片Url
  title: string //主标题
  subtitle: string //副标题
  link: string //链接
  elements: {
    title: string //标题
    backImage: string //背景图片Url
    image: string //图片Url
    description: string //描述
    bar: {
      price: string//价格文本
      backgroundColor: string//价格按钮背景色
      barLink?: string//跳转链接
    }
    sort: number //排序
  }[]
}

export interface LargeCarouselComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.LARGE_CAROUSEL //大轮播图
  elements: {
    image: string //图片URL
    title?: string //图片标题
    link?: string //跳转链接
    sort: number //排序
  }[]
}

export interface AdvantageCardComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.ADVANTAGE_CARD //优势卡片
  title: string //主标题
  subTitle: string | null //副标题
  backImage: string | null //背景图片Url
  cmpBackground: string | null //组件背景图片Url
  isSubTitleShow: boolean //是否显示副标题
  elements: {
    title: string //卡片标题
    subTitle: string | null //卡片副标题
    isSubTitleShow: boolean //是否显示卡片副标题
    headBackgroundMode: number //背景模式（1：图片，2：颜色填充）
    headBackgroundImg: string | null //背景图片Url
    headBackgroundColor: string | null //背景颜色
    sort: number //排序
    elements: {
      icon: string | null //图标Url
      isIconShow: boolean //是否显示图标
      sort: number //排序
      content: string //内容
    }[]
  }[]
}

export interface GraphicsComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.GRAPHICS //图文
  cmpBackground: string //组件背景图片Url
  backImage: string //背景图片Url
  title: string //主标题
  subtitle: string //副标题
  content: string //内容
  media: string //媒体url
  bar: {  //bar 内容参数可以替换（后端使用List<JsonObj>存储）
    title: string //标题
    number: number //数字
    unit: string //单位
  }[]
  link: string //链接
}

export interface HonorComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.HONOR //荣誉墙
  backImage: string //背景图片Url
  elements: { //内容参数可以替换（后端使用List<JsonObj>存储）
    title: string //标题
    image: string //图片Url
    sort: number //排序
  }[]
}

export interface ServiceComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.SERVICE //服务
  backImage: string //背景图片Url
  cmpBackground: string //组件背景图片Url
  title: string //主标题
  subtitle: string //副标题
  elements: {
    title: string //标题
    icon: string //图标Url
    products: {
      title: string //标题
      sort: number //排序
      description: string //描述
      buttonText?: string //按钮文字
      link: string //链接
      style: {
        cardImage?: string //卡片背景图片Url
        cardColor?: string //卡片背景颜色
      }
    }[]
  }[]
}

export interface CarouselTypeComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.CAROUSEL_TYPE //类型轮播图
  backImage: string //大背景图片Url
  cmpBackground: string //组件背景图片Url
  title: string //主标题
  subtitle: string //副标题
  link?: string //链接
  elements: {
    columns: string //栏目
    cards: { //内容参数可以替换（后端使用List<JsonObj>存储）
      title: string //标题
      content: string //内容
      image: string //图片Url（卡片内容图片）
      style: {
        cardImage?: string //卡片背景图片Url
        cardColor?: string //卡片背景颜色
      }
      link?: string //跳转链接
    }[]
    style: string //卡片样式
  }[]
}

export interface CooperateComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.COOPERATE //合作
  backImage: string //大背景图片Url
  cmpBackground: string //组件背景图片Url
  title: string //主标题
  subtitle: string //副标题
  counts: number //数量
  countsTitle: string //数量标题
  text: string //内容
  images: string[] //图片Url集合
}

export interface SinglePointComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.SINGLE_POINT //分点单点
  backImage: string //背景图片Url
  title: string //主标题
  subtitle: string //副标题
  extra: {}
  elements: {
    backImage: string //背景图片Url
    icon: string  //图标Url
    logo: string //logo图片Url
    title: string //标题
    description: string //描述
    sort: number //排序
  }[]
}


export interface MultiPointComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.MULTI_POINT //分点多点
  backImage: string //背景图片Url
  title: string //主标题
  subtitle: string //副标题
  elements: {
    style: {
      background: {}
      showElementBackground?: boolean //是否显示点位背景
    }
    backImage: string //背景图片Url
    title: string //标题
    sort: number //排序
    children: {
      title: string //子标题
      description: string //描述
      sort: number //排序
      image: string //图片Url
      link?: string //链接（可选）
    }[]
  }[]
}

export interface ProcessComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.PROCESS //流程
  backImage: string //背景图片Url
  title: string //主标题
  subtitle: string //副标题
  processTitle: string //流程标题
  elements: {
    backImage: string //背景图片Url
    title: string //标题
    sort: number //排序
  }[]
}

export interface BannerComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.BANNER//横幅
  backImage: string//背景图片
  title: string//主标题
  subtitle: string//副标题
  btnContent: string//按钮内容
  link: string//按钮跳转链接
}

/**
 * 卡片网格一组件配置
 *
 * @interface CardgridOneComponentConfig
 * @extends BaseComponentConfig
 *
 * 样式配置继承自BaseComponentConfig的style: Record<string, any>字段
 *
 * Elements配置结构（行级配置）:
 * @param elements - 行级别配置数组，每行可以设置不同的卡片数量
 * @param elements[].rowId - 行唯一标识符
 * @param elements[].itemsPerRow - 该行展示的卡片个数 (1-4)
 * @param elements[].cards - 该行的卡片数据数组
 * @param elements[].cards[].cardId - 卡片唯一标识符
 */
export interface CardgridOneComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.CARDGRID // 卡片网格一
  backImage: string // 背景图片Url
  title: string // 主标题
  subtitle: string // 副标题
  elements: {
    rowId: string // 行ID
    itemsPerRow: number // 该行卡片数量 (1-4)
    cards: { // //内容参数可以替换（后端使用List<JsonObj>存储）
      cardId: string // 卡片ID
      title: string // 卡片标题
      subtitle: string // 卡片副标题
      icon: string // 图标Url
      backgroundColor?: string // 单独背景色
      backgroundImage?: string // 单独背景图片
      sort: number // 卡片排序
    }[]
    sort: number // 行排序
  }[]
}

/**
 * 卡片网格二组件配置
 *
 * @interface CardgridTwoComponentConfig
 * @extends BaseComponentConfig
 *
 * 样式配置继承自BaseComponentConfig的style: Record<string, any>字段
 *
 * Elements配置结构（行级配置）:
 * @param elements - 行级别配置数组，每行可以设置不同的卡片数量
 * @param elements[].rowId - 行唯一标识符
 * @param elements[].itemsPerRow - 该行展示的卡片个数 (1-4)
 * @param elements[].cards - 该行的卡片数据数组
 * @param elements[].cards[].cardId - 卡片唯一标识符
 */
export interface CardgridTwoComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.CARDGRID // 卡片网格二
  backImage: string // 背景图片Url
  title: string // 主标题
  subtitle: string // 副标题
  elements: {
    rowId: string // 行ID
    itemsPerRow: number // 该行卡片数量 (1-4)
    cards: {
      cardId: string // 卡片ID
      title: string // 卡片标题
      subtitleItems: string[] // 副标题列表项（最多3条）
      backgroundColor?: string // 单独背景色
      backgroundImage?: string // 单独背景图片
      sort: number // 卡片排序
    }[]
    sort: number // 行排序
  }[]
}

export interface ImageDisplayComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.IMAGE_DISPLAY // 图片展示
  backImage: string // 背景图片Url
}

export interface ProductDisplayComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.PRODUCT_DISPLAY // 商品展示
  backImage: string // 背景图片Url
  pageSize: number
  elements: {}
}

export interface NewsListComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.NEWS_LIST // 新闻列表
  backImage: string // 背景图片Url
  pageSize: number // 每页显示数量
  title?: string // 主标题
  subtitle?: string // 副标题
  tabs: {
    id: string // 标签ID
    typeId: number // 标签对应的新闻类型ID
    color?: string // 标签选中时的颜色
  }[]
  elements: [] // 新闻数据由后端API提供
}

export interface NewsListTwoComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.NEWS_LIST // 新闻列表
  backImage: string // 背景图片Url
  pageSize: number // 每页显示数量
  tabs: {
    id: string // 标签ID
    typeId: number // 标签对应的新闻类型ID
    color?: string // 标签选中时的颜色
  }[]
  elements: [] // 新闻数据由后端API提供
}

/**
 * 图片网格组件配置
 *
 * @interface ImageGridComponentConfig
 * @extends BaseComponentConfig
 *
 * 支持按行配置图片展示，每行可单独设置图片数量，一行最多展示6个图片，宽度平均分配
 *
 * @param title - 组件标题
 * @param subtitle - 组件副标题
 * @param backImage - 背景图片URL
 * @param elements - 行级别配置数组，每行可以设置不同的图片数量
 * @param elements[].rowId - 行唯一标识符
 * @param elements[].itemsPerRow - 该行展示的图片个数 (1-6)
 * @param elements[].cards - 该行的图片数据数组
 * @param elements[].cards[].imageId - 图片唯一标识符
 * @param elements[].cards[].src - 图片URL
 * @param elements[].cards[].alt - 图片描述
 * @param elements[].cards[].link - 图片点击跳转链接
 * @param elements[].sort - 行排序
 */
export interface ImageGridComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.CARDGRID // 图片网格
  title: string // 主标题
  subtitle: string // 副标题
  backImage: string // 背景图片URL
  elements: {
    rowId: string // 行唯一标识符
    itemsPerRow: number // 该行图片数量 (1-6)
    cards: {
      imageId: string // 图片唯一标识符
      src: string // 图片URL
      alt: string // 图片描述
      link?: string // 图片点击跳转链接
      sort: number // 图片排序
    }[]
    sort: number // 行排序
  }[]
}

export interface GraphicsArticleComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.GRAPHICS_ARTICLE // 图文-文章
  extra: {
    newsTitle?: string[] // 新闻分类标题（兼容旧版）
    secondType?: string[] // 新闻二级分类
  } //预留字段
  imageList: string[] //背景图片Url
  title: string //主标题
  subTitle: string //副标题
  backImage: string //背景图片
  link: string //链接
  linkText: string //链接按钮文字
}


export type TimeMachineConfig = {
  history: (
    HeaderComponentConfig |
    DynamicComponentConfig |
    FooterComponentConfig)[][] // 历史记录
  currentIndex: number // 当前历史记录索引
  historyLimit: number // 历史记录限制
}

export interface PainPointsListComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.PAIN_POINTS_LIST //痛点列表
  title: string //主标题
  subtitle: string | null //副标题
  isSubTitleShow: boolean //是否显示副标题
  backImage: string | null //背景图片Url
  cmpBackground: string | null //组件背景图片Url
  elements: {
    title: string //标题
    icon: string | null //图标Url
    isIconShow: boolean //是否显示图标
    backgroundMode: number //背景模式（1：图片，2：颜色填充）
    backgroundColor?: string | null //自定义背景颜色
    backgroundImg?: string | null //自定义背景图片Url
    content: string //内容
    sort: number //排序
  }[]
}

export interface CaseCarouselComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.MULTI_POINT //案例轮播图,共用一个Enum
  title: string //主标题
  subtitle: string | null //副标题
  isSubTitleShow: boolean //是否显示副标题
  backImage: string | null //背景图片Url
  cmpBackground: string | null //组件背景图片Url
  elements: {  //一个轮播行
    title: string //标题
    backImage: string | null //图标Url
    sort: number //排序
    children: {  //一个轮播项
      title: string //标题
      image: string | null //案例图片Url
      description: string //内容
      sort: number //排序
    }[]
  }[]
}

export interface GraphicsHonorComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.GRAPHICS_HONOR //图文荣誉墙
  backImage: string //背景图片Url
  cmpBackground: string //组件背景图片Url
  title: string //主标题
  subtitle: string //副标题
  content: string //内容
  media: string //媒体url
  bar: {  //bar 内容参数可以替换（后端使用List<JsonObj>存储）
    title: string //标题
    number: number //数字
    unit: string //单位
  }[]
  elements: { //荣誉墙内容参数可以替换（后端使用List<JsonObj>存储）
    title: string //标题
    image: string //图片Url
    sort: number //排序
  }[]
}

export interface RichTextComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.RICH_TEXT //富文本
  backImage: string //背景图片Url
  content: string //富文本内容
}

export interface GENERALComponentConfig extends BaseComponentConfig {
  cmpntType: ComponentTypesEnum.GENERAL //通用组件
  title: string //主标题
  subtitle?: string //副标题
  content: Record<string, any> //内容参数可以替换  （后端使用JsonObj存储）
  elements: {
    title: string //标题
    subtitle?: string //副标题
    backImage?: string | null //背景图片Url
    content?: Record<string, any> //内容参数可以替换（后端使用JsonObj存储）
    style?: Record<string, any> //组件样式
    sort?: number //排序
    bodys?: {
      title: string //标题
      subtitle?: string //副标题
      backImage?: string | null //背景图片Url
      content?: Record<string, any> //内容参数可以替换（后端使用JsonObj存储）
      style?: Record<string, any> //组件样式
      sort: number //排序
    }[]
  }[]
}