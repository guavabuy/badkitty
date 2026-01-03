/**
 * 国际化模块 (i18n)
 * 支持中文 (zh) 和英文 (en)
 * 
 * 使用方式：
 * - I18n.t('key') 获取当前语言的翻译
 * - I18n.setLang('en') 切换语言
 * - I18n.getLang() 获取当前语言
 */

const I18n = {
    // 当前语言
    currentLang: 'zh',
    
    // 支持的语言
    supportedLangs: ['zh', 'en', 'ja'],
    
    // 本地存储key
    STORAGE_KEY: 'preferredLanguage',
    
    /**
     * 术语表 - 遵循PRD规范：emoji + 汉字 + (读音/解释)
     * 首次出现使用完整格式，后续可简写
     */
    terms: {
        yijing: { zh: '易经', en: '☯️ Yi Jing (I Ching)', ja: '☯️ 易経（えききょう）' },
        jieqi: { zh: '节气', en: '🗓️ Jie Qi (Solar Terms)', ja: '🗓️ 節気（せっき）' },
        wuxing: { zh: '五行', en: '🪵 Wu Xing (Five Elements)', ja: '🪵 五行（ごぎょう）' },
        tiangan: { zh: '天干', en: '🐉 Tian Gan (Heavenly Stems)', ja: '🐉 天干（てんかん）' },
        dizhi: { zh: '地支', en: '🌿 Di Zhi (Earthly Branches)', ja: '🌿 地支（ちし）' },
        shishen: { zh: '十神', en: '🧩 Shi Shen (Ten Gods)', ja: '🧩 十神（じゅっしん）' },
        shichen: { zh: '时辰', en: '⏰ Shi Chen (Chinese Hour)', ja: '⏰ 時辰（じしん）' },
        fengshui: { zh: '风水', en: '🧭 Feng Shui (Geomancy)', ja: '🧭 風水（ふうすい）' },
        hehun: { zh: '合婚', en: '💞 He Hun (Compatibility)', ja: '💞 合婚（がっこん）' },
        taisui: { zh: '太岁', en: '📍 Tai Sui (Year Deity)', ja: '📍 太歳（たいさい）' },
        bazi: { zh: '八字', en: '🔮 Ba Zi (Four Pillars)', ja: '🔮 八字（はちじ）' },
        dayun: { zh: '大运', en: '🌊 Da Yun (Decade Luck)', ja: '🌊 大運（だいうん）' },
        liunian: { zh: '流年', en: '📅 Liu Nian (Annual Luck)', ja: '📅 流年（りゅうねん）' },
        rizhu: { zh: '日主', en: '☀️ Ri Zhu (Day Master)', ja: '☀️ 日主（にっしゅ）' },
    },

    /**
     * 翻译数据
     */
    translations: {
        zh: {
            // ========== 通用 ==========
            'site.name': 'KOAKUMA KITTY [易占] Fortune',
            'site.subtitle': '✨ 师承倪师，逢运帮助有缘喵~ ✨',
            'site.footer': '💖 KOAKUMA KITTY [易占] Fortune - 有点坏但很准 💖',
            'site.disclaimer': '✧ 仅供娱乐参考，不作为婚姻、投资等重大决策依据 ✧',
            'site.disclaimer_sub': '命运掌握在你自己手里～本喵只是提供参考啦 🐱',
            'site.domain': 'koakumakitty.com',
            
            // 语言切换
            'lang.switch': '中文 | EN',
            'lang.zh': '中文',
            'lang.en': 'EN',
            
            // 导航
            'nav.yearly2026': '2026丙午年运势',
            'nav.daily': '今日运势',
            'nav.bazi': '八字命盘',
            'nav.name': '名字解密',
            'nav.yijing': '摇一摇',
            'nav.fengshui': '风水分析',
            'nav.marriage': '姻缘配对',
            'nav.facereading': '观相',
            'nav.auspicious': '良辰吉日',
            
            // 视频区
            'video.title': '📺 关于倪师',
            'video.desc': '✨ 了解倪海厦大师的传奇人生 ✨',
            
            // 表单通用
            'form.required': '(必填喵)',
            'form.optional': '(选填)',
            'form.optional_hint': '🐾 喵~ 资料填得越多，Kitty算得越准哦！下面都是可选的，别偷懒嘛~',
            'form.birthdate': '🎂 先告诉Kitty你的生日~',
            'form.birthdate_simple': '🎂 你是哪天来到这个世界的？',
            'form.hour': '⏰ 出生时辰',
            'form.hour_unknown': '不知道啦~ 😿',
            'form.gender': '💁 你是...',
            'form.gender_secret': '保密 🙈',
            'form.gender_male': 'gg 👦',
            'form.gender_female': 'mm 👧',
            'form.name': '✏️ 你的大名',
            'form.name_placeholder': '不告诉Kitty也行啦...哼!',
            
            // 时辰选项
            'hour.0': '子时 (23:00-01:00) 🌙 夜猫子时间',
            'hour.1': '丑时 (01:00-03:00) 😴 睡眠黄金期',
            'hour.2': '寅时 (03:00-05:00) 🐅 老虎醒来了',
            'hour.3': '卯时 (05:00-07:00) 🌅 早起の小可爱',
            'hour.4': '辰时 (07:00-09:00) 🐲 龙龙时间',
            'hour.5': '巳时 (09:00-11:00) ☀️ 阳光灿烂',
            'hour.6': '午时 (11:00-13:00) 🔥 正午最强',
            'hour.7': '未时 (13:00-15:00) 🐑 午后慵懒',
            'hour.8': '申时 (15:00-17:00) 🐵 猴子出没',
            'hour.9': '酉时 (17:00-19:00) 🌇 黄昏浪漫',
            'hour.10': '戌时 (19:00-21:00) 🐕 晚饭时间',
            'hour.11': '亥时 (21:00-23:00) 🐷 夜宵走起',
            
            // 按钮
            'btn.submit': '🔮 让Kitty帮你算算~',
            'btn.loading': '推算中...',
            'btn.share': '📤 分享结果',
            'btn.like': '点赞',
            'btn.liked': '已赞',
            
            // 每日运势
            'daily.title': '🌙 今日运势播报 🌙',
            'daily.subtitle': '看看今天适合干什么坏事~ 嘿嘿 😼',
            'daily.submit': '🔮 看看今天的运气~',
            'daily.overall': '综合运势',
            'daily.career': '事业运',
            'daily.wealth': '财运',
            'daily.love': '感情运',
            'daily.health': '健康运',
            'daily.lucky_color': '幸运颜色',
            'daily.lucky_number': '幸运数字',
            'daily.lucky_direction': '吉利方位',
            'daily.today_zodiac': '今日生肖',
            'daily.advice_title': '今日建议',
            'daily.hide_seek_question': '喵~ 今天要不要去蹲猫猫（做大事）呀？',
            'daily.hide_seek_hint': '让Kitty帮你看看今天适不适合做重要的事情~',
            'daily.hide_seek_btn': '📅 良辰吉日，看看今天行不行！',
            
            // 八字
            'bazi.title': '✨ 八字命盘解读 ✨',
            'bazi.subtitle': '告诉我你的生日，让Kitty偷看你的命运本本~',
            'bazi.hour_important': '⏰ 几点出生的呀（很重要哦~）',
            'bazi.submit': '🔮 让Kitty帮你算算~',
            'bazi.year_pillar': '年柱',
            'bazi.month_pillar': '月柱',
            'bazi.day_pillar': '日柱',
            'bazi.hour_pillar': '时柱',
            
            // 2026运势
            'yearly2026.title': '🐴 2026丙午年运势 🐴',
            'yearly2026.subtitle': '基于《天纪》理论，看看你的2026年运势如何~',
            'yearly2026.submit': '🐴 看看2026运势~',
            
            // 姓名
            'name.title': '💌 名字の秘密 💌',
            'name.subtitle': '你的名字里藏着什么小秘密？让坏坏Kitty告诉你~',
            'name.input_label': '✏️ 写下你的名字吧~',
            'name.input_placeholder': '在这里输入中文名字哦',
            'name.submit': '💖 解锁名字密码',
            
            // 易经
            'yijing.title': '🎱 摇一摇占卜 🎱',
            'yijing.subtitle': '闭上眼睛想一个问题，让命运给你答案~',
            'yijing.question_label': '🤔 你想问什么？（偷偷告诉Kitty）',
            'yijing.question_placeholder': '比如：他是不是喜欢我？我的考试能过吗？要不要辞职？...',
            'yijing.submit': '✨ 摇啊摇~ 开始占卜!',
            'yijing.loading': 'Kitty正在摇骰子中... 🎲',
            
            // 风水
            'fengshui.title': '🏠 阳宅风水分析 🏠',
            'fengshui.subtitle': '基于《地脉道》理论，看看你的房子风水怎么样~',
            'fengshui.year_label': '🎂 你的出生年份',
            'fengshui.orientation_label': '🚪 你家大门朝向（很重要哦~）',
            'fengshui.orientation_placeholder': '请选择房屋坐向...',
            'fengshui.floorplan_label': '🏠 上传户型图（可选，可获得更详细的布局分析~）',
            'fengshui.floorplan_upload': '点击上传户型图或拖拽到此处',
            'fengshui.floorplan_hint': '支持 jpg、png 格式，可选功能~',
            'fengshui.floorplan_remove': '🗑️ 移除户型图',
            'fengshui.submit': '🧭 Kitty帮你看风水~',
            
            // 姻缘
            'marriage.title': '💑 姻缘配对分析 💑',
            'marriage.subtitle': '基于八字+姓名的深度配对分析~看看你们的缘分有多深~',
            'marriage.person1_title': '👤 你的信息',
            'marriage.person2_title': '👤 TA的信息',
            'marriage.name_label': '✏️ 你的名字',
            'marriage.name2_label': '✏️ TA的名字',
            'marriage.name_placeholder': '请输入中文名字',
            'marriage.submit': '💕 八字+姓名深度配对~',
            
            // 面相
            'facereading.title': '👀 面相分析 👀',
            'facereading.subtitle': '基于倪师《人间道》，让Kitty帮你看看面相~',
            'facereading.upload_hint': '点击上传照片或拖拽到此处',
            'facereading.upload_sub_hint': '建议使用正面清晰的照片哦~',
            'facereading.camera_btn': '📸 拍照',
            'facereading.upload_btn': '🖼️ 选择照片',
            'facereading.retake_btn': '📸 换一张',
            'facereading.submit': '🔮 Kitty帮你看面相~',
            'facereading.loading': 'Kitty正在仔细看你的面相... 🐱',
            'facereading.error_title': '😿 哎呀，出错了呢~',
            'facereading.error_hint': '请刷新页面重试，或换一张照片试试~',
            
            // 良辰吉日
            'auspicious.title': '📅 良辰吉日择选 📅',
            'auspicious.subtitle': '基于《天纪》择日理论，让Kitty帮你挑个好日子~',
            'auspicious.activity_label': '🎯 你想做什么？',
            'auspicious.target_date_label': '📆 你计划的日期',
            'auspicious.submit': '🔮 Kitty帮你选日子~',
            
            // 活动选项
            'activity.confession': '💕 表白告白',
            'activity.wedding': '💒 结婚嫁娶',
            'activity.mahjong': '🀄 打麻将',
            'activity.moving': '🏠 搬家入宅',
            'activity.dinner': '🍜 聚餐宴请',
            'activity.travel': '✈️ 出远门',
            
            // 房屋朝向
            'orientation.n_s': '坐北朝南 ☀️ 最经典的朝向',
            'orientation.s_n': '坐南朝北 ❄️ 采光较少',
            'orientation.e_w': '坐东朝西 🌅 早晨阳光',
            'orientation.w_e': '坐西朝东 🌇 西晒较多',
            'orientation.ne_sw': '坐东北朝西南 ↗️',
            'orientation.sw_ne': '坐西南朝东北 ↙️',
            'orientation.se_nw': '坐东南朝西北 ↘️',
            'orientation.nw_se': '坐西北朝东南 ↖️',
            
            // 分享相关
            'share.title': 'Kitty坏坏算命屋',
            'share.subtitle': '✨ 师承倪师，逢运帮助有缘喵~ ✨',
            'share.scan_hint': '扫码体验更多算命功能~',
            'share.generating': '生成中...',
            'share.text': '看看我的算命结果~',
            'share.daily_title': 'Kitty每日运势',
            'share.daily_text': '今日运势已揭晓~ 🐱✨',
            'share.yearly_title': 'Kitty 2026运势',
            'share.yearly_text': '看看我的2026运势~ 🐴✨',
            
            // 错误提示
            'error.select_date': '请选择出生日期',
            'error.enter_name': '请输入姓名',
            'error.chinese_name': '请输入中文姓名',
            'error.select_orientation': '请选择房屋坐向哦~',
            'error.upload_photo': '请先上传一张照片哦~',
            'error.select_target_date': '请选择你计划的日期哦~',
            'error.both_names': '请输入双方的姓名哦~',
            'error.both_dates': '请选择双方的出生日期~',
            'error.calculation': '计算出错，请重试',
            'error.analysis': '分析出错，请重试',
            'error.share': '生成分享图片失败，请重试~',
            
            // 精准度提示
            'accuracy.high': '✨ 资料很全，Kitty算得超精准哦！喵喵喵~',
            'accuracy.medium': '🐱 还可以哦，资料再多一点就更准了~',
            'accuracy.low': '😼 资料有点少哦，Kitty只能算个大概~',
            'accuracy.minimal': '😿 只知道生日...下次多告诉Kitty一些呗~',
            
            // 免责声明
            'disclaimer.general': '⚠️ 以上分析仅供娱乐参考，不作为投资、求职、婚姻等重大决策依据',
            'disclaimer.daily': '⚠️ 每日运势仅供参考，不作为重大决策依据～',
            'disclaimer.dayun': '⚠️ 大运分析基于传统命理理论，仅供参考，不作为重大决策依据',
        },
        
        en: {
            // ========== General ==========
            'site.name': 'KOAKUMA KITTY [易占] Fortune',
            'site.subtitle': '✨ Inspired by Master Ni, helping destined souls~ ✨',
            'site.footer': '💖 KOAKUMA KITTY [易占] Fortune - A bit naughty but accurate 💖',
            'site.disclaimer': '✧ For entertainment only, not for major life decisions ✧',
            'site.disclaimer_sub': 'Your destiny is in your own hands~ Kitty just gives hints 🐱',
            'site.domain': 'koakumakitty.com',
            
            // Language switch
            'lang.switch': '中文 | EN',
            'lang.zh': '中文',
            'lang.en': 'EN',
            
            // Navigation
            'nav.yearly2026': '2026 Fortune',
            'nav.daily': 'Daily Fortune',
            'nav.bazi': 'Ba Zi Reading',
            'nav.name': 'Name Analysis',
            'nav.yijing': 'I Ching',
            'nav.fengshui': 'Feng Shui',
            'nav.marriage': 'Compatibility',
            'nav.facereading': 'Face Reading',
            'nav.auspicious': 'Auspicious Days',
            
            // Video section
            'video.title': '📺 About Master Ni',
            'video.desc': '✨ Discover the legendary life of Master Ni Haixia ✨',
            
            // Form common
            'form.required': '(required)',
            'form.optional': '(optional)',
            'form.optional_hint': '🐾 Meow~ The more info you provide, the more accurate Kitty can be!',
            'form.birthdate': '🎂 Tell Kitty your birthday~',
            'form.birthdate_simple': '🎂 When were you born?',
            'form.hour': '⏰ Birth Hour',
            'form.hour_unknown': "I don't know~ 😿",
            'form.gender': '💁 You are...',
            'form.gender_secret': 'Secret 🙈',
            'form.gender_male': 'Male 👦',
            'form.gender_female': 'Female 👧',
            'form.name': '✏️ Your Name',
            'form.name_placeholder': "It's okay not to tell Kitty... hmph!",
            
            // Hour options (using Chinese hour system with English explanations)
            'hour.0': 'Zi (23:00-01:00) 🌙 Night Owl Time',
            'hour.1': 'Chou (01:00-03:00) 😴 Deep Sleep',
            'hour.2': 'Yin (03:00-05:00) 🐅 Tiger Awakens',
            'hour.3': 'Mao (05:00-07:00) 🌅 Early Bird',
            'hour.4': 'Chen (07:00-09:00) 🐲 Dragon Time',
            'hour.5': 'Si (09:00-11:00) ☀️ Sunny Morning',
            'hour.6': 'Wu (11:00-13:00) 🔥 High Noon',
            'hour.7': 'Wei (13:00-15:00) 🐑 Lazy Afternoon',
            'hour.8': 'Shen (15:00-17:00) 🐵 Monkey Hour',
            'hour.9': 'You (17:00-19:00) 🌇 Sunset Romance',
            'hour.10': 'Xu (19:00-21:00) 🐕 Dinner Time',
            'hour.11': 'Hai (21:00-23:00) 🐷 Night Snack',
            
            // Buttons
            'btn.submit': '🔮 Let Kitty Read~',
            'btn.loading': 'Calculating...',
            'btn.share': '📤 Share Result',
            'btn.like': 'Like',
            'btn.liked': 'Liked',
            
            // Daily Fortune
            'daily.title': '🌙 Daily Fortune 🌙',
            'daily.subtitle': "Let's see what mischief suits today~ Hehe 😼",
            'daily.submit': '🔮 Check Today\'s Fortune~',
            'daily.overall': 'Overall',
            'daily.career': 'Career',
            'daily.wealth': 'Wealth',
            'daily.love': 'Love',
            'daily.health': 'Health',
            'daily.lucky_color': 'Lucky Color',
            'daily.lucky_number': 'Lucky Number',
            'daily.lucky_direction': 'Lucky Direction',
            'daily.today_zodiac': 'Today\'s Zodiac',
            'daily.advice_title': 'Daily Advice',
            'daily.hide_seek_question': 'Meow~ Planning something big today?',
            'daily.hide_seek_hint': 'Let Kitty check if today is suitable for important matters~',
            'daily.hide_seek_btn': '📅 Check if today is auspicious!',
            
            // Ba Zi
            'bazi.title': '✨ Ba Zi (Four Pillars) Reading ✨',
            'bazi.subtitle': 'Tell me your birthday and let Kitty peek at your destiny~',
            'bazi.hour_important': '⏰ What time were you born? (Very important!)',
            'bazi.submit': '🔮 Let Kitty Calculate~',
            'bazi.year_pillar': 'Year',
            'bazi.month_pillar': 'Month',
            'bazi.day_pillar': 'Day',
            'bazi.hour_pillar': 'Hour',
            
            // 2026 Fortune
            'yearly2026.title': '🐴 2026 Year of the Fire Horse 🐴',
            'yearly2026.subtitle': 'Based on Tian Ji theory, see your 2026 fortune~',
            'yearly2026.submit': '🐴 Check 2026 Fortune~',
            
            // Name Analysis
            'name.title': '💌 Name Secrets 💌',
            'name.subtitle': 'What secrets hide in your name? Let naughty Kitty tell you~',
            'name.input_label': '✏️ Write your name~',
            'name.input_placeholder': 'Enter Chinese name here',
            'name.submit': '💖 Unlock Name Secrets',
            
            // Yi Jing
            'yijing.title': '🎱 I Ching Divination 🎱',
            'yijing.subtitle': 'Close your eyes, think of a question, let fate answer~',
            'yijing.question_label': '🤔 What do you want to ask? (Whisper to Kitty)',
            'yijing.question_placeholder': 'E.g.: Does he like me? Will I pass the exam? Should I quit?...',
            'yijing.submit': '✨ Shake~ Start Divination!',
            'yijing.loading': 'Kitty is shaking the coins... 🎲',
            
            // Feng Shui
            'fengshui.title': '🏠 Feng Shui Analysis 🏠',
            'fengshui.subtitle': 'Based on Di Mai Dao theory, see your home\'s feng shui~',
            'fengshui.year_label': '🎂 Your Birth Year',
            'fengshui.orientation_label': '🚪 Your Door Direction (Very important!)',
            'fengshui.orientation_placeholder': 'Select house orientation...',
            'fengshui.floorplan_label': '🏠 Upload Floor Plan (Optional, for detailed analysis~)',
            'fengshui.floorplan_upload': 'Click to upload or drag floor plan here',
            'fengshui.floorplan_hint': 'Supports jpg, png formats, optional~',
            'fengshui.floorplan_remove': '🗑️ Remove Floor Plan',
            'fengshui.submit': '🧭 Kitty Checks Feng Shui~',
            
            // Marriage Compatibility
            'marriage.title': '💑 Compatibility Analysis 💑',
            'marriage.subtitle': 'Deep Ba Zi + Name matching~See how deep your fate connection is~',
            'marriage.person1_title': '👤 Your Info',
            'marriage.person2_title': "👤 Partner's Info",
            'marriage.name_label': '✏️ Your Name',
            'marriage.name2_label': "✏️ Partner's Name",
            'marriage.name_placeholder': 'Enter Chinese name',
            'marriage.submit': '💕 Deep Ba Zi + Name Matching~',
            
            // Face Reading
            'facereading.title': '👀 Face Reading 👀',
            'facereading.subtitle': 'Based on Master Ni\'s Ren Jian Dao, let Kitty read your face~',
            'facereading.upload_hint': 'Click to upload or drag photo here',
            'facereading.upload_sub_hint': 'Clear front-facing photo recommended~',
            'facereading.camera_btn': '📸 Take Photo',
            'facereading.upload_btn': '🖼️ Choose Photo',
            'facereading.retake_btn': '📸 Retake',
            'facereading.submit': '🔮 Kitty Reads Your Face~',
            'facereading.loading': 'Kitty is carefully examining your face... 🐱',
            'facereading.error_title': '😿 Oops, something went wrong~',
            'facereading.error_hint': 'Please refresh and try again, or use a different photo~',
            // Face reading privacy & disclaimer (required for EN)
            'facereading.privacy_notice': '🔒 Privacy: Photos are analyzed locally only and never uploaded to any server.',
            'facereading.legal_disclaimer': '⚠️ Disclaimer: This feature is for entertainment and learning purposes only. Not intended for medical, employment, financial decisions, or identity verification.',
            
            // Auspicious Days
            'auspicious.title': '📅 Auspicious Day Selection 📅',
            'auspicious.subtitle': 'Based on Tian Ji date selection, let Kitty pick a good day~',
            'auspicious.activity_label': '🎯 What do you want to do?',
            'auspicious.target_date_label': '📆 Your Planned Date',
            'auspicious.submit': '🔮 Kitty Picks a Day~',
            
            // Activity options
            'activity.confession': '💕 Confess Love',
            'activity.wedding': '💒 Wedding',
            'activity.mahjong': '🀄 Play Mahjong',
            'activity.moving': '🏠 Move House',
            'activity.dinner': '🍜 Dinner Party',
            'activity.travel': '✈️ Long Trip',
            
            // House orientation
            'orientation.n_s': 'North to South ☀️ Classic',
            'orientation.s_n': 'South to North ❄️ Less Light',
            'orientation.e_w': 'East to West 🌅 Morning Sun',
            'orientation.w_e': 'West to East 🌇 Afternoon Sun',
            'orientation.ne_sw': 'Northeast to Southwest ↗️',
            'orientation.sw_ne': 'Southwest to Northeast ↙️',
            'orientation.se_nw': 'Southeast to Northwest ↘️',
            'orientation.nw_se': 'Northwest to Southeast ↖️',
            
            // Share related
            'share.title': 'KOAKUMA KITTY [易占] Fortune',
            'share.subtitle': '✨ Inspired by Master Ni ✨',
            'share.scan_hint': 'Scan for more fortune features~',
            'share.generating': 'Generating...',
            'share.text': 'Check out my fortune reading~',
            'share.daily_title': 'Kitty Daily Fortune',
            'share.daily_text': "Today's fortune revealed~ 🐱✨",
            'share.yearly_title': 'Kitty 2026 Fortune',
            'share.yearly_text': 'Check my 2026 fortune~ 🐴✨',
            
            // Error messages
            'error.select_date': 'Please select birth date',
            'error.enter_name': 'Please enter name',
            'error.chinese_name': 'Please enter Chinese name',
            'error.select_orientation': 'Please select house orientation~',
            'error.upload_photo': 'Please upload a photo first~',
            'error.select_target_date': 'Please select your target date~',
            'error.both_names': 'Please enter both names~',
            'error.both_dates': 'Please select both birth dates~',
            'error.calculation': 'Calculation error, please retry',
            'error.analysis': 'Analysis error, please retry',
            'error.share': 'Failed to generate share image, please retry~',
            
            // Accuracy hints
            'accuracy.high': '✨ Great info! Kitty can be super accurate! Meow~',
            'accuracy.medium': '🐱 Not bad, a bit more info would be better~',
            'accuracy.low': '😼 Info is a bit sparse, Kitty can only give a rough reading~',
            'accuracy.minimal': '😿 Only birthday... tell Kitty more next time~',
            
            // Disclaimers
            'disclaimer.general': '⚠️ For entertainment only, not for investment, career, or marriage decisions',
            'disclaimer.daily': '⚠️ Daily fortune is for reference only, not for major decisions~',
            'disclaimer.dayun': '⚠️ Da Yun analysis based on traditional theory, for reference only',
            
            // ========== Five Elements ==========
            'element.wood': 'Wood',
            'element.fire': 'Fire',
            'element.earth': 'Earth',
            'element.metal': 'Metal',
            'element.water': 'Water',
            
            // ========== Zodiac Animals ==========
            'zodiac.rat': 'Rat',
            'zodiac.ox': 'Ox',
            'zodiac.tiger': 'Tiger',
            'zodiac.rabbit': 'Rabbit',
            'zodiac.dragon': 'Dragon',
            'zodiac.snake': 'Snake',
            'zodiac.horse': 'Horse',
            'zodiac.goat': 'Goat',
            'zodiac.monkey': 'Monkey',
            'zodiac.rooster': 'Rooster',
            'zodiac.dog': 'Dog',
            'zodiac.pig': 'Pig',
            
            // ========== Ten Gods ==========
            'tengod.bijian': 'Bi Jian (Friend)',
            'tengod.jiecai': 'Jie Cai (Rob Wealth)',
            'tengod.shishen': 'Shi Shen (Eating God)',
            'tengod.shangguan': 'Shang Guan (Hurting Officer)',
            'tengod.pianyin': 'Pian Yin (Indirect Seal)',
            'tengod.zhengyin': 'Zheng Yin (Direct Seal)',
            'tengod.pianguan': 'Pian Guan (7 Killings)',
            'tengod.zhengguan': 'Zheng Guan (Direct Officer)',
            'tengod.piancai': 'Pian Cai (Indirect Wealth)',
            'tengod.zhengcai': 'Zheng Cai (Direct Wealth)',
            
            // ========== Directions ==========
            'direction.east': 'East',
            'direction.south': 'South',
            'direction.west': 'West',
            'direction.north': 'North',
            'direction.northeast': 'Northeast',
            'direction.southeast': 'Southeast',
            'direction.southwest': 'Southwest',
            'direction.northwest': 'Northwest',
            
            // ========== Colors ==========
            'color.red': 'Red',
            'color.orange': 'Orange',
            'color.yellow': 'Yellow',
            'color.green': 'Green',
            'color.cyan': 'Cyan',
            'color.blue': 'Blue',
            'color.purple': 'Purple',
            'color.gold': 'Gold',
            'color.white': 'White',
            'color.black': 'Black',
            
            // ========== Tai Sui Relations ==========
            'taisui.chong': 'Clash Tai Sui',
            'taisui.hai': 'Harm Tai Sui',
            'taisui.sanhe': 'Triple Harmony',
            'taisui.liuhe': 'Six Harmony',
            'taisui.benming': 'Birth Year',
            'taisui.ping': 'Neutral',
            'taisui.po': 'Break',
            
            // ========== Strength Levels ==========
            'strength.strong': 'Strong',
            'strength.balanced': 'Balanced',
            'strength.weak': 'Weak',
        },
        
        ja: {
            // ========== 通用 ==========
            'site.name': 'KOAKUMA KITTY [易占] Fortune',
            'site.subtitle': '✨ 倪師匠に学び、ご縁のある方をお導きするにゃ～ ✨',
            'site.footer': '💖 KOAKUMA KITTY [易占] Fortune - ちょっとイジワルだけど当たる 💖',
            'site.disclaimer': '✧ 娯楽目的のみ、重大な決断の参考にはしないでね ✧',
            'site.disclaimer_sub': '運命は自分の手の中にあるの～Kittyはヒントを教えるだけ 🐱',
            'site.domain': 'koakumakitty.com',
            
            // 言語切り替え
            'lang.switch': '中文 | EN | 日本語',
            'lang.zh': '中文',
            'lang.en': 'EN',
            'lang.ja': '日本語',
            
            // ナビゲーション
            'nav.yearly2026': '2026運勢',
            'nav.daily': '今日の運勢',
            'nav.bazi': '八字命盤',
            'nav.name': '名前解読',
            'nav.yijing': '易経おみくじ',
            'nav.fengshui': '風水分析',
            'nav.marriage': '相性診断',
            'nav.auspicious': '吉日選び',
            
            // ビデオセクション
            'video.title': '📺 倪師匠について',
            'video.desc': '✨ 伝説の倪海厦師匠の人生を覗いてみて～ ✨',
            
            // フォーム共通
            'form.required': '(必須にゃ)',
            'form.optional': '(任意)',
            'form.optional_hint': '🐾 にゃ～情報が多いほど、Kittyの占いは正確になるよ！',
            'form.birthdate': '🎂 まずは誕生日を教えて～',
            'form.birthdate_simple': '🎂 いつ生まれたの？',
            'form.hour': '⏰ 生まれた時間',
            'form.hour_unknown': '知らないにゃ～ 😿',
            'form.gender': '💁 あなたは...',
            'form.gender_secret': 'ヒミツ 🙈',
            'form.gender_male': '男の子 👦',
            'form.gender_female': '女の子 👧',
            'form.name': '✏️ お名前',
            'form.name_placeholder': '教えてくれなくてもいいけど...ふん！',
            
            // 時辰オプション
            'hour.0': '子の刻 (23:00-01:00) 🌙 夜更かしタイム',
            'hour.1': '丑の刻 (01:00-03:00) 😴 熟睡タイム',
            'hour.2': '寅の刻 (03:00-05:00) 🐅 虎の目覚め',
            'hour.3': '卯の刻 (05:00-07:00) 🌅 早起きさん',
            'hour.4': '辰の刻 (07:00-09:00) 🐲 龍のパワー',
            'hour.5': '巳の刻 (09:00-11:00) ☀️ 陽光燦々',
            'hour.6': '午の刻 (11:00-13:00) 🔥 真昼の力',
            'hour.7': '未の刻 (13:00-15:00) 🐑 午後のまどろみ',
            'hour.8': '申の刻 (15:00-17:00) 🐵 おさるタイム',
            'hour.9': '酉の刻 (17:00-19:00) 🌇 夕暮れロマンス',
            'hour.10': '戌の刻 (19:00-21:00) 🐕 ディナータイム',
            'hour.11': '亥の刻 (21:00-23:00) 🐷 夜食タイム',
            
            // ボタン
            'btn.submit': '🔮 Kittyに占わせて～',
            'btn.loading': '占い中...',
            'btn.share': '📤 結果をシェア',
            'btn.like': 'いいね',
            'btn.liked': 'いいね済',
            
            // 今日の運勢
            'daily.title': '🌙 今日の運勢 🌙',
            'daily.subtitle': '今日は何をするのがいいかな～へへ 😼',
            'daily.submit': '🔮 今日の運勢を見る～',
            'daily.overall': '総合運',
            'daily.career': '仕事運',
            'daily.wealth': '金運',
            'daily.love': '恋愛運',
            'daily.health': '健康運',
            'daily.lucky_color': 'ラッキーカラー',
            'daily.lucky_number': 'ラッキーナンバー',
            'daily.lucky_direction': '吉方位',
            'daily.today_zodiac': '今日の干支',
            'daily.advice_title': '今日のアドバイス',
            'daily.hide_seek_question': 'にゃ～今日は大事なことする予定？',
            'daily.hide_seek_hint': '今日が大事なことに向いてるか、Kittyがチェックしてあげる～',
            'daily.hide_seek_btn': '📅 吉日かどうかチェック！',
            
            // 八字
            'bazi.title': '✨ 八字命盤解読 ✨',
            'bazi.subtitle': '誕生日を教えて、Kittyに運命の本をこっそり覗かせて～',
            'bazi.hour_important': '⏰ 何時に生まれた？(とても大事だよ～)',
            'bazi.submit': '🔮 Kittyに計算させて～',
            'bazi.year_pillar': '年柱',
            'bazi.month_pillar': '月柱',
            'bazi.day_pillar': '日柱',
            'bazi.hour_pillar': '時柱',
            
            // 2026運勢
            'yearly2026.title': '🐴 2026丙午年の運勢 🐴',
            'yearly2026.subtitle': '《天紀》理論に基づいて、2026年の運勢をチェック～',
            'yearly2026.submit': '🐴 2026年の運勢を見る～',
            
            // 名前解読
            'name.title': '💌 名前の秘密 💌',
            'name.subtitle': 'あなたの名前にはどんな秘密が隠れてる？小悪魔Kittyが教えてあげる～',
            'name.input_label': '✏️ お名前を書いて～',
            'name.input_placeholder': 'ここに漢字の名前を入力してね',
            'name.submit': '💖 名前の秘密を解読',
            
            // 易経
            'yijing.title': '🎱 易経おみくじ 🎱',
            'yijing.subtitle': '目を閉じて質問を思い浮かべて、運命に答えを求めよう～',
            'yijing.question_label': '🤔 何を聞きたい？(Kittyにこっそり教えて)',
            'yijing.question_placeholder': '例：彼は私のこと好き？試験に受かる？転職すべき？...',
            'yijing.submit': '✨ シャカシャカ～占い開始！',
            'yijing.loading': 'Kittyがコインを振っているよ... 🎲',
            
            // 風水
            'fengshui.title': '🏠 風水分析 🏠',
            'fengshui.subtitle': '《地脈道》理論に基づいて、お家の風水をチェック～',
            'fengshui.year_label': '🎂 生まれ年',
            'fengshui.orientation_label': '🚪 玄関の向き (とても大事だよ～)',
            'fengshui.orientation_placeholder': '家の向きを選んでね...',
            'fengshui.floorplan_label': '🏠 間取り図をアップロード (任意、より詳しい分析ができるよ～)',
            'fengshui.floorplan_upload': 'クリックまたはドラッグで間取り図をアップロード',
            'fengshui.floorplan_hint': 'jpg、png形式に対応～',
            'fengshui.floorplan_remove': '🗑️ 間取り図を削除',
            'fengshui.submit': '🧭 Kittyが風水を見るよ～',
            
            // 相性診断
            'marriage.title': '💑 相性診断 💑',
            'marriage.subtitle': '八字＋名前の深い相性分析～二人の縁はどのくらい深い？',
            'marriage.person1_title': '👤 あなたの情報',
            'marriage.person2_title': '👤 お相手の情報',
            'marriage.name_label': '✏️ お名前',
            'marriage.name2_label': '✏️ お相手のお名前',
            'marriage.name_placeholder': '漢字の名前を入力',
            'marriage.submit': '💕 八字＋名前で深い相性診断～',
            
            // 吉日選び
            'auspicious.title': '📅 吉日選び 📅',
            'auspicious.subtitle': '《天紀》の択日理論に基づいて、Kittyがいい日を選んであげる～',
            'auspicious.activity_label': '🎯 何をしたい？',
            'auspicious.target_date_label': '📆 予定の日付',
            'auspicious.submit': '🔮 Kittyが日を選ぶよ～',
            
            // アクティビティ選択肢
            'activity.confession': '💕 告白する',
            'activity.wedding': '💒 結婚式',
            'activity.mahjong': '🀄 麻雀大会',
            'activity.moving': '🏠 引っ越し',
            'activity.dinner': '🍜 パーティー',
            'activity.travel': '✈️ 遠出・旅行',
            
            // 家の向き
            'orientation.n_s': '北向き玄関（南座） ☀️ 定番',
            'orientation.s_n': '南向き玄関（北座） ❄️ 日当たり少なめ',
            'orientation.e_w': '東向き玄関（西座） 🌅 朝日が入る',
            'orientation.w_e': '西向き玄関（東座） 🌇 西日が入る',
            'orientation.ne_sw': '北東向き玄関 ↗️',
            'orientation.sw_ne': '南西向き玄関 ↙️',
            'orientation.se_nw': '南東向き玄関 ↘️',
            'orientation.nw_se': '北西向き玄関 ↖️',
            
            // シェア関連
            'share.title': 'KOAKUMA KITTY [易占] Fortune',
            'share.subtitle': '✨ 倪師匠に学んだ本格占い ✨',
            'share.scan_hint': 'スキャンしてもっと占いを体験～',
            'share.generating': '生成中...',
            'share.text': '私の占い結果を見て～',
            'share.daily_title': 'Kitty今日の運勢',
            'share.daily_text': '今日の運勢が出たよ～ 🐱✨',
            'share.yearly_title': 'Kitty 2026運勢',
            'share.yearly_text': '私の2026運勢を見て～ 🐴✨',
            
            // エラーメッセージ
            'error.select_date': '生年月日を選んでね',
            'error.enter_name': '名前を入力してね',
            'error.chinese_name': '漢字の名前を入力してね',
            'error.select_orientation': '家の向きを選んでね～',
            'error.upload_photo': 'まず写真をアップロードしてね～',
            'error.select_target_date': '予定の日付を選んでね～',
            'error.both_names': '二人の名前を入力してね～',
            'error.both_dates': '二人の生年月日を選んでね～',
            'error.calculation': '計算エラー、もう一度試してね',
            'error.analysis': '分析エラー、もう一度試してね',
            'error.share': 'シェア画像の生成に失敗、もう一度試してね～',
            
            // 精度ヒント
            'accuracy.high': '✨ 情報バッチリ！Kittyの占いは超精密だよ！にゃんにゃん～',
            'accuracy.medium': '🐱 まあまあね、もう少し情報があればもっと正確になるよ～',
            'accuracy.low': '😼 情報が少ないなあ、大まかにしか占えないよ～',
            'accuracy.minimal': '😿 誕生日だけか...次はもっと教えてよね～',
            
            // 免責事項
            'disclaimer.general': '⚠️ この分析は娯楽目的のみ、投資・就職・結婚などの重大な決断の参考にはしないでね',
            'disclaimer.daily': '⚠️ 今日の運勢は参考程度に、重大な決断には使わないでね～',
            'disclaimer.dayun': '⚠️ 大運分析は伝統的な命理理論に基づく、参考程度にしてね',
            
            // ========== 五行 ==========
            'element.wood': '木',
            'element.fire': '火',
            'element.earth': '土',
            'element.metal': '金',
            'element.water': '水',
            
            // ========== 干支 ==========
            'zodiac.rat': '子（ねずみ）',
            'zodiac.ox': '丑（うし）',
            'zodiac.tiger': '寅（とら）',
            'zodiac.rabbit': '卯（うさぎ）',
            'zodiac.dragon': '辰（たつ）',
            'zodiac.snake': '巳（へび）',
            'zodiac.horse': '午（うま）',
            'zodiac.goat': '未（ひつじ）',
            'zodiac.monkey': '申（さる）',
            'zodiac.rooster': '酉（とり）',
            'zodiac.dog': '戌（いぬ）',
            'zodiac.pig': '亥（いのしし）',
            
            // ========== 十神 ==========
            'tengod.bijian': '比肩（ひけん）',
            'tengod.jiecai': '劫財（ごうざい）',
            'tengod.shishen': '食神（しょくじん）',
            'tengod.shangguan': '傷官（しょうかん）',
            'tengod.pianyin': '偏印（へんいん）',
            'tengod.zhengyin': '正印（せいいん）',
            'tengod.pianguan': '偏官（へんかん）',
            'tengod.zhengguan': '正官（せいかん）',
            'tengod.piancai': '偏財（へんざい）',
            'tengod.zhengcai': '正財（せいざい）',
            
            // ========== 方位 ==========
            'direction.east': '東',
            'direction.south': '南',
            'direction.west': '西',
            'direction.north': '北',
            'direction.northeast': '北東',
            'direction.southeast': '南東',
            'direction.southwest': '南西',
            'direction.northwest': '北西',
            
            // ========== 色 ==========
            'color.red': '赤',
            'color.orange': 'オレンジ',
            'color.yellow': '黄色',
            'color.green': '緑',
            'color.cyan': 'シアン',
            'color.blue': '青',
            'color.purple': '紫',
            'color.gold': 'ゴールド',
            'color.white': '白',
            'color.black': '黒',
            
            // ========== 太歳関係 ==========
            'taisui.chong': '太歳衝突',
            'taisui.hai': '太歳害',
            'taisui.sanhe': '三合',
            'taisui.liuhe': '六合',
            'taisui.benming': '本命年',
            'taisui.ping': '平穏',
            'taisui.po': '破',
            
            // ========== 強さレベル ==========
            'strength.strong': '強い',
            'strength.balanced': 'バランス型',
            'strength.weak': '弱い',
        }
    },
    
    /**
     * 初始化 - 从URL路径判断语言
     * 注意：不自动跳转，以URL路径为准
     */
    init() {
        // 检查URL路径判断语言 - URL路径优先
        const path = window.location.pathname;
        if (path.startsWith('/ja/') || path === '/ja') {
            this.currentLang = 'ja';
        } else if (path.startsWith('/en/') || path === '/en') {
            this.currentLang = 'en';
        } else {
            // 中文版（/ 或其他路径）
            this.currentLang = 'zh';
        }
        
        // 保存当前语言偏好（根据URL判断，不自动跳转）
        localStorage.setItem(this.STORAGE_KEY, this.currentLang);
        
        console.log(`[i18n] Initialized with language: ${this.currentLang}`);
    },
    
    /**
     * 获取当前语言
     */
    getLang() {
        return this.currentLang;
    },
    
    /**
     * 设置语言
     * @param {string} lang - 'zh' 或 'en'
     */
    setLang(lang) {
        if (!this.supportedLangs.includes(lang)) {
            console.warn(`[i18n] Unsupported language: ${lang}`);
            return;
        }
        
        localStorage.setItem(this.STORAGE_KEY, lang);
        this.redirectToLang(lang);
    },
    
    /**
     * 跳转到对应语言的页面
     * @param {string} lang - 目标语言
     */
    redirectToLang(lang) {
        const currentPath = window.location.pathname;
        const hash = window.location.hash;
        
        // 判断当前语言
        let currentLangPath = 'zh';
        if (currentPath.startsWith('/ja')) {
            currentLangPath = 'ja';
        } else if (currentPath.startsWith('/en')) {
            currentLangPath = 'en';
        }
        
        // 如果目标语言与当前相同，不跳转
        if (lang === currentLangPath) {
            return;
        }
        
        // 构建新路径
        let newPath;
        if (lang === 'ja') {
            newPath = '/ja/' + hash;
        } else if (lang === 'en') {
            newPath = '/en/' + hash;
        } else {
            newPath = '/' + hash;
        }
        
        window.location.href = newPath;
    },
    
    /**
     * 切换语言
     */
    toggleLang() {
        const newLang = this.currentLang === 'zh' ? 'en' : 'zh';
        this.setLang(newLang);
    },
    
    /**
     * 获取翻译文本
     * @param {string} key - 翻译key
     * @param {Object} params - 插值参数 {name: 'xxx'}
     * @returns {string} 翻译后的文本
     */
    t(key, params = {}) {
        const langData = this.translations[this.currentLang];
        let text = langData[key];
        
        if (text === undefined) {
            // 回退到中文
            text = this.translations.zh[key];
            if (text === undefined) {
                console.warn(`[i18n] Missing translation: ${key}`);
                return key;
            }
        }
        
        // 替换插值参数
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
        });
        
        return text;
    },
    
    /**
     * 获取术语（带读音的格式）
     * @param {string} term - 术语key
     * @param {boolean} short - 是否使用简写
     */
    term(term, short = false) {
        const termData = this.terms[term];
        if (!termData) {
            return term;
        }
        
        if (this.currentLang === 'zh') {
            return termData.zh;
        }
        
        if (this.currentLang === 'ja') {
            // 日语版返回完整格式或简写
            if (short) {
                // 提取汉字部分作为简写（去掉emoji和读音）
                const match = termData.ja.match(/[^\s]+\s+(.+?)（/);
                if (match) {
                    return match[1];
                }
            }
            return termData.ja;
        }
        
        // 英文版返回完整格式或简写
        if (short) {
            // 提取拼音部分作为简写
            const match = termData.en.match(/([^\s]+)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
            if (match) {
                return match[2]; // 只返回拼音部分
            }
        }
        return termData.en;
    },
    
    /**
     * 检查是否为英文
     */
    isEnglish() {
        return this.currentLang === 'en';
    },
    
    /**
     * 检查是否为中文
     */
    isChinese() {
        return this.currentLang === 'zh';
    },
    
    /**
     * 检查是否为日语
     */
    isJapanese() {
        return this.currentLang === 'ja';
    },
    
    /**
     * 获取当前语言的分享URL基础路径
     */
    getShareBaseUrl() {
        const domain = 'https://koakumakitty.com';
        if (this.currentLang === 'ja') return `${domain}/ja/`;
        if (this.currentLang === 'en') return `${domain}/en/`;
        return `${domain}/`;
    },
    
    /**
     * 获取当前语言的UTM参数（英文版/日文版追加）
     * @param {string} module - 模块名
     */
    getShareUtm(module) {
        if (this.currentLang === 'ja') {
            return `?utm_source=share&utm_medium=image&utm_campaign=${module}_ja`;
        }
        if (this.currentLang === 'en') {
            return `?utm_source=share&utm_medium=image&utm_campaign=${module}_en`;
        }
        return '';
    },
    
    /**
     * 生成完整的分享链接
     * @param {string} module - 模块名 (bazi, daily, etc.)
     */
    getShareLink(module) {
        const base = this.getShareBaseUrl();
        const utm = this.getShareUtm(module);
        return `${base}#${module}${utm}`;
    }
};

// 页面加载时初始化
if (typeof window !== 'undefined') {
    I18n.init();
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}

console.log('[i18n] Module loaded');

