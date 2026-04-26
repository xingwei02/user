<template>
  <div class="distributor-page">
    <div class="layout">
      <!-- 左侧侧边栏 1:1 还原截图菜单 -->
      <aside class="sidebar">
        <div class="menu-list">
          <div
            v-for="item in menuList"
            :key="item.key"
            class="menu-item"
            :class="{ active: currentMenu === item.key }"
            @click="currentMenu = item.key"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </aside>

      <!-- 右侧主内容区 -->
      <main class="main-content">
        <!-- 1. 先看这里 -->
        <div v-if="currentMenu === 'home'">
          <div class="top-banner">
            <div class="top-banner__hero">
              <p class="top-banner__slogan">一个人慢，一群人快，睡着也在涨。</p>
              <h2>发条链接，两种赚法：</h2>
              <p>① 小伙伴买 Token，你拿钱。</p>
              <p>② 小伙伴也来卖，他每一单，你都分。</p>

              <div class="top-banner__guide">
                <p>看板怎么用？三步就够：</p>
                <p>1. 复制上面的「我的推广链接」，发出去。</p>
                <p>2. 去「客户优惠」给买家设个折扣，他们更愿意下单。</p>
                <p>3. 想带人一起卖，去「伙伴等级返佣」定好每一档怎么分。</p>
                <p>其他页面（详细数据、订单记录、订单结算、团队结构）都是看战绩的，闲下来再翻。</p>
              </div>
            </div>

            <div class="top-banner__side">
              <div class="card promo-side-card">
                <h3>我的推广码</h3>
                <div class="promo-inline-row">
                  <strong class="promo-inline-code">{{ dashboard.affiliate_code || '--' }}</strong>
                  <button class="btn btn-default btn-sm" @click="copyPromotionLink">复制推广链接</button>
                </div>
              </div>

              <div class="card promo-side-card">
                <h3>我的推广链接</h3>
                <div class="promo-link-box">{{ promotionLinkText }}</div>
              </div>

              <div class="card promo-side-card">
                <h3>带你的人（联系方式）</h3>
                <div v-if="hasParentContact" class="parent-contact-info">
                  <div v-if="dashboard.parent_contact_qq" class="contact-item">
                    <span class="contact-label">QQ：</span>
                    <span class="contact-value">{{ dashboard.parent_contact_qq }}</span>
                  </div>
                  <div v-if="dashboard.parent_contact_wx" class="contact-item">
                    <span class="contact-label">微信：</span>
                    <span class="contact-value">{{ dashboard.parent_contact_wx }}</span>
                  </div>
                  <div v-if="dashboard.parent_contact_other" class="contact-item">
                    <span class="contact-label">其它：</span>
                    <span class="contact-value">{{ dashboard.parent_contact_other }}</span>
                  </div>
                  <div v-if="dashboard.parent_announcement" class="contact-announcement">
                    <div class="announcement-content">{{ dashboard.parent_announcement }}</div>
                  </div>
                </div>
                <div v-else class="empty-tip">暂无上级联系方式</div>
              </div>
            </div>
          </div>

          <div class="grid-3 mb-20">
            <div class="card">
              <h3>我现在能拿多少</h3>
              <div class="stat-item">
                <div class="label">当前比例</div>
                <div class="value">{{ formatPercent(currentCommissionRate) }}</div>
                <div class="sub text-gray">新加入伙伴优先按当前入门档 / 实际生效档位展示</div>
              </div>
              <div class="stat-item highlight">
                <div class="label">最高可拿</div>
                <div class="value">{{ formatPercent(dashboard.max_commission_rate) }}</div>
              </div>
              <div v-if="nextUpgradeText" class="tip">下一步怎么升级<br>{{ nextUpgradeText }}</div>
            </div>

            <div class="card">
              <h3>你先看这3个钱数就够了</h3>
              <div class="stat-item success">
                <div class="label">已结打款</div>
                <div class="value">{{ dashboard.paid_commission ?? '--' }}</div>
              </div>
              <div class="stat-item warning">
                <div class="label">还没打款</div>
                <div class="value">{{ dashboard.pending_commission ?? '--' }}</div>
              </div>
              <div class="stat-item">
                <div class="label">累计营收</div>
                <div class="value">{{ dashboard.total_commission ?? '--' }}</div>
              </div>
              <div class="tip">如果一时看不懂复杂报表，就先累计打款、已打款、未打款这3个数字。</div>
            </div>

            <div class="card">
              <h3>你现在的团队情况</h3>
              <div class="grid-2">
                <div class="stat-item">
                  <div class="label">直属伙伴</div>
                <div class="value">{{ dashboard.direct_partners ?? '--' }}</div>
                </div>
                <div class="stat-item">
                  <div class="label">累计订单</div>
                <div class="value">{{ dashboard.total_orders ?? '--' }}</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="label">累计销售</div>
                <div class="value">{{ dashboard.total_sales || '--' }}</div>
              </div>
              <div class="tip blue">你现在最该做的事：去「订单明细」看看哪些订单是通过你来的。</div>
            </div>
          </div>

          <div class="grid-3 mb-20">
            <div class="card">
              <h3>你现在只要做这3步</h3>
              <div class="step-item">
                <div class="step-num">1</div>
                <div class="step-content">
                  <h4>发你的链接</h4>
                  <p>别人通过你的链接进入并下单，你就会开始得佣金。</p>
                </div>
              </div>
              <button class="btn btn-primary" @click="copyPromotionLink">复制推广链接</button>
            </div>

            <div class="card">
              <h3></h3>
              <div class="step-item">
                <div class="step-num">2</div>
                <div class="step-content">
                  <h4>给伙伴等级和返佣</h4>
                  <p>如果你要带人推广，就在这里定好每一挡能赚多少、怎么升级。</p>
                </div>
              </div>
              <button class="btn btn-default" @click="currentMenu = 'level'">伙伴等级返佣</button>
            </div>

            <div class="card">
              <h3></h3>
              <div class="step-item">
                <div class="step-num">3</div>
                <div class="step-content">
                  <h4>设置客户优惠和招募资料</h4>
                  <p>客户优惠会影响别人愿不愿意下单；联系方式和公告会展示给加入你的伙伴。</p>
                </div>
              </div>
              <button class="btn btn-default" @click="currentMenu = 'contact'">伙伴联系资料</button>
            </div>
          </div>

          <div class="grid-2">
            <div class="card">
              <h3>这套体系其实很简单</h3>
              <p>你把链接发给别人。</p>
              <p>别人通过你的链接下单，你赚钱。</p>
              <p>你带来的伙伴默认从{{ formatPercent(levels.entry_rate || dashboard.entry_rate || 0) }}开始，后续升到哪一档、每档返多少，都在「伙伴等级返佣」里设置。</p>
              <p>你赚得越多，达到目标后，能拿到的比例就越高。</p>
            </div>

            <div class="card">
              <h3>看懂以后，再去这些页面</h3>
              <div class="link-item" @click="currentMenu = 'data'">
                <span>详细数据</span>
                <span>→</span>
              </div>
              <div class="link-item" @click="currentMenu = 'team'">
                <span>团队结构</span>
                <span>→</span>
              </div>
              <div class="link-item" @click="currentMenu = 'settle'">
                <span>订单结算</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 1.5 加入官方群 -->
        <div v-if="currentMenu === 'group'">
          <h2 class="page-title">加入官方群</h2>
          <p class="page-desc">这里统一查看你当前推广体系里的官方群公告、群二维码、上级/默认引导图，以及首页对外展示开关是否已开启。</p>

          <div class="alert alert-blue mb-20">
            <h4>当前展示规则</h4>
            <p>这个页面是推广中心内部核对页；真正给外部访客展示时，还会同时受「客户优惠」中的首页官方群栏目开关控制。</p>
          </div>

          <div class="grid-3 mb-20">
            <div class="card">
              <div class="label">首页官方群栏目</div>
              <div class="value" :class="discountSettings.group_section_enabled ? 'green' : 'red'">
                {{ discountSettings.group_section_enabled ? '显示中' : '已隐藏' }}
              </div>
              <div class="sub">
                {{ discountSettings.group_section_enabled ? '通过你链接进入的用户，可在首页底部看到官方群入口。' : '通过你链接进入的用户，当前看不到首页官方群入口。' }}
              </div>
            </div>

            <div class="card">
              <div class="label">当前群公告</div>
              <div class="value" style="font-size:16px;line-height:1.6;word-break:break-word;">
                {{ contactInfo.notice || '暂未填写公告' }}
              </div>
            </div>

            <div class="card">
              <div class="label">当前素材状态</div>
              <div class="value">{{ groupSectionVisible ? '已具备展示内容' : '内容不足，暂不建议对外展示' }}</div>
              <div class="sub">需同时关注：栏目开关、公告、群二维码/引导图是否齐全。</div>
            </div>
          </div>

          <div class="grid-2 mb-20">
            <div class="card">
              <h3>官方群二维码</h3>
              <p class="form-tip">优先展示你在「伙伴联系资料」里上传的官方群二维码。</p>
              <div class="upload-placeholder">
                <img
                  v-if="contactInfo.group_image_url"
                  :src="contactInfo.group_image_url"
                  style="max-width:260px;max-height:260px;border-radius:12px;"
                  alt="官方群二维码"
                >
                <p v-else>你还没有上传官方群二维码，可前往「伙伴联系资料」补充。</p>
              </div>
            </div>

            <div class="card">
              <h3>上级 / 默认引导图</h3>
              <p class="form-tip">当你未上传自己的群图时，会继续回退到上级 / 管理员默认引导图。</p>
              <div class="upload-placeholder">
                <img
                  v-if="contactInfo.parent_group_image_url"
                  :src="contactInfo.parent_group_image_url"
                  style="max-width:260px;max-height:260px;border-radius:12px;"
                  alt="官方群引导图"
                >
                <p v-else>当前没有上级 / 默认引导图。</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>对外展示预览</h3>
            <p class="form-tip">这里按首页「扫码加入官方群」的语义做预览，方便你直接核对当前素材是否完整。</p>

            <div v-if="groupSectionVisible">
              <div class="preview-box mb-20">
                <strong>扫码加入官方群</strong>
                <p style="margin-top:8px;color:#666;line-height:1.7;">{{ contactInfo.notice || '当前未填写公告' }}</p>
              </div>

              <div class="grid-2">
                <div class="card" v-if="contactInfo.group_image_url">
                  <h4 style="margin-bottom: 12px;">官方群二维码</h4>
                  <img :src="contactInfo.group_image_url" alt="官方群二维码" style="max-width:100%;max-height:320px;border-radius:12px;object-fit:contain;display:block;margin:0 auto;">
                </div>
                <div class="card" v-if="contactInfo.parent_group_image_url">
                  <h4 style="margin-bottom: 12px;">官方群引导图</h4>
                  <img :src="contactInfo.parent_group_image_url" alt="官方群引导图" style="max-width:100%;max-height:320px;border-radius:12px;object-fit:contain;display:block;margin:0 auto;">
                </div>
              </div>
            </div>

            <div v-else class="empty-tip">
              当前公开展示条件未满足。你可以先去「伙伴联系资料」补公告/群图，再去「客户优惠」打开首页官方群栏目。
            </div>

            <div class="flex gap-10 mt-15">
              <button class="btn btn-default" @click="currentMenu = 'contact'">去完善伙伴联系资料</button>
              <button class="btn btn-primary" @click="currentMenu = 'discount'">去设置首页官方群开关</button>
            </div>
          </div>
        </div>

        <!-- 2. 封神榜 -->
        <div v-if="currentMenu === 'rank'">
          <div class="page-header">
            <h2>封神榜</h2>
            <p>{{ rank.date || '--' }} 更新</p>
          </div>

          <div class="grid-3 mb-20">
            <div class="card">
              <h3>今日销售额</h3>
              <div class="value">¥{{ rank.top_sales?.amount ?? '0.00' }}</div>
              <p>{{ rank.top_sales?.amount ?? '0.00' }}元，一顿火锅钱，今天已经赚到了</p>
              <div class="rank-bar">
                <div class="rank-item orange">
                  <span>{{ rank.top_sales?.rank ?? '--' }}</span>
                  <span>{{ rank.top_sales?.code ?? '--' }}</span>
                </div>
              </div>
            </div>

            <div class="card">
              <h3>今日单王</h3>
              <div class="value">{{ rank.top_orders?.count ?? '--' }}单</div>
              <p>{{ rank.top_orders?.count ?? '--' }}单，超额提速了，剩下的就是放大</p>
              <div class="rank-bar">
                <div class="rank-item gray">
                  <span>{{ rank.top_orders?.rank ?? '--' }}</span>
                  <span>{{ rank.top_orders?.code ?? '--' }}</span>
                </div>
              </div>
            </div>

            <div class="card">
              <h3>今日开单王</h3>
              <div class="value">{{ rank.earliest_order?.time ?? '--' }}</div>
              <p>凌晨{{ rank.earliest_order?.time ?? '--' }}出单了，全世界都在睡，TA在赚钱</p>
              <div class="rank-bar">
                <div class="rank-item blue">
                  <span>{{ rank.earliest_order?.rank ?? '--' }}</span>
                  <span>{{ rank.earliest_order?.code ?? '--' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-3 mb-20">
            <div class="card">
              <h3>今日团队王</h3>
              <div class="value">¥{{ rank.top_team?.amount ?? '0.00' }}</div>
              <p>你的被动收入正在赚钱，当前榜首今日团队成交 ¥{{ rank.top_team?.amount ?? '0.00' }}</p>
              <div class="rank-bar">
                <div class="rank-item green">
                  <span>{{ rank.top_team?.rank ?? '--' }}</span>
                  <span>{{ rank.top_team?.code ?? '--' }}</span>
                </div>
              </div>
            </div>

            <div class="card">
              <h3>今日网络王</h3>
              <div class="value">¥{{ rank.top_network?.amount ?? '0.00' }}</div>
              <p>你的网络结构正在赚钱，当前榜首今日网络成交 ¥{{ rank.top_network?.amount ?? '0.00' }}</p>
              <div class="rank-bar">
                <div class="rank-item purple">
                  <span>{{ rank.top_network?.rank ?? '--' }}</span>
                  <span>{{ rank.top_network?.code ?? '--' }}</span>
                </div>
              </div>
            </div>

            <div class="card">
              <h3>历史闪电王</h3>
              <div class="value">{{ rank.fastest_order?.duration_text || `${rank.fastest_order?.minutes ?? '--'}分` }}</div>
              <p>{{ rank.fastest_order?.duration_text || `${rank.fastest_order?.minutes ?? '--'}分` }}，发出去就开单，钱已经赚好了</p>
              <div class="rank-bar">
                <div class="rank-item red">
                  <span>{{ rank.fastest_order?.rank ?? '--' }}</span>
                  <span>{{ rank.fastest_order?.code ?? '--' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-20">
            <h3>团队排行榜</h3>
            <p>团队 = 你亲手拉进来的人，只算你直接拉的今天卖了多少，就像你带了一个小班，看谁的班级成绩好。</p>
            <div class="rank-tip">起步组：0-2人 | 小队组：3-10人 | 中队组：11-30人 | 军团组：31+人</div>
            <p>你目前在「{{ rank.team_rank?.group || '--' }}」，系统里和你团队规模差不多的人一共有 {{ rank.team_rank?.group_total ?? '--' }} 个，下面的排名只跟这 {{ rank.team_rank?.group_total ?? '--' }} 个人比，不会比你大很多很多的团队放在一起，你一点都不差，重要的是继续往前走。</p>

            <div class="podium">
              <div v-for="item in teamRankTop3Display" :key="`team-${item.rank}`" class="podium-item" :class="{ first: item.rank === 1 }">
                <div class="rank">{{ item.rank }}</div>
                <div class="name">{{ item.code }}</div>
                <div class="amount">¥{{ item.amount }}</div>
              </div>
            </div>

            <div class="my-rank">
              <h4>你的战绩</h4>
              <div class="rank-row">
                <span>你排在</span>
                <span>第{{ rank.team_rank?.my_rank ?? '--' }}名 / {{ rank.team_rank?.group_total ?? '--' }}人</span>
              </div>
              <div class="rank-row">
                <span>你的团队今天卖了</span>
                <span>¥{{ rank.team_rank?.my_sales ?? '0.00' }}</span>
              </div>
              <div class="rank-row">
                <span>再多卖多少能超过前面</span>
                <span>{{ rank.team_rank?.gap_to_next ?? '--' }}</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>网络排行榜</h3>
            <p>网络 = 你的人 + 他们的人 + 一层层往下所有人，就像你种了一棵树，看谁的树长得最大、结果最多。</p>
            <div class="rank-tip">萌芽组：0-10人 | 成长组：11-50人 | 茂盛组：51-150人 | 王者组：151+人</div>
            <p>你目前在「{{ rank.network_rank?.group || '--' }}」，系统里和你网络规模差不多的人一共有 {{ rank.network_rank?.group_total ?? '--' }} 个人，下面的排名只跟这 {{ rank.network_rank?.group_total ?? '--' }} 个人比，不会比你大很多很多的网络放在一起，大家起点差不多，看谁的网络产出更高。</p>

            <div class="podium">
              <div v-for="item in networkRankTop3Display" :key="`network-${item.rank}`" class="podium-item" :class="{ first: item.rank === 1 }">
                <div class="rank">{{ item.rank }}</div>
                <div class="name">{{ item.code }}</div>
                <div class="amount">¥{{ item.amount }}</div>
              </div>
            </div>

            <div class="my-rank">
              <h4>你的战绩</h4>
              <div class="rank-row">
                <span>你排在</span>
                <span>第{{ rank.network_rank?.my_rank ?? '--' }}名 / {{ rank.network_rank?.group_total ?? '--' }}人</span>
              </div>
              <div class="rank-row">
                <span>你的网络今天卖了</span>
                <span>¥{{ rank.network_rank?.my_sales ?? '0.00' }}</span>
              </div>
              <div class="rank-row">
                <span>再多卖多少能超过前面</span>
                <span>{{ rank.network_rank?.gap_to_next ?? '--' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 详细数据 -->
        <div v-if="currentMenu === 'data'">
          <h2 class="page-title">数据看板</h2>

          <div class="grid-6 mb-20">
            <div class="card">
              <div class="label">今日销售总额</div>
              <div class="value">{{ stats.today?.total_sales ?? '--' }}</div>
              <div class="sub">今日自己销售总额: {{ stats.today?.self_sales ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">今日净销售额</div>
              <div class="value">{{ stats.today?.net_sales ?? '--' }}</div>
              <div class="sub">今日自己净销售额: {{ stats.today?.self_net_sales ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">今日净应收结算</div>
              <div class="value orange">{{ stats.today?.net_settlement ?? '--' }}</div>
              <div class="sub">原始应结: {{ stats.today?.net_settlement_original ?? '--' }}<br><span class="red">退款扣减: {{ stats.today?.net_settlement_refund ?? '--' }}</span></div>
            </div>
            <div class="card">
              <div class="label">今日网络订单</div>
              <div class="value">{{ stats.today?.network_orders ?? '--' }}</div>
              <div class="sub">今日自己订单: {{ stats.today?.self_orders ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">今日新增渠道</div>
              <div class="value">{{ stats.today?.new_channels ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">今日退款金额</div>
              <div class="value red">{{ stats.today?.refund_amount ?? '--' }}</div>
              <div class="sub">今日自己退款: {{ stats.today?.self_refund ?? '--' }}</div>
            </div>
          </div>

          <div class="grid-6 mb-20">
            <div class="card">
              <div class="label">累计销售总额</div>
              <div class="value">{{ stats.total?.total_sales ?? '--' }}</div>
              <div class="sub">累计自己销售总额: {{ stats.total?.self_sales ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">累计净销售额</div>
              <div class="value">{{ stats.total?.net_sales ?? '--' }}</div>
              <div class="sub">累计自己净销售额: {{ stats.total?.self_net_sales ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">累计净应收结算</div>
              <div class="value orange">{{ stats.total?.net_settlement ?? '--' }}</div>
              <div class="sub">原始应结: {{ stats.total?.net_settlement_original ?? '--' }}<br><span class="red">退款扣减: {{ stats.total?.net_settlement_refund ?? '--' }}</span></div>
            </div>
            <div class="card">
              <div class="label">累计网络订单</div>
              <div class="value">{{ stats.total?.network_orders ?? '--' }}</div>
              <div class="sub">累计自己订单: {{ stats.total?.self_orders ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">累计渠道</div>
              <div class="value">{{ stats.total?.channels ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">累计退款金额</div>
              <div class="value red">{{ stats.total?.refund_amount ?? '--' }}</div>
              <div class="sub">累计自己退款: {{ stats.total?.self_refund ?? '--' }}</div>
            </div>
          </div>

          <div class="card mb-20">
            <div class="card-header">
              <h3>收入趋势</h3>
              <div class="tabs">
                <button class="tab" :class="{ active: statsPeriod === '7d' }" @click="changeStatsPeriod('7d')">7天</button>
                <button class="tab" :class="{ active: statsPeriod === '30d' }" @click="changeStatsPeriod('30d')">30天</button>
                <button class="tab" :class="{ active: statsPeriod === '180d' }" @click="changeStatsPeriod('180d')">半年</button>
              </div>
            </div>
            <div class="chart-placeholder">
              <div v-if="statsTrend.length" class="chart-surface">
                <div class="chart-grid">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="chart-polyline">
                  <div
                    v-for="(segment, index) in trendSegments"
                    :key="`segment-${index}`"
                    class="chart-segment"
                    :style="segment"
                  ></div>
                </div>
                <div class="chart-points">
                  <div
                    class="point"
                    v-for="(item, index) in statsTrend"
                    :key="`${item.date}-${index}`"
                    :style="getTrendPointStyle(index, statsTrend.length, item.amount)"
                    :title="`${item.date}：${formatMoney(item.amount)}`"
                  >
                    <span class="point-dot"></span>
                    <span class="point-value">{{ formatMoney(item.amount) }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="chart-empty">暂无趋势数据</div>
              <div class="chart-x" :class="{ 'chart-x--empty': !statsTrend.length }">
                <span v-for="(item, index) in statsTrend" :key="`${item.date}-label-${index}`">{{ item.date }}</span>
              </div>
            </div>
          </div>

          <div class="grid-4">
            <div class="card">
              <div class="label">分佣比例</div>
              <div class="value">{{ formatPercent(stats.commission_rate) }}</div>
            </div>
            <div class="card">
              <div class="label">当前折扣比例</div>
              <div class="value">{{ formatPercent(normalizedDiscountRate) }}</div>
            </div>
            <div class="card">
              <div class="label">已打款结算</div>
              <div class="value">{{ stats.paid_settlement ?? '--' }}</div>
            </div>
            <div class="card">
              <div class="label">未打款结算</div>
              <div class="value">{{ stats.pending_settlement ?? '--' }}</div>
            </div>
          </div>
        </div>

        <!-- 4. 伙伴等级返佣 -->
        <div v-if="currentMenu === 'level'">
          <h2 class="page-title">伙伴等级返佣</h2>
          <p class="page-desc">给你带来的伙伴设置档位、返佣和升级规则，卖得越多，自动升档，越往上越厉害，赚得越多。</p>

          <div class="card success-card mb-20">
            <p>卖 ¥100，到手 ¥{{ formatMoney(currentCommissionRate) }}</p>
            <h3>你现在每卖 ¥100 商品<br>赚 ¥{{ formatMoney(currentCommissionRate) }}</h3>
            <p>你的团队伙伴越多、团队做得越好，你赚得也会更多 💪</p>
          </div>

          <div v-if="!canConfigureLevels" class="alert alert-gray mb-20">
            <p><strong>当前不可设置伙伴等级返佣</strong></p>
            <p>{{ levelBlockReason }}</p>
            <p>如果后台 admin 后续给当前账号设置了拿货折扣，你就可以继续配置伙伴等级；但所有下级档位都必须小于你自己的拿货折扣。</p>
          </div>

          <div class="card mb-20 level-config-card">
            <h3>🛠 升级规则设置</h3>
            <p>给团队伙伴设几个档位，他们卖得越多，自动升到更高档位，自己赚得更多。越往上越厉害、赚得越多。</p>

            <div class="levels-board">
              <div class="level-axis">→<br>越往上佣金越高</div>

              <div class="level-list">
                <div
                  v-for="lv in localLevels"
                  :key="lv.id"
                  class="level-item"
                  :class="[getLevelTheme(lv).className, { active: editingLevelId === lv.id, 'has-actions': hoveredLevelId === lv.id || editingLevelId === lv.id, 'level-item-disabled': !canConfigureLevels }]"
                  :style="getLevelCardStyle(lv)"
                  @mouseenter="hoveredLevelId = lv.id"
                  @mouseleave="hoveredLevelId = null"
                >
                  <div class="level-glow" :style="{ background: getLevelTheme(lv).glow }"></div>
                  <div class="level-rank-chip" :style="getLevelChipStyle(lv)">
                    {{ getLevelTheme(lv).label }}
                  </div>

                  <div v-if="hoveredLevelId === lv.id || editingLevelId === lv.id" class="level-actions" @click.stop>
                    <button class="action-chip action-chip-active" @click="openLevelEditor(lv.id)">编辑此档</button>
                  </div>

                  <div class="level-main" @click="openLevelEditor(lv.id)">
                      <div class="level-icon" :style="getLevelIconStyle(lv)">{{ lv.icon }}</div>
                      <div class="level-info">
                        <div class="level-name-row">
                          <span class="level-name">{{ levelDisplayName(lv) }}</span>
                          <span class="level-profit">赚 ¥{{ formatMoney(lv.rate) }} / ¥100</span>
                          <span v-if="lv.member_count > 0" class="badge badge-blue">{{ lv.member_count }} 人</span>
                          <span v-if="lv.is_entry" class="badge badge-green">入门档</span>
                          <span v-else-if="!isLevelConfigured(lv)" class="badge badge-blue-light">未配置</span>
                          <span v-else-if="lv.member_count === 0" class="badge badge-blue-light">暂无伙伴在此档</span>
                        </div>

                        <div class="level-desc">
                          <template v-if="!isLevelConfigured(lv) && !lv.is_entry">
                            这一档还未配置。点右上角「编辑此档」后，可填写档位名称、返佣金额和升级条件。
                          </template>
                          <template v-else-if="lv.is_entry && !isLevelConfigured(lv)">
                            这是新人默认进入的入门档。请先填写档位名称和返佣金额。
                          </template>
                          <template v-else-if="lv.is_entry">
                            新人起点：所有新加入的伙伴默认从这里开始
                          </template>
                          <template v-else-if="normalizeRule(lv).enabled">
                            升上来的条件：连续{{ normalizeRule(lv).consecutiveDays }}天，
                            <template v-if="normalizeRule(lv).metric === 'orders'">
                              每{{ normalizeRule(lv).period === 'daily' ? '天' : '周' }}卖 {{ Number(normalizeRule(lv).targetValue || 0) }} 单
                            </template>
                            <template v-else>
                              每{{ normalizeRule(lv).period === 'daily' ? '天' : '周' }}卖 ¥{{ formatMoney(normalizeRule(lv).targetValue) }}
                            </template>
                          </template>
                          <template v-else>
                            暂无升上来的条件，点下方「添加升级规则」设置
                          </template>
                        </div>

                        <div class="level-meta-row">
                          <span class="meta-pill">每 ¥100 返佣 ¥{{ formatMoney(lv.rate) }}</span>
                          <span class="meta-pill meta-pill-soft">当前 {{ lv.member_count || 0 }} 位伙伴</span>
                          <span v-if="!lv.is_entry && normalizeRule(lv).enabled" class="meta-pill meta-pill-soft">
                            {{ normalizeRule(lv).period === 'daily' ? '按日升级' : '按周升级' }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <p class="level-tip">固定显示 3 档：最高档 / 中间档 / 入门档。不能删除、不能调位置，只能修改每一档的配置信息。</p>
            <div class="team-total-line">你的团队总共 {{ levelPartnerCount }} 人 · 当前已配置 {{ configuredLevelCount }} / 3 档</div>

            <div v-if="currentEditLevel" class="editor-panel">
              <h4>设置这一档</h4>

              <div class="editor-section">
                <label>1. 给这个档位起个名字</label>
                <input v-model="editorForm.name" :disabled="!canConfigureLevels" type="text" class="editor-input" :placeholder="currentEditLevel?.is_entry ? '比如 入门档 / 新手档' : '比如 铜牌 / 银牌 / 金牌'">
              </div>

              <div class="editor-section">
                <label>2. 在这个档位，伙伴每卖 ¥100 能赚多少钱？</label>
                <div class="money-input-wrap">
                  <span class="prefix">¥</span>
                  <input v-model.number="editorForm.rate" :disabled="!canConfigureLevels" type="number" min="0" step="0.01" class="editor-input money-input">
                  <span class="suffix-right">/ ¥100</span>
                </div>
              </div>

              <div v-if="currentEditLevel?.is_entry" class="entry-check">
                <label>
                  <input :checked="true" type="checkbox" disabled>
                  设为入门档（新人默认从这里开始）
                </label>
              </div>

              <div v-else class="entry-check">
                <label>
                  <input :checked="false" type="checkbox" disabled>
                  当前编辑的是{{ currentEditLevel?.slot === 'top' ? '最高档' : '中间档' }}，不是入门档
                </label>
              </div>

              <div v-if="editorForm.isEntry" class="entry-tip-box">
                这是起点档位，新人默认从这里开始，没有升级条件。
              </div>

              <div v-else class="rule-panel">
                <h5>升到这一档的条件</h5>

                <div class="editor-section">
                  <label>按什么考核？</label>
                  <div class="option-row">
                    <button type="button" class="option-chip" :disabled="!canConfigureLevels" :class="{ active: editorForm.rule.metric === 'orders' }" @click="editorForm.rule.metric = 'orders'">按订单数</button>
                    <button type="button" class="option-chip" :disabled="!canConfigureLevels" :class="{ active: editorForm.rule.metric === 'sales' }" @click="editorForm.rule.metric = 'sales'">按销售额（¥）</button>
                  </div>
                </div>

                <div class="editor-section">
                  <label>考核周期</label>
                  <div class="option-row">
                    <button type="button" class="option-chip" :disabled="!canConfigureLevels" :class="{ active: editorForm.rule.period === 'daily' }" @click="editorForm.rule.period = 'daily'">每天</button>
                    <button type="button" class="option-chip" :disabled="!canConfigureLevels" :class="{ active: editorForm.rule.period === 'weekly' }" @click="editorForm.rule.period = 'weekly'">每周</button>
                  </div>
                </div>

                <div class="editor-section">
                  <label>{{ editorForm.rule.metric === 'orders' ? (editorForm.rule.period === 'daily' ? '每天要卖多少单？' : '每周要卖多少单？') : (editorForm.rule.period === 'daily' ? '每天要卖多少钱？' : '每周要卖多少钱？') }}</label>
                  <div class="money-input-wrap">
                    <span v-if="editorForm.rule.metric === 'sales'" class="prefix">¥</span>
                    <input v-model.number="editorForm.rule.targetValue" :disabled="!canConfigureLevels" type="number" min="0" step="0.01" class="editor-input money-input">
                    <span class="suffix-right">{{ editorForm.rule.metric === 'orders' ? (editorForm.rule.period === 'daily' ? '单 / 天' : '单 / 周') : (editorForm.rule.period === 'daily' ? '元 / 天' : '元 / 周') }}</span>
                  </div>
                </div>

                <div class="editor-section">
                  <label>连续坚持几天？</label>
                  <div class="money-input-wrap">
                    <input v-model.number="editorForm.rule.consecutiveDays" :disabled="!canConfigureLevels" type="number" min="1" step="1" class="editor-input money-input">
                    <span class="suffix-right">天</span>
                  </div>
                </div>
              </div>

              <div class="editor-footer">
                <div class="text-sm text-gray">
                  <template v-if="currentEditLevel?.is_entry">
                    入门档固定保留，不能删除，且新人默认从这里开始。
                  </template>
                  <template v-else>
                    如需停用这一档，可把“档位名称清空”且“返佣金额设为 0”后保存。
                  </template>
                </div>
                <div class="editor-footer-right">
                  <button type="button" class="btn btn-default" @click="cancelEditLevel">取消</button>
                  <button type="button" class="btn btn-primary" :disabled="savingLevels || !canConfigureLevels" @click="saveCurrentLevel">{{ savingLevels ? '保存中...' : '保存这一档' }}</button>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>👥 我的团队（按等级浏览）</h3>
            <div class="team-summary">
              <p>你一共带了</p>
              <h3>{{ levelPartnerCount }} 位伙伴</h3>
            </div>

            <div class="level-tabs">
              <button class="tab" :class="{ active: selectedLevelTab === 'all' }" @click="selectedLevelTab = 'all'">全部 · {{ levelPartnerCount }}</button>
              <button
                v-for="group in (levels.team_by_level || [])"
                :key="group.level_id"
                class="tab"
                :class="{ active: selectedLevelTab === group.level_id }"
                @click="selectedLevelTab = group.level_id"
              >
                {{ group.level_name }} · {{ group.members.length }}人 每 ¥100 → 你赚 ¥{{ formatMoney(group.rate) }}
              </button>
            </div>

            <div v-for="member in filteredMembers" :key="member.id" class="team-item">
              <div class="avatar">{{ member.avatar }}</div>
              <div class="info">
                <div class="name">#{{ member.id }}</div>
                <div class="desc">{{ member.level_name }} · 每 ¥100 → 你赚 ¥{{ formatMoney(member.rate) }}</div>
              </div>
            </div>
            <div v-if="!filteredMembers.length" class="empty-tip">当前筛选下暂无伙伴</div>
          </div>
        </div>

        <!-- 5. 伙伴联系资料 -->
        <div v-if="currentMenu === 'contact'">
          <h2 class="page-title">伙伴联系资料</h2>
          <div class="alert alert-red">
            <h4>伙伴联系资料</h4>
            <p>这是最容易被忽略、但非常重要的一页。加入你团队的人能不能找到你，主要就看你这里有没有认真填写联系方式和说明。</p>
          </div>

          <div class="card">
            <h3>招募页展示信息</h3>
            <p>下面的联系方式和公告会展示给通过你推广链接加入的伙伴。请务必填写真实可联系到你的方式，确保加入你团队的人能联系到你。</p>

            <div class="form-item">
              <label>联系方式</label>
              <input type="text" v-model="contactInfo.phone" placeholder="请输入联系方式">
              <p class="form-tip">这里建议直接写微信、手机号、QQ、Telegram这类能马上联系到你的方式。</p>
            </div>

            <div class="form-item">
              <label>公告内容</label>
              <textarea v-model="contactInfo.notice" placeholder="例如：欢迎加入我的推广团队，有问题随时联系我！" rows="4"></textarea>
              <p class="form-tip">这里可以写你对伙伴的说明，比如合作规则、联系时间、加入后先做什么。</p>
            </div>

            <div class="form-item">
              <label>官方群二维码 / 引导图</label>
              <input ref="groupImageInput" type="file" accept="image/*" style="display:none" @change="handleGroupImageUpload">
              <button class="btn btn-default btn-sm" style="float: right;" :disabled="uploadingGroupImage" @click="groupImageInput?.click()">
                {{ uploadingGroupImage ? '上传中...' : '上传图片' }}
              </button>
              <p class="form-tip">这里上传的是给你下级看的群二维码或引导图。你不上传时，下级默认看到上一级 / 管理员设置的内容。</p>
              <div class="upload-placeholder">
                <img v-if="contactInfo.group_image_url" :src="contactInfo.group_image_url" style="max-width:200px;max-height:200px;border-radius:8px;" alt="群二维码">
                <p v-else>你还没有上传官方群图片，当前将继续使用上一级 / 管理员默认内容。</p>
              </div>
            </div>

            <div class="form-item">
              <label>伙伴注册时看到的效果：</label>
              <div class="preview-box">
                <span>联系方式</span>
                <span style="float: right;">{{ contactInfo.phone }}</span>
              </div>
              <p class="preview-label">—— 注册弹窗预览 ——</p>
            </div>

            <button class="btn btn-primary btn-block" :disabled="savingContact" @click="saveContactInfo">
              {{ savingContact ? '保存中...' : '保存' }}
            </button>
          </div>
        </div>

        <!-- 6. 伙伴结算 -->
        <div v-if="currentMenu === 'settle'">
          <h2 class="page-title">订单结算</h2>
          <div class="tabs mb-20">
            <button class="tab" :class="{ active: settlementTab === 'partner' }" @click="settlementTab = 'partner'">下级结算</button>
            <button class="tab" :class="{ active: settlementTab === 'mine' }" @click="settlementTab = 'mine'">我的结算</button>
          </div>

          <template v-if="settlementTab === 'partner'">

          <div class="flex justify-between mb-20">
            <p>查看团队伙伴按天结算和累计结算的树状汇总</p>
            <div class="flex gap-10">
              <input type="date" v-model="settleDate">
              <input type="text" v-model="settlementKeyword" placeholder="输入邮箱或推广码筛选直属伙伴">
              <button class="btn btn-primary" @click="loadSettlement">查询</button>
              <button class="btn btn-default" @click="loadSettlement">刷新</button>
              <button class="btn btn-default" @click="exportSettlementExcel">导出 Excel</button>
            </div>
          </div>

          <div class="alert alert-gray mb-20">
            <p>这里是你当天要结给团队伙伴的钱。点"去结算"后，页面会再提醒你确认一次。 <strong>当前汇总结算率 {{ settlement.summary.net_settlement_rate || '0.00' }}%</strong></p>
          </div>

          <div class="grid-10 mb-20">
            <div class="card">
              <div class="label">直属结算节点</div>
              <div class="value">{{ settlement.summary.direct_nodes }}</div>
            </div>
            <div class="card">
              <div class="label">订单数</div>
              <div class="value">{{ settlement.summary.orders }}</div>
            </div>
            <div class="card">
              <div class="label">总销售额</div>
              <div class="value">{{ settlement.summary.total_sales }}</div>
            </div>
            <div class="card">
              <div class="label">退款金额</div>
              <div class="value red">{{ settlement.summary.refund_amount }}</div>
            </div>
            <div class="card">
              <div class="label">净销售额</div>
              <div class="value">{{ settlement.summary.net_sales }}</div>
            </div>
            <div class="card">
              <div class="label">原始应结金额</div>
              <div class="value">{{ settlement.summary.original_settlement }}</div>
            </div>
            <div class="card">
              <div class="label">退款扣减</div>
              <div class="value red">{{ settlement.summary.refund_deduction }}</div>
            </div>
            <div class="card">
              <div class="label">净应结金额</div>
              <div class="value green">{{ settlement.summary.net_settlement }}</div>
              <div class="sub">({{ settlement.summary.net_settlement_rate }}%)</div>
            </div>
            <div class="card">
              <div class="label">已打款金额</div>
              <div class="value green">{{ settlement.summary.paid_amount }}</div>
            </div>
            <div class="card">
              <div class="label">未打款金额</div>
              <div class="value orange">{{ settlement.summary.unpaid_amount }}</div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <button class="tab active">合伙人</button>
              <span style="float: right; color: #666; font-size: 13px;">当前浏览：直属结算节点</span>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>合伙人</th>
                  <th>自己销售</th>
                  <th>团队销售</th>
                  <th>销售总额</th>
                  <th>退款金额</th>
                  <th>净销售额</th>
                  <th>订单数</th>
                  <th>净应结金额</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in filteredSettlementItems" :key="item.id">
                  <tr>
                    <td>
                      <div class="flex items-center gap-10">
                        <div class="avatar">{{ item.avatar }}</div>
                        <div>
                          <div>{{ item.email }}</div>
                          <div class="text-sm text-gray">#{{ item.id }} · {{ item.code }}</div>
                        </div>
                      </div>
                      <div class="text-sm text-gray mt-5">{{ Number(item.self_orders) + Number(item.team_orders) > 0 ? '有结算数据' : '暂无订单' }}</div>
                      <div class="text-sm text-gray">{{ item.direct_partners }} 个直属伙伴，{{ item.total_partners }} 个全部伙伴</div>
                    </td>
                    <td>{{ item.self_sales }}</td>
                    <td>{{ item.team_sales }}</td>
                    <td>{{ item.total_sales }}</td>
                    <td class="red">{{ item.refund_amount }}</td>
                    <td>{{ item.net_sales }}</td>
                    <td>自己 {{ item.self_orders }} / 团队 {{ item.team_orders }}</td>
                    <td>
                      <div class="green">{{ item.net_settlement }}</div>
                      <div class="text-sm text-gray">原始应结 {{ item.original_settlement }}</div>
                      <div class="text-sm text-red">退款扣减 {{ item.refund_deduction }}</div>
                      <div class="text-sm text-gray">已结 {{ item.settled_orders }} 单，待结 {{ item.pending_orders }} 单</div>
                    </td>
                    <td>
                      <button class="btn btn-default btn-sm mb-5" @click="toggleSettlementDetail(item.id)">{{ expandedSettlementId === item.id ? '收起明细' : '查看明细' }}</button>
                      <button class="btn btn-primary btn-sm" :disabled="settlingPartnerId === item.id" @click="handleSettle(item.id)">{{ settlingPartnerId === item.id ? '结算中...' : '去结算' }}</button>
                    </td>
                  </tr>
                  <tr v-if="expandedSettlementId === item.id" class="settlement-detail-row">
                    <td colspan="9">
                      <div class="settlement-detail-panel">
                        <h4>{{ item.email }} 的订单明细</h4>
                        <div class="detail-toolbar mb-10">
                          <div class="text-sm text-gray">展示该伙伴在所选日期下的自己成交 + 团队成交订单</div>
                          <button class="btn btn-default btn-sm" :disabled="settlementDetailLoadingId === item.id" @click="loadSettlementDetail(item.id, true)">{{ settlementDetailLoadingId === item.id ? '加载中...' : '刷新明细' }}</button>
                        </div>
                        <table class="detail-table">
                          <thead>
                            <tr>
                              <th>订单类型</th>
                              <th>最终成交渠道</th>
                              <th>结算状态</th>
                              <th>订单时间</th>
                              <th>订单号</th>
                              <th>商品名称</th>
                              <th>原价/实付</th>
                              <th>伙伴佣金/我的佣金/上级成本</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="detail in settlementDetailMap[item.id]?.items || []" :key="`settlement-${item.id}-${detail.order_id}`">
                              <td><span class="tag" :class="detail.is_self ? 'green' : 'blue'">{{ detail.is_self ? '自己成交' : '团队成交' }}</span></td>
                              <td>{{ detail.final_channel || '-' }}</td>
                              <td><span class="tag" :class="detail.is_settled ? 'green' : 'orange'">{{ detail.is_settled ? '已结算' : '待结算' }}</span></td>
                              <td>{{ detail.created_at }}</td>
                              <td>{{ detail.order_no }}</td>
                              <td>{{ detail.product_name }}</td>
                              <td>
                                <div>¥{{ detail.original_amount }} → ¥{{ detail.final_amount }}</div>
                                <div class="text-sm text-orange">让利 ¥{{ detail.channel_discount }}</div>
                              </td>
                              <td>
                                <div>伙伴：¥{{ detail.partner_commission }}</div>
                                <div class="green">我拿：¥{{ detail.my_commission }}</div>
                                <div class="text-sm text-orange">上级成本：¥{{ detail.referrer_cost }}</div>
                              </td>
                            </tr>
                            <tr v-if="!(settlementDetailMap[item.id]?.items || []).length && settlementDetailLoadingId !== item.id">
                              <td colspan="8" class="text-center text-gray">暂无明细</td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="text-sm text-gray mt-10" v-if="settlementDetailMap[item.id]">
                          共 {{ settlementDetailMap[item.id]?.total || 0 }} 条，当前第 {{ settlementDetailMap[item.id]?.page || 1 }} 页
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
                <tr v-if="!filteredSettlementItems.length">
                  <td colspan="9" class="text-center text-gray">暂无结算数据</td>
                </tr>
              </tbody>
            </table>

            <div class="pagination">
              <span>共 {{ settlement.total || filteredSettlementItems.length }} 条，第 {{ settlement.page || 1 }}/{{ Math.max(1, Math.ceil((settlement.total || filteredSettlementItems.length) / (settlement.page_size || 20))) }} 页</span>
              <div class="flex gap-10">
                <button class="btn btn-default btn-sm" :disabled="(settlement.page || 1) <= 1" @click="changeSettlementPage((settlement.page || 1) - 1)">上一页</button>
                <button class="btn btn-default btn-sm" :disabled="(settlement.page || 1) >= Math.max(1, Math.ceil((settlement.total || filteredSettlementItems.length) / (settlement.page_size || 20)))" @click="changeSettlementPage((settlement.page || 1) + 1)">下一页</button>
              </div>
            </div>
          </div>
          </template>

          <template v-else>
            <div class="alert alert-blue mb-20">
              <h4>我的结算</h4>
              <p>这里展示你的余额总览、余额流水、佣金转余额、提现申请、提现记录与提现规则说明，形成推广中心内的完整资金闭环。</p>
            </div>

            <div class="grid-4 mb-20">
              <div class="card">
                <div class="label">可用余额</div>
                <div class="value green">{{ myBalance.balance || '0.00' }}</div>
              </div>
              <div class="card">
                <div class="label">冻结余额</div>
                <div class="value orange">{{ myBalance.frozen_balance || '0.00' }}</div>
              </div>
              <div class="card">
                <div class="label">待结算余额</div>
                <div class="value">{{ myBalance.pending_balance || '0.00' }}</div>
              </div>
              <div class="card">
                <div class="label">累计收入 / 累计提现</div>
                <div class="value">{{ myBalance.total_income || '0.00' }}</div>
                <div class="sub">已提：{{ myBalance.total_withdraw || '0.00' }}</div>
              </div>
            </div>

            <div class="grid-3 mb-20">
              <div class="card">
                <h3>提现规则</h3>
                <div class="stat-item">
                  <div class="label">当前状态</div>
                  <div class="value" :class="withdrawSettings.enabled ? 'green' : 'red'">
                    {{ withdrawSettings.enabled ? '可申请提现' : '暂未开放提现' }}
                  </div>
                </div>
                <div class="stat-item">
                  <div class="label">最低提现金额</div>
                  <div class="value">¥{{ withdrawSettings.min_amount || '0.00' }}</div>
                </div>
                <div class="stat-item">
                  <div class="label">手续费率</div>
                  <div class="value">{{ formatPercent(withdrawSettings.fee_rate || 0) }}</div>
                </div>
                <div class="sub text-gray">提现间隔：{{ withdrawSettings.interval_days || 0 }} 天；{{ withdrawSettings.require_realname ? '需填写实名' : '实名非必填' }}</div>
              </div>

              <div class="card">
                <h3>当前提现测算</h3>
                <div class="stat-item">
                  <div class="label">本次申请金额</div>
                  <div class="value">¥{{ formatMoney(withdrawForm.amount || 0) }}</div>
                </div>
                <div class="stat-item">
                  <div class="label">预计手续费</div>
                  <div class="value orange">¥{{ withdrawFeePreview }}</div>
                </div>
                <div class="stat-item highlight">
                  <div class="label">预计到账</div>
                  <div class="value green">¥{{ withdrawActualPreview }}</div>
                </div>
                <div class="sub text-gray">说明：最终到账金额以后端校验与审核结果为准。</div>
              </div>

              <div class="card">
                <h3>资金操作快捷入口</h3>
                <div class="link-item" @click="scrollToMineSection('withdraw-form')">
                  <span>去提交提现申请</span>
                  <span>→</span>
                </div>
                <div class="link-item" @click="scrollToMineSection('withdraw-records')">
                  <span>看提现记录</span>
                  <span>→</span>
                </div>
                <div class="link-item" @click="scrollToMineSection('transfer-box')">
                  <span>去做佣金转余额</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            <div class="grid-2 mb-20">
              <div class="card" data-mine-section="transfer-box">
                <h3>佣金转余额</h3>
                <div class="card-header" style="padding:0 0 10px;border:none;display:flex;justify-content:space-between;align-items:center;gap:12px;">
                  <div class="text-sm text-gray">选择“可转余额”的佣金后批量转入余额。</div>
                  <button class="btn btn-default btn-sm" :disabled="transferringBalance" @click="loadBalanceData">刷新佣金</button>
                </div>
                <div class="detail-toolbar mb-10">
                  <div class="text-sm text-gray">已选 {{ selectedTransferCommissionIDs.length }} 笔，合计 <span class="green">¥{{ selectedTransferCommissionAmount }}</span></div>
                  <div class="flex gap-10">
                    <button class="btn btn-default btn-sm" :disabled="!transferableCommissions.items.length || transferringBalance" @click="toggleSelectAllTransferable(true)">全选</button>
                    <button class="btn btn-default btn-sm" :disabled="!transferableCommissions.items.length || transferringBalance" @click="toggleSelectAllTransferable(false)">反选</button>
                  </div>
                </div>
                <table v-if="transferableCommissions.items.length" class="detail-table mb-15">
                  <thead>
                    <tr>
                      <th style="width:56px;">选择</th>
                      <th>订单号</th>
                      <th>商品</th>
                      <th>佣金</th>
                      <th>可转时间</th>
                      <th>状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in transferableCommissions.items" :key="`transferable-${item.id}`">
                      <td>
                        <input
                          type="checkbox"
                          :checked="selectedTransferCommissionIDs.includes(item.id)"
                          :disabled="!item.can_transfer || transferringBalance"
                          @change="toggleTransferCommission(item.id)"
                        >
                      </td>
                      <td>
                        <div>{{ item.order_no || '-' }}</div>
                        <div class="text-sm text-gray">佣金ID：{{ item.id }}</div>
                      </td>
                      <td>{{ item.product_name || '-' }}</td>
                      <td class="green">¥{{ item.commission_amount }}</td>
                      <td>{{ item.available_at || item.created_at || '-' }}</td>
                      <td><span class="tag" :class="item.can_transfer ? 'green' : 'orange'">{{ item.can_transfer ? '可转余额' : (item.status || '不可转') }}</span></td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="text-sm text-gray mb-15">暂无可转余额佣金</div>
                <div class="form-item">
                  <label>转入金额</label>
                  <input :value="selectedTransferCommissionAmount" type="text" disabled>
                </div>
                <div class="form-item">
                  <label>邮箱验证码（如后端校验开启）</label>
                  <input v-model="transferForm.verify_code" type="text" placeholder="输入验证码">
                </div>
                <div class="text-sm text-gray mb-10">说明：已转余额的佣金后续退款不自动回滚，按人工处理；未转余额佣金仍由后端退款逻辑处理。</div>
                <button class="btn btn-primary btn-block" :disabled="transferringBalance || !selectedTransferCommissionIDs.length" @click="handleTransferToBalance">{{ transferringBalance ? '转入中...' : `佣金转余额（${selectedTransferCommissionIDs.length}笔）` }}</button>
              </div>

              <div class="card">
                <div class="card-header">
                  <h3>余额流水</h3>
                  <button class="btn btn-default btn-sm" @click="loadBalanceData">刷新</button>
                </div>
                <table class="detail-table">
                  <thead>
                    <tr>
                      <th>时间</th>
                      <th>类型</th>
                      <th>变动</th>
                      <th>变动前 / 后</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="log in balanceLogs.items" :key="`balance-log-${log.id}`">
                      <td>{{ log.created_at }}</td>
                      <td>{{ log.type || '-' }}</td>
                      <td :class="Number(log.amount) >= 0 ? 'green' : 'orange'">{{ Number(log.amount) >= 0 ? '+' : '' }}{{ log.amount }}</td>
                      <td>{{ log.balance_before }} → {{ log.balance_after }}</td>
                      <td>{{ log.remark || log.related_type || '-' }}</td>
                    </tr>
                    <tr v-if="!balanceLogs.items.length">
                      <td colspan="5" class="text-center text-gray">暂无余额流水</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="grid-2 mb-20">
              <div class="card" data-mine-section="withdraw-form">
                <div class="card-header">
                  <h3>提现申请</h3>
                  <button class="btn btn-default btn-sm" :disabled="submittingWithdraw" @click="loadWithdrawData">刷新规则</button>
                </div>
                <div class="form-item">
                  <label>申请金额</label>
                  <input v-model.number="withdrawForm.amount" type="number" min="0" step="0.01" placeholder="请输入要提现的金额">
                  <p class="form-tip">当前可用余额：¥{{ myBalance.balance || '0.00' }}；最低提现金额：¥{{ withdrawSettings.min_amount || '0.00' }}</p>
                </div>
                <div class="form-item">
                  <label>支付宝账号</label>
                  <input v-model.trim="withdrawForm.alipay_account" type="text" placeholder="请输入支付宝账号">
                </div>
                <div class="form-item">
                  <label>收款实名</label>
                  <input v-model.trim="withdrawForm.real_name" type="text" :placeholder="withdrawSettings.require_realname ? '请输入真实姓名' : '如规则要求可填写'">
                </div>
                <div class="form-item">
                  <label>邮箱验证码</label>
                  <input v-model.trim="withdrawForm.verify_code" type="text" placeholder="请输入邮箱验证码">
                </div>
                <div class="preview-box mb-15">
                  <div class="grid-3">
                    <div class="text-center">
                      <div class="text-sm text-gray">申请金额</div>
                      <div class="text-lg">¥{{ formatMoney(withdrawForm.amount || 0) }}</div>
                    </div>
                    <div class="text-center">
                      <div class="text-sm text-gray">手续费</div>
                      <div class="text-lg orange">¥{{ withdrawFeePreview }}</div>
                    </div>
                    <div class="text-center">
                      <div class="text-sm text-gray">预计到账</div>
                      <div class="text-lg green">¥{{ withdrawActualPreview }}</div>
                    </div>
                  </div>
                </div>
                <div class="text-sm text-gray mb-10">
                  提现申请提交后会进入审核；若被驳回，资金通常回退到余额，具体以后台审核结果与规则配置为准。
                </div>
                <button class="btn btn-primary btn-block" :disabled="submittingWithdraw || !withdrawSettings.enabled" @click="handleApplyWithdraw">
                  {{ submittingWithdraw ? '提交中...' : (withdrawSettings.enabled ? '提交提现申请' : '当前未开放提现') }}
                </button>
              </div>

              <div class="card" data-mine-section="withdraw-records">
                <div class="card-header">
                  <h3>提现记录</h3>
                  <button class="btn btn-default btn-sm" :disabled="withdrawingLoading" @click="loadWithdrawData">刷新记录</button>
                </div>
                <table class="detail-table">
                  <thead>
                    <tr>
                      <th>申请时间</th>
                      <th>金额 / 手续费 / 到账</th>
                      <th>账号</th>
                      <th>状态</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in withdrawRequests.items" :key="`withdraw-${item.id}`">
                      <td>
                        <div>{{ item.created_at || '-' }}</div>
                        <div class="text-sm text-gray">处理：{{ item.processed_at || '待处理' }}</div>
                      </td>
                      <td>
                        <div>申请：¥{{ item.amount }}</div>
                        <div class="text-sm text-orange">手续费：¥{{ item.fee }}</div>
                        <div class="text-sm green">到账：¥{{ item.actual_amount }}</div>
                      </td>
                      <td>
                        <div>{{ item.account || '-' }}</div>
                        <div class="text-sm text-gray">实名：{{ item.alipay_name || '-' }}</div>
                      </td>
                      <td>
                        <span class="tag" :class="withdrawStatusClass(item.status)">{{ formatWithdrawStatus(item.status) }}</span>
                      </td>
                      <td>{{ item.reject_reason || '-' }}</td>
                    </tr>
                    <tr v-if="!withdrawRequests.items.length">
                      <td colspan="5" class="text-center text-gray">暂无提现记录</td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-sm text-gray mt-10">共 {{ withdrawRequests.total || 0 }} 条，第 {{ withdrawRequests.page || 1 }} 页</div>
              </div>
            </div>
          </template>
        </div>

        <!-- 7. 团队结构 -->
        <div v-if="currentMenu === 'team'">
          <h2 class="page-title">团队结构</h2>

          <div class="flex justify-between mb-20">
            <input type="text" v-model="teamKeyword" placeholder="输入邮箱或推广码筛选伙伴">
            <div class="flex gap-10">
              <button class="btn btn-primary" @click="loadTeam">筛选</button>
              <button class="btn btn-default" @click="teamKeyword = ''; loadTeam()">重置</button>
              <button class="btn btn-default" @click="loadTeam">刷新</button>
            </div>
          </div>

          <div class="grid-4 mb-20">
            <div class="card">
              <div class="label">直属合伙人</div>
              <div class="value">{{ team.direct_count }}</div>
            </div>
            <div class="card">
              <div class="label">全部合伙人</div>
              <div class="value">{{ team.total_count }}</div>
            </div>
            <div class="card">
              <div class="label">网络下单用户</div>
              <div class="value">{{ team.network_buyers }}</div>
            </div>
            <div class="card yellow-card">
              <div class="label">🏆 已出师合伙人</div>
              <div class="value orange">{{ team.graduated_count }}</div>
              <div class="sub">原本是你带的下级，已独立接店、自成顶级节点</div>
            </div>
          </div>

          <div class="card mb-20">
            <div class="card-header">
              <button class="tab active">我的推广网络</button>
              <span style="float: right; color: #666; font-size: 13px;">当前浏览：直属伙伴</span>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>合伙人</th>
                  <th>销售额（仅自己）</th>
                  <th>应结算金额（含团队）</th>
                  <th>订单（仅自己）</th>
                  <th>渠道数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredTeamMembers" :key="item.id">
                  <td>
                    <div class="flex items-center gap-10">
                      <div class="avatar">{{ item.avatar }}</div>
                      <div>
                        <div>{{ item.email }}</div>
                        <span class="tag">{{ item.code }}</span>
                        <span v-if="item.is_new" class="tag green">新</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.self_sales }}</td>
                  <td>{{ item.team_settlement }}</td>
                  <td>{{ item.self_orders }}</td>
                  <td>{{ item.channel_count }}</td>
                  <td>-</td>
                </tr>
                <tr v-if="!filteredTeamMembers.length">
                  <td colspan="6" class="text-center text-gray">暂无团队成员</td>
                </tr>
              </tbody>
            </table>

            <div class="pagination">
              <span>第 {{ team.page || 1 }} / {{ Math.max(1, Math.ceil((team.total || filteredTeamMembers.length) / (team.page_size || 20))) }} 页</span>
              <div class="flex gap-10">
                <button class="btn btn-default btn-sm" :disabled="(team.page || 1) <= 1" @click="changeTeamPage((team.page || 1) - 1)">上一页</button>
                <button class="btn btn-default btn-sm" :disabled="(team.page || 1) >= Math.max(1, Math.ceil((team.total || filteredTeamMembers.length) / (team.page_size || 20)))" @click="changeTeamPage((team.page || 1) + 1)">下一页</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 8. 我的伙伴 -->
        <div v-if="currentMenu === 'partner'">
          <h2 class="page-title">我的伙伴</h2>

          <div class="flex justify-between mb-20">
            <input type="text" v-model="partnerKeyword" placeholder="输入邮箱或推广码筛选伙伴">
            <div class="flex gap-10">
              <button class="btn btn-primary" @click="loadPartners(1)">筛选</button>
              <button class="btn btn-default" @click="partnerKeyword = ''; loadPartners(1)">重置</button>
              <button class="btn btn-default" @click="loadPartners(partnerPage)">刷新</button>
            </div>
          </div>

          <div class="alert alert-gray mb-20">
            <p><strong>当前我的实际比例: {{ formatPercent(currentCommissionRate) }}</strong></p>
            <p>当前新加入的直属伙伴会先按入门档 {{ formatPercent(levels.entry_rate) }} 生效；而我自己当前实际生效比例按上级等级体系取值，现为 {{ formatPercent(currentCommissionRate) }}。</p>
          </div>

          <div class="card">
            <table class="table">
              <thead>
                <tr>
                  <th>渠道</th>
                  <th>该伙伴的佣金比例</th>
                  <th>今日直销 ？</th>
                  <th>累计直销 ？</th>
                  <th>今日网络销量 ？</th>
                  <th>网络总销售 ？</th>
                  <th>网络总订单 ？</th>
                  <th>今日应分结算 ？</th>
                  <th>累计应分结算 ？</th>
                  <th>官方群显示</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in filteredPartners" :key="item.id">
                  <tr>
                    <td>
                      <div class="flex items-center gap-10">
                        <div class="avatar">{{ item.avatar }}</div>
                        <div>
                          <div>{{ item.email }}</div>
                          <div class="text-sm text-gray">{{ item.code }} <span v-if="item.is_new" class="tag">新</span></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-5">
                        <div class="level-icon">{{ item.level_icon }}</div>
                        <div>
                          <div>{{ item.level_name }} · 每 ¥100 赚 ¥{{ formatMoney(item.rate) }}</div>
                          <div class="text-sm text-gray">实际到账以"伙伴结算"为准</div>
                        </div>
                      </div>
                      <div class="flex items-center gap-5 mt-5">
                        <select v-model.number="partnerRateDrafts[item.id]" style="width: 120px; padding: 4px 8px; border: 1px solid #dee2e6; border-radius: 6px; font-size: 12px;">
                          <option v-for="lv in configuredSelectableLevels" :key="lv.id" :value="lv.rate">{{ levelDisplayName(lv) }} ({{ lv.rate }}%)</option>
                        </select>
                        <button class="btn btn-default btn-sm" :disabled="savingPartnerRateId === item.id" @click="savePartnerRate(item.id)">{{ savingPartnerRateId === item.id ? '保存中...' : '保存' }}</button>
                      </div>
                    </td>
                    <td>{{ item.today_direct_sales }}</td>
                    <td>{{ item.total_direct_sales }}</td>
                    <td>{{ item.today_network_sales }}</td>
                    <td>{{ item.total_network_sales }}</td>
                    <td>{{ item.total_network_orders }}</td>
                    <td>{{ item.today_settlement }}</td>
                    <td>{{ item.total_settlement }}</td>
                    <td><span class="tag" :class="item.group_visible ? 'green' : 'red'">{{ item.group_visible ? '显示' : '已屏蔽' }}</span></td>
                    <td>
                      <button class="btn btn-default btn-sm" @click="togglePartnerDetail(item.id)">{{ expandedPartnerId === item.id ? '收起明细' : '查看明细' }}</button>
                    </td>
                  </tr>
                  <tr v-if="expandedPartnerId === item.id" class="partner-detail-row">
                    <td colspan="11">
                      <div class="partner-detail-panel">
                        <div class="detail-toolbar mb-10">
                          <div class="text-sm text-gray">查看该伙伴在选定日期内的个人订单与团队订单</div>
                          <button class="btn btn-default btn-sm" :disabled="partnerDetailLoadingId === item.id" @click="loadPartnerDetail(item.id, true)">{{ partnerDetailLoadingId === item.id ? '加载中...' : '刷新明细' }}</button>
                        </div>
                        <div class="partner-detail-grid">
                          <div class="partner-detail-item">
                            <div class="label">今日直销</div>
                            <div class="value">{{ item.today_direct_sales }}</div>
                          </div>
                          <div class="partner-detail-item">
                            <div class="label">今日网络销量</div>
                            <div class="value">{{ item.today_network_sales }}</div>
                          </div>
                          <div class="partner-detail-item">
                            <div class="label">今日应分结算</div>
                            <div class="value orange">{{ item.today_settlement }}</div>
                          </div>
                          <div class="partner-detail-item">
                            <div class="label">累计应分结算</div>
                            <div class="value">{{ item.total_settlement }}</div>
                          </div>
                        </div>
                        <table class="detail-table mt-10">
                          <thead>
                            <tr>
                              <th>订单类型</th>
                              <th>订单号</th>
                              <th>商品</th>
                              <th>最终渠道</th>
                              <th>原价/实付</th>
                              <th>让利</th>
                              <th>应分结算</th>
                              <th>时间</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="detail in partnerDetailMap[item.id]?.items || []" :key="`partner-${item.id}-${detail.order_id}`">
                              <td><span class="tag" :class="detail.is_self ? 'green' : 'blue'">{{ detail.is_self ? '自己成交' : '团队成交' }}</span></td>
                              <td>{{ detail.order_no }}</td>
                              <td>{{ detail.product_name }}</td>
                              <td>{{ detail.final_channel || '-' }}</td>
                              <td>¥{{ detail.original_amount }} / ¥{{ detail.final_amount }}</td>
                              <td class="text-orange">¥{{ detail.channel_discount }}</td>
                              <td>
                                <div>伙伴：¥{{ detail.partner_commission }}</div>
                                <div class="green">我拿：¥{{ detail.my_commission }}</div>
                              </td>
                              <td>{{ detail.created_at }}</td>
                            </tr>
                            <tr v-if="!(partnerDetailMap[item.id]?.items || []).length && partnerDetailLoadingId !== item.id">
                              <td colspan="8" class="text-center text-gray">暂无订单明细</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </template>
                <tr v-if="!filteredPartners.length">
                  <td colspan="11" class="text-center text-gray">暂无伙伴数据</td>
                </tr>
                <tr class="total-row">
                  <td><strong>合计</strong></td>
                  <td></td>
                  <td class="green">{{ formatMoney(partnerTotals.todayDirectSales) }}</td>
                  <td>{{ formatMoney(partnerTotals.totalDirectSales) }}</td>
                  <td class="blue">{{ formatMoney(partnerTotals.todayNetworkSales) }}</td>
                  <td>{{ formatMoney(partnerTotals.totalNetworkSales) }}</td>
                  <td>{{ partnerTotals.totalNetworkOrders }}</td>
                  <td class="orange">{{ formatMoney(partnerTotals.todaySettlement) }}</td>
                  <td class="orange">{{ formatMoney(partnerTotals.totalSettlement) }}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <div class="pagination">
              <span>第 {{ partnerPage }} / {{ Math.max(1, Math.ceil(partners.length / 20)) }} 页</span>
              <div class="flex gap-10">
                <button class="btn btn-default btn-sm" :disabled="partnerPage <= 1" @click="changePartnerPage(partnerPage - 1)">上一页</button>
                <button class="btn btn-default btn-sm" :disabled="partnerPage >= Math.max(1, Math.ceil(partners.length / 20))" @click="changePartnerPage(partnerPage + 1)">下一页</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 9. 订单记录 -->
        <div v-if="currentMenu === 'order'">
          <h2 class="page-title">订单记录</h2>

          <div class="flex justify-between mb-20">
            <div class="flex gap-20">
              <div class="form-item">
                <label>订单号</label>
                <input type="text" v-model="orderKeyword" placeholder="输入订单号、渠道或商品筛选记录">
              </div>
              <div class="form-item">
                <label>订单状态</label>
                <div class="flex gap-5">
                  <button class="btn btn-sm" :class="orderStatus === '全部' ? 'btn-primary' : 'btn-default'" @click="orderStatus = '全部'">全部</button>
                  <button class="btn btn-sm" :class="orderStatus === '仅看已退款' ? 'btn-primary' : 'btn-default'" @click="orderStatus = '仅看已退款'">
                    <span class="dot red"></span> 仅看已退款
                  </button>
                </div>
              </div>
              <div class="form-item">
                <label>订单来源</label>
                <div class="flex gap-5">
                  <button class="btn btn-sm" :class="orderSource === '全部' ? 'btn-primary' : 'btn-default'" @click="orderSource = '全部'">全部</button>
                  <button class="btn btn-sm" :class="orderSource === '我的直销' ? 'btn-primary' : 'btn-default'" @click="orderSource = '我的直销'">我的直销</button>
                  <button class="btn btn-sm" :class="orderSource === '伙伴渠道' ? 'btn-primary' : 'btn-default'" @click="orderSource = '伙伴渠道'">伙伴渠道</button>
                </div>
              </div>
            </div>
            <div class="flex gap-10">
              <button class="btn btn-primary" @click="loadOrders(1)">筛选</button>
              <button class="btn btn-default" @click="orderKeyword = ''; orderStatus = '全部'; orderSource = '全部'; loadOrders(1)">重置</button>
              <button class="btn btn-default" @click="loadOrders(orderPage)">刷新</button>
            </div>
          </div>

          <div class="card">
            <table class="table">
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>伙伴渠道</th>
                  <th>商品</th>
                  <th>实付金额</th>
                  <th>订单状态</th>
                  <th>伙伴佣金</th>
                  <th>我的佣金</th>
                  <th>推荐人成本</th>
                  <th>成交时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredOrders" :key="item.order_no">
                  <td>{{ item.order_no }}</td>
                  <td><span class="tag green">{{ item.channel }}</span></td>
                  <td>{{ item.product_name }}</td>
                  <td>¥{{ item.paid_amount }}</td>
                  <td><span class="tag" :class="item.status.includes('完成') ? 'green' : 'red'">{{ item.status }}</span></td>
                  <td>¥{{ item.partner_commission }}</td>
                  <td class="green">¥{{ item.my_commission }}</td>
                  <td class="orange">¥{{ item.referrer_cost }}</td>
                  <td>{{ item.created_at }}</td>
                  <td><button class="btn btn-default btn-sm" @click="viewOrderDetail(item)">查看详情</button></td>
                </tr>
                <tr v-if="!filteredOrders.length">
                  <td colspan="10" class="text-center text-gray">暂无订单记录</td>
                </tr>
              </tbody>
            </table>

            <div class="pagination">
              <span>共 {{ orderTotal || orders.length }} 条，第 {{ orderPage }} / {{ Math.max(1, Math.ceil((orderTotal || orders.length) / orderPageSize)) }} 页</span>
              <div class="flex gap-10">
                <button class="btn btn-default btn-sm" :disabled="orderPage <= 1" @click="changeOrderPage(orderPage - 1)">上一页</button>
                <button class="btn btn-default btn-sm" :disabled="orderPage >= Math.max(1, Math.ceil((orderTotal || orders.length) / orderPageSize))" @click="changeOrderPage(orderPage + 1)">下一页</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 10. 客户优惠 -->
        <div v-if="currentMenu === 'discount'">
          <h2 class="page-title">客户优惠</h2>

          <div class="alert alert-blue mb-20">
            <h4>本页只设置：客户优惠 / 客户侧开关</h4>
            <p>这里是给客户看的设置：客户优惠，以及是否展示「成为Token商人」页面。伙伴返佣请去「伙伴等级返佣」，给伙伴看的联系方式和公告请去「伙伴联系资料」。</p>
          </div>

          <div class="grid-2">
            <div class="card">
              <h3>A 给客户设优惠</h3>
              <p>客户通过你的推广链接下单时，自动按此比例减免。折扣从你的佣金里扣，设得越高客户越便宜，但你赚得越少。</p>

              <div class="form-item">
                <label>当前折扣比例</label>
                <div class="current-discount">{{ normalizedDiscountRate.toFixed(2) }}%</div>
              </div>

              <div class="form-item">
                <label>在这里输入你要给客户的折扣比例：</label>
                <div class="flex items-center gap-5">
                  <input type="number" v-model.number="discountSettings.discount_rate" min="0" max="5" step="0.01" style="flex: 1;">
                  <span>%</span>
                </div>
                <p class="form-tip">可设置 0% 到 5%，超出范围会自动纠正到边界值。</p>
              </div>

              <div class="preview-box mb-20">
                <h4>实时预览（以 ¥100 商品为例）</h4>
                <div class="grid-3">
                  <div class="text-center">
                    <div class="text-sm text-gray">商品原价</div>
                    <div class="text-lg">¥100</div>
                  </div>
                  <div class="text-center">
                    <div class="text-sm text-gray">客户立减</div>
                    <div class="text-lg red">-¥{{ (100 * normalizedDiscountRate / 100).toFixed(2) }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-sm text-gray">客户实付</div>
                    <div class="text-lg green">¥{{ (100 - 100 * normalizedDiscountRate / 100).toFixed(2) }}</div>
                  </div>
                </div>

                <div class="progress-bar mt-15">
                  <div class="progress-label">你还赚</div>
                  <div class="progress-track">
                    <div class="progress-fill blue" :style="{ width: `${myRemainingRate}%` }"></div>
                  </div>
                  <div class="progress-value">{{ myRemainingRate.toFixed(2) }}%</div>
                </div>

                <div class="progress-bar mt-10">
                  <div class="progress-label">你让利</div>
                  <div class="progress-track">
                    <div class="progress-fill gray" :style="{ width: `${normalizedDiscountRate}%` }"></div>
                  </div>
                  <div class="progress-value">{{ normalizedDiscountRate.toFixed(2) }}%</div>
                </div>
              </div>

              <button class="btn btn-primary btn-block" :disabled="savingDiscount" @click="saveDiscountSettings">
                {{ savingDiscount ? '保存中...' : '保存' }}
              </button>
            </div>

            <div class="card">
              <h3>B 客户侧页面开关</h3>
              <p>这里控制通过你链接进入的客户，是否能看到额外的客户页面。</p>

              <div class="switch-card mb-20">
                <h4>Token商人页面开关</h4>
                <p>这个开关只影响通过你推广链接进入网站的用户。开启后，他们可以看到「成为Token商人」页面；关闭后，他们将看不到这个页面。其他渠道链接和其他渠道商不受影响。</p>

                <div class="flex gap-10 mb-10">
                  <button class="btn flex-1" :class="discountSettings.merchant_page_enabled ? 'btn-primary' : 'btn-default'" @click="discountSettings.merchant_page_enabled = true">开启页面</button>
                  <button class="btn flex-1" :class="!discountSettings.merchant_page_enabled ? 'btn-primary' : 'btn-default'" @click="discountSettings.merchant_page_enabled = false">关闭页面</button>
                </div>

                <div class="status-box">
                  当前状态：通过你链接进入的用户{{ discountSettings.merchant_page_enabled ? '可以看到' : '看不到' }}「成为Token商人」页面。
                </div>
              </div>

              <div class="switch-card">
                <h4>首页底部官方群栏目开关</h4>
                <p>这个开关只影响通过你推广链接进入网站的用户。开启后，他们可以看到首页底部的「扫码加入官方用户群」栏目和其中两张图片；关闭后，这个栏目会被隐藏。其他渠道链接和其他渠道商不受影响。</p>

                <div class="flex gap-10 mb-10">
                  <button class="btn flex-1" :class="discountSettings.group_section_enabled ? 'btn-primary' : 'btn-default'" @click="discountSettings.group_section_enabled = true">显示栏目</button>
                  <button class="btn flex-1" :class="!discountSettings.group_section_enabled ? 'btn-primary' : 'btn-default'" @click="discountSettings.group_section_enabled = false">隐藏栏目</button>
                </div>

                <div class="status-box">
                  当前状态：通过你链接进入的用户{{ discountSettings.group_section_enabled ? '可以看到' : '看不到' }}首页底部「扫码加入官方用户群」栏目。
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedOrderDetail" class="detail-modal-overlay" @click="closeOrderDetail">
          <div class="detail-modal" @click.stop>
            <div class="detail-modal__header">
              <h3>订单详情</h3>
              <button class="btn btn-default btn-sm" @click="closeOrderDetail">关闭</button>
            </div>
            <div class="detail-modal__grid">
              <div class="detail-modal__item"><span>订单号</span><strong>{{ selectedOrderDetail.order_no }}</strong></div>
              <div class="detail-modal__item"><span>伙伴渠道</span><strong>{{ selectedOrderDetail.channel }}</strong></div>
              <div class="detail-modal__item"><span>商品</span><strong>{{ selectedOrderDetail.product_name }}</strong></div>
              <div class="detail-modal__item"><span>实付金额</span><strong>¥{{ selectedOrderDetail.paid_amount }}</strong></div>
              <div class="detail-modal__item"><span>订单状态</span><strong>{{ selectedOrderDetail.status }}</strong></div>
              <div class="detail-modal__item"><span>成交时间</span><strong>{{ selectedOrderDetail.created_at }}</strong></div>
            </div>
            <div class="detail-modal__commission">
              <h4>佣金信息</h4>
              <div class="detail-modal__grid">
                <div class="detail-modal__item"><span>原始金额</span><strong>¥{{ orderCommissionDetail?.original_amount || selectedOrderDetail.paid_amount }}</strong></div>
                <div class="detail-modal__item"><span>最终金额</span><strong>¥{{ orderCommissionDetail?.final_amount || selectedOrderDetail.paid_amount }}</strong></div>
                <div class="detail-modal__item"><span>渠道让利</span><strong class="orange">¥{{ orderCommissionDetail?.channel_discount || '0.00' }}</strong></div>
              </div>
              <div class="detail-modal__grid mt-10">
                <div class="detail-modal__item"><span>伙伴佣金</span><strong>¥{{ selectedOrderDetail.partner_commission }}</strong></div>
                <div class="detail-modal__item"><span>我的佣金</span><strong class="green">¥{{ selectedOrderDetail.my_commission }}</strong></div>
                <div class="detail-modal__item"><span>推荐人成本</span><strong class="orange">¥{{ selectedOrderDetail.referrer_cost }}</strong></div>
              </div>
            </div>

            <div class="detail-modal__breakdown">
              <h4>分佣归属层级明细</h4>
              <div class="detail-toolbar mb-10">
                <div class="text-sm text-gray">最终成交渠道：{{ orderCommissionDetail?.final_channel || selectedOrderDetail.channel }}</div>
                <button class="btn btn-default btn-sm" :disabled="orderCommissionLoading" @click="reloadSelectedOrderCommissionDetail">{{ orderCommissionLoading ? '加载中...' : '刷新层级' }}</button>
              </div>
              <table class="breakdown-table">
                <thead>
                  <tr>
                    <th>层级</th>
                    <th>角色</th>
                    <th>分佣比例</th>
                    <th>净佣金</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="layer in orderCommissionDetail?.layers || []" :key="`layer-${layer.level}-${layer.user_id}`">
                    <td>L{{ layer.level }}</td>
                    <td>{{ formatCommissionRole(layer.role, layer.display_name) }}</td>
                    <td>{{ formatPercent(layer.commission_rate) }}</td>
                    <td :class="Number(layer.commission_amount) >= 0 ? 'green' : 'orange'">¥{{ layer.commission_amount }}</td>
                    <td><span class="tag" :class="isPositiveCommissionStatus(layer.status) ? 'green' : 'orange'">{{ layer.status || 'unknown' }}</span></td>
                  </tr>
                  <tr v-if="!(orderCommissionDetail?.layers || []).length && !orderCommissionLoading">
                    <td colspan="5" class="text-center text-gray">暂无分佣层级数据</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-sm text-gray mt-10" v-if="orderCommissionDetail">
                订单状态：{{ orderCommissionDetail.status || selectedOrderDetail.status }}，成交时间：{{ orderCommissionDetail.created_at || selectedOrderDetail.created_at }}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { zhengyeAPI } from '../api/zhengye'

type DashboardData = {
  opened?: boolean
  affiliate_code?: string
  promotion_path?: string
  has_parent?: boolean
  entry_rate?: number
  effective_commission_rate?: number
  my_commission_rate?: number
  max_commission_rate?: number
  upgrade_condition?: string
  paid_commission?: string
  pending_commission?: string
  total_commission?: string
  direct_partners?: number
  total_orders?: number
  total_sales?: string
  discount_rate?: number
  parent_contact_qq?: string
  parent_contact_wx?: string
  parent_contact_other?: string
  parent_announcement?: string
}

type StatsTrendItem = {
  date: string
  amount: number
}

type StatsSection = {
  total_sales?: string
  self_sales?: string
  net_sales?: string
  self_net_sales?: string
  net_settlement?: string
  net_settlement_original?: string
  net_settlement_refund?: string
  network_orders?: number
  self_orders?: number
  new_channels?: number
  channels?: number
  refund_amount?: string
  self_refund?: string
}

type StatsData = {
  today?: StatsSection
  total?: StatsSection
  effective_commission_rate?: number
  commission_rate?: number
  discount_rate?: number
  paid_settlement?: string
  pending_settlement?: string
  trend?: StatsTrendItem[]
}

type RankMetric = {
  amount?: string
  count?: number
  duration_text?: string
  time?: string
  minutes?: number
  rank?: number
  code?: string
}

type RankTopItem = {
  rank: number
  code: string
  amount: string
}

type RankGroup = {
  group?: string
  group_range?: string
  group_total?: number
  my_rank?: number
  my_sales?: string
  gap_to_next?: string
  top3?: RankTopItem[]
}

type RankData = {
  date?: string
  top_sales?: RankMetric
  top_orders?: RankMetric
  earliest_order?: RankMetric
  top_team?: RankMetric
  top_network?: RankMetric
  fastest_order?: RankMetric
  team_rank?: RankGroup
  network_rank?: RankGroup
}

type ContactData = {
  phone?: string
  notice?: string
  group_image_url?: string
  parent_group_image_url?: string
}

type DiscountData = {
  discount_rate?: number
  merchant_page_enabled?: boolean
  group_section_enabled?: boolean
}

type PartnerItem = {
  id: number
  code: string
  email: string
  avatar: string
  level_name: string
  level_icon: string
  rate: number
  today_direct_sales: string
  total_direct_sales: string
  today_network_sales: string
  total_network_sales: string
  total_network_orders: number
  today_settlement: string
  total_settlement: string
  group_visible: boolean
  is_new: boolean
}

type TeamMember = {
  id: number
  code: string
  email: string
  avatar: string
  self_sales: string
  team_settlement: string
  self_orders: string
  channel_count: string
  is_new: boolean
}

type TeamData = {
  direct_count: number
  total_count: number
  network_buyers: number
  graduated_count: number
  members: TeamMember[]
  total: number
  page: number
  page_size: number
}

type SettlementItem = {
  id: number
  code: string
  email: string
  avatar: string
  self_sales: string
  team_sales: string
  total_sales: string
  refund_amount: string
  net_sales: string
  self_orders: number
  team_orders: number
  net_settlement: string
  original_settlement: string
  refund_deduction: string
  settled_orders: number
  pending_orders: number
  direct_partners: number
  total_partners: number
}

type SettlementSummary = {
  direct_nodes: number
  orders: number
  total_sales: string
  refund_amount: string
  net_sales: string
  original_settlement: string
  refund_deduction: string
  net_settlement: string
  net_settlement_rate: string
  paid_amount: string
  unpaid_amount: string
}

type SettlementData = {
  date: string
  summary: SettlementSummary
  items: SettlementItem[]
  total: number
  page: number
  page_size: number
}

type PartnerOrderDetailItem = {
  order_id: number
  order_no: string
  product_name: string
  original_amount: string
  final_amount: string
  channel_discount: string
  final_channel: string
  partner_commission: string
  my_commission: string
  referrer_cost: string
  status: string
  is_settled: boolean
  is_self: boolean
  created_at: string
}

type PartnerOrderDetailData = {
  items: PartnerOrderDetailItem[]
  total: number
  page: number
  page_size: number
}

type OrderItem = {
  order_id: number
  order_no: string
  channel: string
  product_name: string
  paid_amount: string
  status: string
  partner_commission: string
  my_commission: string
  referrer_cost: string
  created_at: string
}

type OrderCommissionLayerItem = {
  level: number
  user_id: number
  display_name: string
  role: string
  commission_rate: number
  commission_amount: string
  status: string
}

type OrderCommissionDetailData = {
  order_id: number
  order_no: string
  product_name: string
  original_amount: string
  final_amount: string
  channel_discount: string
  final_channel: string
  status: string
  created_at: string
  layers: OrderCommissionLayerItem[]
}

type BalanceData = {
  user_id?: number
  balance?: string | number
  frozen_balance?: string | number
  pending_balance?: string | number
  total_income?: string | number
  total_withdraw?: string | number
}

type BalanceLogItem = {
  id: number
  type: string
  amount: string
  balance_before: string
  balance_after: string
  related_type: string
  related_id: number
  remark: string
  created_at: string
}

type BalanceLogsData = {
  items: BalanceLogItem[]
  total: number
  page: number
  page_size: number
}

type WithdrawSettingsData = {
  id?: number
  min_amount?: string
  interval_days?: number
  fee_rate?: number
  require_realname?: boolean
  enabled?: boolean
}

type WithdrawRequestItem = {
  id: number
  amount: string
  fee: string
  actual_amount: string
  channel: string
  account: string
  alipay_name: string
  status: string
  reject_reason: string
  created_at: string
  processed_at: string
}

type WithdrawRequestsData = {
  items: WithdrawRequestItem[]
  total: number
  page: number
  page_size: number
}

type StatsPeriod = '7d' | '30d' | '180d'

type RuleMetric = 'orders' | 'sales'
type RulePeriod = 'daily' | 'weekly'
type LevelSlot = 'top' | 'middle' | 'entry'

type LevelUpgradeCondition = {
  days: number
  daily_amount: number
  orders?: number
} | null

type LevelRule = {
  enabled: boolean
  metric: RuleMetric
  period: RulePeriod
  targetValue: number
  consecutiveDays: number
}

type LevelItem = {
  id: number
  slot: LevelSlot
  name: string
  icon: string
  rate: number
  member_count: number
  is_entry: boolean
  upgrade_condition: LevelUpgradeCondition
  style: string
  rule?: LevelRule
}

type LevelGroup = {
  level_id: number
  level_name: string
  rate: number
  members: Array<{
    id: number
    code: string
    email: string
    avatar: string
  }>
}

type LevelsData = {
  my_rate: number
  entry_rate: number
  can_configure?: boolean
  block_reason?: string
  levels: LevelItem[]
  team_by_level: LevelGroup[]
}

type EditorForm = {
  name: string
  rate: number
  isEntry: boolean
  rule: LevelRule
}

type LevelTheme = {
  className: string
  label: string
  border: string
  background: string
  text: string
  profit: string
  glow: string
  iconBg: string
  iconShadow: string
  chipBg: string
  chipText: string
}

const currentMenu = ref('home')
const dashboard = ref<DashboardData>({})
const stats = ref<StatsData>({})
const rank = ref<RankData>({})
const statsPeriod = ref<StatsPeriod>('7d')
const contactInfo = ref<ContactData>({
  phone: '',
  notice: '',
  group_image_url: '',
  parent_group_image_url: '',
})
const discountSettings = ref<DiscountData>({
  discount_rate: 100,
  merchant_page_enabled: true,
  group_section_enabled: true,
})
const levels = ref<LevelsData>({
  my_rate: 0,
  entry_rate: 0,
  can_configure: false,
  block_reason: '',
  levels: [],
  team_by_level: [],
})
const partners = ref<PartnerItem[]>([])
const team = ref<TeamData>({
  direct_count: 0,
  total_count: 0,
  network_buyers: 0,
  graduated_count: 0,
  members: [],
  total: 0,
  page: 1,
  page_size: 20,
})
const settlement = ref<SettlementData>({
  date: '',
  summary: {
    direct_nodes: 0,
    orders: 0,
    total_sales: '0.00',
    refund_amount: '0.00',
    net_sales: '0.00',
    original_settlement: '0.00',
    refund_deduction: '0.00',
    net_settlement: '0.00',
    net_settlement_rate: '0.00',
    paid_amount: '0.00',
    unpaid_amount: '0.00',
  },
  items: [],
  total: 0,
  page: 1,
  page_size: 20,
})
const settlementTab = ref<'partner' | 'mine'>('partner')
const orders = ref<OrderItem[]>([])
const partnerDetailMap = ref<Record<number, PartnerOrderDetailData>>({})
const settlementDetailMap = ref<Record<number, PartnerOrderDetailData>>({})
const partnerDetailLoadingId = ref<number | null>(null)
const settlementDetailLoadingId = ref<number | null>(null)
const orderCommissionDetail = ref<OrderCommissionDetailData | null>(null)
const orderCommissionLoading = ref(false)
const myBalance = ref<BalanceData>({
  balance: '0.00',
  frozen_balance: '0.00',
  pending_balance: '0.00',
  total_income: '0.00',
  total_withdraw: '0.00',
})
const balanceLogs = ref<BalanceLogsData>({ items: [], total: 0, page: 1, page_size: 20 })
const transferableCommissions = ref<any>({ items: [], total: 0, page: 1, page_size: 100 })
const withdrawSettings = ref<WithdrawSettingsData>({
  min_amount: '0.00',
  interval_days: 0,
  fee_rate: 0,
  require_realname: false,
  enabled: false,
})
const withdrawRequests = ref<WithdrawRequestsData>({ items: [], total: 0, page: 1, page_size: 20 })
const selectedTransferCommissionIDs = ref<number[]>([])
const transferForm = ref({
  verify_code: '',
})
const withdrawForm = ref({
  amount: 0,
  alipay_account: '',
  real_name: '',
  verify_code: '',
})
const transferringBalance = ref(false)
const submittingWithdraw = ref(false)
const withdrawingLoading = ref(false)
const savingContact = ref(false)
const savingDiscount = ref(false)
const savingLevels = ref(false)
const savingPartnerRateId = ref<number | null>(null)
const settlingPartnerId = ref<number | null>(null)
const partnerRateDrafts = ref<Record<number, number>>({})
const selectedLevelTab = ref<'all' | number>('all')
const editingLevelId = ref<number | null>(null)
const hoveredLevelId = ref<number | null>(null)
const localLevels = ref<LevelItem[]>([])
const editorForm = ref<EditorForm>({
  name: '',
  rate: 0,
  isEntry: false,
  rule: {
    enabled: false,
    metric: 'sales',
    period: 'daily',
    targetValue: 0,
    consecutiveDays: 3,
  },
})
const menuList = [
  { key: 'home', name: '先看这里' },
  { key: 'group', name: '加入官方群' },
  { key: 'rank', name: '封神榜' },
  { key: 'data', name: '详细数据' },
  { key: 'level', name: '伙伴等级返佣' },
  { key: 'contact', name: '伙伴联系资料' },
  { key: 'settle', name: '订单结算' },
  { key: 'team', name: '团队结构' },
  { key: 'partner', name: '我的伙伴' },
  { key: 'order', name: '订单记录' },
  { key: 'discount', name: '客户优惠' },
]

// 表单数据
const getTodayDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const settleDate = ref(getTodayDate())
const partnerRate = ref(15)
const partnerKeyword = ref('')
const teamKeyword = ref('')
const settlementKeyword = ref('')
const orderKeyword = ref('')
const orderStatus = ref('全部')
const orderSource = ref('全部')

const levelSlotMeta: Record<LevelSlot, { label: string; icon: string; style: string }> = {
  top: { label: '最高档', icon: '💎', style: 'yellow' },
  middle: { label: '中间档', icon: '🏅', style: 'gray' },
  entry: { label: '入门档', icon: '🥉', style: 'active' },
}

const bronzeTheme: LevelTheme = {
  className: 'theme-bronze',
  label: '入门档',
  border: '#ef9f67',
  background: 'linear-gradient(180deg, #fff0e4 0%, #ffd8bd 100%)',
  text: '#8e431b',
  profit: '#c65d1c',
  glow: 'radial-gradient(circle at top left, rgba(255,255,255,.72), rgba(255,255,255,0) 62%)',
  iconBg: 'linear-gradient(180deg, #fff8f2 0%, #ffd7ba 100%)',
  iconShadow: '0 10px 24px rgba(225, 122, 44, 0.24)',
  chipBg: 'rgba(255,255,255,.7)',
  chipText: '#b2551e',
}

const silverTheme: LevelTheme = {
  className: 'theme-silver',
  label: '进阶档',
  border: '#bcc6da',
  background: 'linear-gradient(180deg, #f6f9ff 0%, #e4ebf8 100%)',
  text: '#445067',
  profit: '#355f9d',
  glow: 'radial-gradient(circle at top left, rgba(255,255,255,.8), rgba(255,255,255,0) 60%)',
  iconBg: 'linear-gradient(180deg, #ffffff 0%, #dfe8f8 100%)',
  iconShadow: '0 10px 24px rgba(113, 136, 180, 0.22)',
  chipBg: 'rgba(255,255,255,.74)',
  chipText: '#56627d',
}

const themeByStyle: Record<string, LevelTheme> = {
  active: bronzeTheme,
  gray: silverTheme,
  yellow: {
    className: 'theme-gold',
    label: '高阶档',
    border: '#f0c05a',
    background: 'linear-gradient(180deg, #fff8d7 0%, #ffe6a1 100%)',
    text: '#7a5810',
    profit: '#c98b00',
    glow: 'radial-gradient(circle at top left, rgba(255,255,255,.82), rgba(255,255,255,0) 60%)',
    iconBg: 'linear-gradient(180deg, #fffdf3 0%, #ffe7a8 100%)',
    iconShadow: '0 10px 24px rgba(230, 176, 43, 0.28)',
    chipBg: 'rgba(255,255,255,.76)',
    chipText: '#8a6100',
  },
  blue: {
    className: 'theme-blue',
    label: '冲刺档',
    border: '#6ab5ff',
    background: 'linear-gradient(180deg, #e8f5ff 0%, #b9dcff 100%)',
    text: '#16507e',
    profit: '#0f7bdc',
    glow: 'radial-gradient(circle at top left, rgba(255,255,255,.75), rgba(255,255,255,0) 60%)',
    iconBg: 'linear-gradient(180deg, #f7fbff 0%, #c9e4ff 100%)',
    iconShadow: '0 10px 24px rgba(52, 139, 235, 0.24)',
    chipBg: 'rgba(255,255,255,.74)',
    chipText: '#1d6db0',
  },
  purple: {
    className: 'theme-purple',
    label: '王者档',
    border: '#a88cff',
    background: 'linear-gradient(180deg, #f3edff 0%, #dccfff 100%)',
    text: '#53338b',
    profit: '#7a3cff',
    glow: 'radial-gradient(circle at top left, rgba(255,255,255,.78), rgba(255,255,255,0) 62%)',
    iconBg: 'linear-gradient(180deg, #fbf8ff 0%, #e2d5ff 100%)',
    iconShadow: '0 10px 24px rgba(130, 88, 235, 0.22)',
    chipBg: 'rgba(255,255,255,.76)',
    chipText: '#6a46c8',
  },
}

const defaultLevelTheme: LevelTheme = silverTheme

const formatPercent = (value?: number) =>
  typeof value === 'number' ? `${value.toFixed(2)}%` : '--'

const formatMoney = (value?: number | string) => {
  if (typeof value === 'number') return value.toFixed(2)
  if (typeof value === 'string') return value
  return '--'
}

const formatCommissionRole = (role?: string, name?: string) => {
  const roleText = role === 'direct' ? '直接推广者' : role === 'indirect' ? '上级分佣' : role || '分佣角色'
  return name ? `${roleText} · ${name}` : roleText
}

const isPositiveCommissionStatus = (status?: string) => ['available', 'withdrawn', 'paid', 'settled'].includes(String(status || '').toLowerCase())

const statsTrend = computed(() => stats.value.trend ?? [])
const trendSegments = computed(() => {
  const items = statsTrend.value
  if (items.length < 2) return []

  return items.slice(0, -1).map((item, index) => {
    const nextItem = items[index + 1]
    if (!nextItem) {
      return {
        left: '0%',
        top: '0%',
        width: '0%',
        transform: 'rotate(0deg)',
      }
    }
    const current = getTrendPointPosition(index, items.length, item.amount)
    const next = getTrendPointPosition(index + 1, items.length, nextItem.amount)
    const dx = next.left - current.left
    const dy = next.top - current.top
    const length = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx) * 180 / Math.PI
    return {
      left: `${current.left}%`,
      top: `${current.top}%`,
      width: `${length}%`,
      transform: `rotate(${angle}deg)`,
    }
  })
})

const currentCommissionRate = computed(() => {
  if (typeof dashboard.value.effective_commission_rate === 'number') return dashboard.value.effective_commission_rate
  if (typeof stats.value.effective_commission_rate === 'number') return stats.value.effective_commission_rate
  if (typeof stats.value.commission_rate === 'number') return stats.value.commission_rate
  if (typeof dashboard.value.my_commission_rate === 'number') return dashboard.value.my_commission_rate
  if (typeof levels.value.entry_rate === 'number' && levels.value.entry_rate > 0) return levels.value.entry_rate
  return 0
})
const canConfigureLevels = computed(() => {
  if (typeof levels.value.can_configure === 'boolean') return levels.value.can_configure
  return Number(currentCommissionRate.value || 0) > 0
})

const levelBlockReason = computed(() => {
  const backendReason = String(levels.value.block_reason || '').trim()
  if (backendReason) return backendReason
  if (Number(currentCommissionRate.value || 0) <= 0) return '自己的拿货折扣是 0.00，不能设置伙伴等级返佣'
  return '当前账号暂不能设置伙伴等级返佣'
})

const nextUpgradeText = computed(() => {
  const dashboardUpgrade = String(dashboard.value.upgrade_condition || '').trim()
  if (dashboardUpgrade) {
    if (/最高档|无法升级|无上级/.test(dashboardUpgrade)) return ''
    return dashboardUpgrade
  }

  const orderedLevels = (localLevels.value.length ? localLevels.value : levels.value.levels)
    .slice()
    .sort((a, b) => Number(a.rate ?? 0) - Number(b.rate ?? 0))

  const currentRate = Number(currentCommissionRate.value ?? 0)
  const nextLevel = orderedLevels.find((level) => Number(level.rate ?? 0) > currentRate)
  if (!nextLevel) return ''

  const rule = normalizeRule(nextLevel)
  if (!rule.enabled) {
    return `下一档：${nextLevel.name}（每 ¥100 返佣 ¥${formatMoney(nextLevel.rate)}），暂未设置升级条件`
  }

  const metricText = rule.metric === 'orders'
    ? `${rule.period === 'daily' ? '每日' : '每周'} ${Number(rule.targetValue || 0)} 单`
    : `${rule.period === 'daily' ? '每日' : '每周'} ¥${formatMoney(rule.targetValue)}`

  return `下一档：${nextLevel.name}；连续 ${rule.consecutiveDays} 天满足${metricText}`
})

const hasParentContact = computed(() => {
  return !!(
    dashboard.value.parent_contact_qq ||
    dashboard.value.parent_contact_wx ||
    dashboard.value.parent_contact_other ||
    dashboard.value.parent_announcement
  )
})

const groupSectionVisible = computed(() => {
  return !!(
    discountSettings.value.group_section_enabled &&
    (
      contactInfo.value.notice ||
      contactInfo.value.group_image_url ||
      contactInfo.value.parent_group_image_url
    )
  )
})

const promotionLinkText = computed(() => {
  const code = dashboard.value.affiliate_code
  if (!code) return dashboard.value.promotion_path || '--'
  const discountRate = Number(discountSettings.value.discount_rate ?? 0)
  const base = `${window.location.origin}/?aff=${code}&inviter_code=${code}`
  return discountRate > 0 ? `${base}&discount=${discountRate}` : base
})
const normalizedDiscountRate = computed(() => {
  const raw = Number(discountSettings.value.discount_rate ?? 0)
  if (Number.isNaN(raw)) return 0
  return Math.min(100, Math.max(0, raw))
})
const myRemainingRate = computed(() => Math.max(0, Number(currentCommissionRate.value || 0) - Number(normalizedDiscountRate.value || 0)))
const currentEditLevel = computed(() => localLevels.value.find(item => item.id === editingLevelId.value) || null)
const allMembers = computed(() =>
  (levels.value?.team_by_level || []).flatMap(group =>
    group.members.map(member => ({
      ...member,
      level_name: group.level_name,
      rate: group.rate,
    }))
  )
)
const levelPartnerCount = computed(() => allMembers.value.length)
const filteredMembers = computed(() => {
  if (selectedLevelTab.value === 'all') return allMembers.value
  const group = (levels.value?.team_by_level || []).find(item => item.level_id === selectedLevelTab.value)
  if (!group) return []
  return group.members.map(member => ({
    ...member,
    level_name: group.level_name,
    rate: group.rate,
  }))
})
const teamRankTop3Display = computed(() => (rank.value.team_rank?.top3 ?? []).slice().sort((a, b) => a.rank - b.rank))
const networkRankTop3Display = computed(() => (rank.value.network_rank?.top3 ?? []).slice().sort((a, b) => a.rank - b.rank))
const filteredPartners = computed(() => {
  const keyword = partnerKeyword.value.trim().toLowerCase()
  if (!keyword) return partners.value
  return partners.value.filter(item => `${item.email} ${item.code}`.toLowerCase().includes(keyword))
})
const partnerTotals = computed(() =>
  filteredPartners.value.reduce(
    (acc, item) => ({
      todayDirectSales: acc.todayDirectSales + Number(item.today_direct_sales || 0),
      totalDirectSales: acc.totalDirectSales + Number(item.total_direct_sales || 0),
      todayNetworkSales: acc.todayNetworkSales + Number(item.today_network_sales || 0),
      totalNetworkSales: acc.totalNetworkSales + Number(item.total_network_sales || 0),
      totalNetworkOrders: acc.totalNetworkOrders + Number(item.total_network_orders || 0),
      todaySettlement: acc.todaySettlement + Number(item.today_settlement || 0),
      totalSettlement: acc.totalSettlement + Number(item.total_settlement || 0),
    }),
    {
      todayDirectSales: 0,
      totalDirectSales: 0,
      todayNetworkSales: 0,
      totalNetworkSales: 0,
      totalNetworkOrders: 0,
      todaySettlement: 0,
      totalSettlement: 0,
    }
  )
)
const filteredTeamMembers = computed(() => {
  const keyword = teamKeyword.value.trim().toLowerCase()
  if (!keyword) return team.value.members
  return team.value.members.filter(item => `${item.email} ${item.code}`.toLowerCase().includes(keyword))
})
const filteredSettlementItems = computed(() => {
  const keyword = settlementKeyword.value.trim().toLowerCase()
  if (!keyword) return settlement.value.items
  return settlement.value.items.filter(item => `${item.email} ${item.code}`.toLowerCase().includes(keyword))
})
const filteredOrders = computed(() => {
  const keyword = orderKeyword.value.trim().toLowerCase()
  return orders.value.filter(item => {
    const matchKeyword = !keyword || `${item.order_no} ${item.channel} ${item.product_name}`.toLowerCase().includes(keyword)
    const matchStatus = orderStatus.value === '全部' || (orderStatus.value === '仅看已退款' ? item.status.includes('退款') : item.status === orderStatus.value)
    const matchSource = orderSource.value === '全部'
      || (orderSource.value === '我的直销' && item.channel === '我的直销')
      || (orderSource.value === '伙伴渠道' && item.channel !== '我的直销')
    return matchKeyword && matchStatus && matchSource
  })
})
const selectedTransferCommissionAmount = computed(() =>
  selectedTransferCommissionIDs.value
    .reduce((sum, id) => {
      const matched = transferableCommissions.value.items.find((item: any) => Number(item.id) === Number(id))
      return sum + Number(matched?.commission_amount || 0)
    }, 0)
    .toFixed(2)
)
const withdrawFeePreview = computed(() => {
  const amount = Number(withdrawForm.value.amount || 0)
  const feeRate = Number(withdrawSettings.value.fee_rate || 0)
  if (amount <= 0 || feeRate <= 0) return '0.00'
  return (amount * feeRate / 100).toFixed(2)
})
const withdrawActualPreview = computed(() => {
  const amount = Number(withdrawForm.value.amount || 0)
  const fee = Number(withdrawFeePreview.value || 0)
  return Math.max(0, amount - fee).toFixed(2)
})

const getLevelTheme = (level: Pick<LevelItem, 'style' | 'is_entry'>): LevelTheme => {
  if (level.is_entry) return bronzeTheme
  return themeByStyle[level.style || 'gray'] ?? defaultLevelTheme
}

const getLevelCardStyle = (level: LevelItem) => {
  const theme = getLevelTheme(level)
  return {
    '--level-text': theme.text,
    '--level-profit': theme.profit,
    borderColor: theme.border,
    background: theme.background,
  }
}

const getLevelIconStyle = (level: LevelItem) => {
  const theme = getLevelTheme(level)
  return {
    background: theme.iconBg,
    boxShadow: theme.iconShadow,
  }
}

const getLevelChipStyle = (level: LevelItem) => {
  const theme = getLevelTheme(level)
  return {
    background: theme.chipBg,
    color: theme.chipText,
    borderColor: theme.border,
  }
}

const normalizeRule = (level: any): LevelRule => {
  const condition = level?.rule || level?.upgrade_condition
  if (!condition) {
    return {
      enabled: false,
      metric: 'sales',
      period: 'daily',
      targetValue: 0,
      consecutiveDays: 3,
    }
  }

  const targetOrders = Number(condition.orders ?? condition.target_orders ?? 0)
  const targetAmount = Number(condition.targetValue ?? condition.target_value ?? condition.daily_amount ?? 0)
  const rawMetric = condition.metric || condition.metric_type || ''
  const metric: 'orders' | 'sales' = targetOrders > 0 && targetAmount <= 0 ? 'orders' : (rawMetric === 'orders' ? 'orders' : 'sales')
  const targetValue = metric === 'orders' ? targetOrders : targetAmount

  return {
    enabled: true,
    metric,
    period: condition.period || condition.period_type || 'daily',
    targetValue: Number(targetValue || 0),
    consecutiveDays: Number(condition.consecutiveDays ?? condition.consecutive_days ?? condition.days ?? 3),
  }
}

const createFixedLevel = (slot: LevelSlot, source?: any): LevelItem => {
  const meta = levelSlotMeta[slot]
  return {
    id: Number(source?.id ?? Date.now() + (slot === 'top' ? 1 : slot === 'middle' ? 2 : 3)),
    slot,
    name: String(source?.name || ''),
    icon: source?.icon || meta.icon,
    rate: Number(source?.rate ?? 0),
    member_count: Number(source?.member_count ?? 0),
    is_entry: slot === 'entry',
    upgrade_condition: slot === 'entry' ? null : (source?.upgrade_condition || null),
    style: meta.style,
    rule: slot === 'entry'
      ? {
          enabled: false,
          metric: 'sales',
          period: 'daily',
          targetValue: 0,
          consecutiveDays: 0,
        }
      : normalizeRule(source),
  }
}

const isLevelConfigured = (level: LevelItem) => Number(level.rate || 0) > 0 && String(level.name || '').trim().length > 0

const levelDisplayName = (level: LevelItem) => String(level.name || '').trim() || levelSlotMeta[level.slot].label

const configuredLevelCount = computed(() => localLevels.value.filter(item => isLevelConfigured(item)).length)

const configuredSelectableLevels = computed(() =>
  localLevels.value.filter(item => isLevelConfigured(item)).sort((a, b) => Number(a.rate || 0) - Number(b.rate || 0))
)

const normalizeLevels = (list: any[] = []) =>
  {
    const ordered = [...list].sort((a, b) => Number(a.rate ?? 0) - Number(b.rate ?? 0))
    const entry = ordered.find(item => Boolean(item?.is_entry))
    const others = ordered.filter(item => !item?.is_entry)
    const middle = others[0]
    const top = others[1]
    return [
      createFixedLevel('top', top),
      createFixedLevel('middle', middle),
      createFixedLevel('entry', entry),
    ]
  }

watch(
  () => levels.value,
  value => {
    localLevels.value = normalizeLevels(value?.levels || [])
    if (!localLevels.value.length) return
    if (!editingLevelId.value || !localLevels.value.some(item => item.id === editingLevelId.value)) {
      const lastLevel = localLevels.value[localLevels.value.length - 1]
      if (lastLevel) beginEditLevel(lastLevel.id)
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => settleDate.value,
  () => {
    partnerDetailMap.value = {}
    settlementDetailMap.value = {}
  }
)

watch(
  () => settlementKeyword.value,
  () => {
    settlementDetailMap.value = {}
  }
)

const loadDashboard = async () => {
  try {
    dashboard.value = await zhengyeAPI.getDashboard()
  } catch (error) {
    console.error('加载 dashboard 失败:', error)
  }
}

const loadStats = async (period: StatsPeriod = statsPeriod.value) => {
  try {
    stats.value = await zhengyeAPI.getStats(period)
    statsPeriod.value = period
  } catch (error) {
    console.error('加载 stats 失败:', error)
  }
}

const loadRank = async () => {
  try {
    rank.value = await zhengyeAPI.getRank()
  } catch (error) {
    console.error('加载 rank 失败:', error)
  }
}

const loadLevels = async () => {
  try {
    levels.value = await zhengyeAPI.getLevels()
  } catch (error) {
    console.error('加载 levels 失败:', error)
  }
}

const loadContact = async () => {
  try {
    const data = await zhengyeAPI.getContact()
    contactInfo.value = {
      phone: data?.phone || '',
      notice: data?.notice || '',
      group_image_url: data?.group_image_url || '',
      parent_group_image_url: data?.parent_group_image_url || '',
    }
  } catch (error) {
    console.error('加载 contact 失败:', error)
  }
}

const loadDiscount = async () => {
  try {
    const data = await zhengyeAPI.getDiscount()
    discountSettings.value = {
      discount_rate: Number(data?.discount_rate ?? 100),
      merchant_page_enabled: Boolean(data?.merchant_page_enabled),
      group_section_enabled: Boolean(data?.group_section_enabled),
    }
  } catch (error) {
    console.error('加载 discount 失败:', error)
  }
}

const loadPartners = async (page = 1) => {
  try {
    partnerPage.value = page
    const pageSize = 20
    const res = await zhengyeAPI.getPartners({
      page,
      page_size: pageSize,
      ...(partnerKeyword.value ? { keyword: partnerKeyword.value } : {}),
    })
    partners.value = Array.isArray(res) ? res : (res as any)?.items ?? res
    partnerRateDrafts.value = partners.value.reduce<Record<number, number>>((acc, item) => {
      acc[item.id] = Number(item.rate || 0)
      return acc
    }, {})
    if (partners.value[0]) partnerRate.value = Number(partners.value[0].rate || 0)
  } catch (error) {
    console.error('加载 partners 失败:', error)
  }
}

const loadTeam = async () => {
  try {
    team.value = await zhengyeAPI.getTeam(teamKeyword.value ? { keyword: teamKeyword.value } : undefined)
  } catch (error) {
    console.error('加载 team 失败:', error)
  }
}

const loadSettlement = async () => {
  try {
    settlement.value = await zhengyeAPI.getSettlement({
      date: settleDate.value,
      ...(settlementKeyword.value ? { keyword: settlementKeyword.value } : {}),
    })
  } catch (error) {
    console.error('加载 settlement 失败:', error)
  }
}

const loadOrders = async (page = 1) => {
  try {
    orderPage.value = page
    const res = await zhengyeAPI.getOrders({
      page,
      page_size: orderPageSize,
      ...(orderKeyword.value ? { keyword: orderKeyword.value } : {}),
      ...(orderStatus.value !== '全部' ? { status: orderStatus.value } : {}),
      ...(orderSource.value !== '全部' ? { source: orderSource.value } : {}),
    })
    orders.value = Array.isArray(res) ? res : (res as any)?.items ?? res
    orderTotal.value = (res as any)?.total ?? orders.value.length
  } catch (error) {
    console.error('加载 orders 失败:', error)
  }
}

const loadPartnerDetail = async (partnerId: number, force = false) => {
  if (!partnerId) return
  if (!force && partnerDetailMap.value[partnerId]) return
  try {
    partnerDetailLoadingId.value = partnerId
    partnerDetailMap.value = {
      ...partnerDetailMap.value,
      [partnerId]: await zhengyeAPI.getPartnerOrdersByDate(partnerId, {
        start_date: settleDate.value,
        end_date: settleDate.value,
        page: 1,
        page_size: 20,
      }),
    }
  } catch (error) {
    console.error('加载伙伴明细失败:', error)
    window.alert('加载伙伴订单明细失败，请稍后重试')
  } finally {
    partnerDetailLoadingId.value = null
  }
}

const loadSettlementDetail = async (partnerId: number, force = false) => {
  if (!partnerId) return
  if (!force && settlementDetailMap.value[partnerId]) return
  try {
    settlementDetailLoadingId.value = partnerId
    settlementDetailMap.value = {
      ...settlementDetailMap.value,
      [partnerId]: await zhengyeAPI.getPartnerOrdersByDate(partnerId, {
        start_date: settleDate.value,
        end_date: settleDate.value,
        ...(settlementKeyword.value ? { keyword: settlementKeyword.value } : {}),
        page: 1,
        page_size: 20,
      }),
    }
  } catch (error) {
    console.error('加载结算明细失败:', error)
    window.alert('加载结算订单明细失败，请稍后重试')
  } finally {
    settlementDetailLoadingId.value = null
  }
}

const loadBalanceData = async () => {
  try {
    const [balance, logs, commissions] = await Promise.all([
      zhengyeAPI.getBalance(),
      zhengyeAPI.getBalanceLogs({ page: 1, page_size: 20 }),
      zhengyeAPI.getTransferableCommissions({ page: 1, page_size: 100 }),
    ])
    myBalance.value = balance
    balanceLogs.value = logs
    transferableCommissions.value = commissions
    selectedTransferCommissionIDs.value = selectedTransferCommissionIDs.value.filter(id =>
      commissions.items.some((item: any) => Number(item.id) === Number(id) && item.can_transfer)
    )
  } catch (error) {
    console.error('加载余额数据失败:', error)
    window.alert('加载余额数据失败，请稍后重试')
  }
}

const loadWithdrawData = async () => {
  try {
    withdrawingLoading.value = true
    const [settings, requests] = await Promise.all([
      zhengyeAPI.getWithdrawSettings(),
      zhengyeAPI.getWithdrawRequests({ page: 1, page_size: 20 }),
    ])
    withdrawSettings.value = settings
    withdrawRequests.value = requests
  } catch (error) {
    console.error('加载提现数据失败:', error)
    window.alert('加载提现规则或记录失败，请稍后重试')
  } finally {
    withdrawingLoading.value = false
  }
}

const toggleTransferCommission = (id: number) => {
  if (!id) return
  if (selectedTransferCommissionIDs.value.includes(id)) {
    selectedTransferCommissionIDs.value = selectedTransferCommissionIDs.value.filter(item => item !== id)
    return
  }
  selectedTransferCommissionIDs.value = [...selectedTransferCommissionIDs.value, id]
}

const toggleSelectAllTransferable = (checked: boolean) => {
  const allIds = (transferableCommissions.value.items || [])
    .filter((item: any) => item.can_transfer)
    .map((item: any) => Number(item.id))
  if (checked) {
    selectedTransferCommissionIDs.value = allIds
    return
  }
  selectedTransferCommissionIDs.value = allIds.filter((id: number) => !selectedTransferCommissionIDs.value.includes(id))
}

const handleTransferToBalance = async () => {
  const commissionIDs = selectedTransferCommissionIDs.value.slice()
  if (!commissionIDs.length) {
    window.alert('请先勾选要转余额的佣金记录')
    return
  }

  const amount = Number(selectedTransferCommissionAmount.value)
  if (!amount || amount <= 0) {
    window.alert('当前勾选佣金金额无效')
    return
  }

  try {
    transferringBalance.value = true
    await zhengyeAPI.transferCommissionToBalance({
      commission_ids: commissionIDs,
      amount,
      verify_code: transferForm.value.verify_code || undefined,
    })
    window.alert('佣金已提交转余额')
    await loadBalanceData()
    selectedTransferCommissionIDs.value = []
    transferForm.value = { verify_code: '' }
  } catch (error) {
    console.error('佣金转余额失败:', error)
    window.alert('佣金转余额失败，请检查勾选记录、金额和验证码后重试')
  } finally {
    transferringBalance.value = false
  }
}

const formatWithdrawStatus = (status?: string) => {
  const normalized = String(status || '').toLowerCase()
  if (normalized === 'pending_review') return '待审核'
  if (normalized === 'rejected') return '已驳回'
  if (normalized === 'paid') return '已打款'
  return status || '未知状态'
}

const withdrawStatusClass = (status?: string) => {
  const normalized = String(status || '').toLowerCase()
  if (normalized === 'paid') return 'green'
  if (normalized === 'rejected') return 'red'
  return 'blue'
}

const scrollToMineSection = (section: string) => {
  const el = document.querySelector(`[data-mine-section="${section}"]`)
  if (el && 'scrollIntoView' in el) {
    ;(el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleApplyWithdraw = async () => {
  const amount = Number(withdrawForm.value.amount || 0)
  const minAmount = Number(withdrawSettings.value.min_amount || 0)
  const balance = Number(myBalance.value.balance || 0)
  if (!withdrawSettings.value.enabled) {
    window.alert('当前未开放提现')
    return
  }
  if (!amount || amount <= 0) {
    window.alert('请输入有效提现金额')
    return
  }
  if (amount < minAmount) {
    window.alert(`提现金额不能低于 ¥${formatMoney(withdrawSettings.value.min_amount || 0)}`)
    return
  }
  if (amount > balance) {
    window.alert('提现金额不能超过当前可用余额')
    return
  }
  if (!withdrawForm.value.alipay_account.trim()) {
    window.alert('请填写支付宝账号')
    return
  }
  if (withdrawSettings.value.require_realname && !withdrawForm.value.real_name.trim()) {
    window.alert('当前提现规则要求填写收款实名')
    return
  }
  if (!withdrawForm.value.verify_code.trim()) {
    window.alert('请输入邮箱验证码')
    return
  }

  try {
    submittingWithdraw.value = true
    await zhengyeAPI.applyWithdraw({
      amount,
      alipay_account: withdrawForm.value.alipay_account.trim(),
      real_name: withdrawForm.value.real_name.trim(),
      verify_code: withdrawForm.value.verify_code.trim(),
    })
    window.alert('提现申请已提交')
    withdrawForm.value = {
      amount: 0,
      alipay_account: '',
      real_name: '',
      verify_code: '',
    }
    await Promise.all([loadBalanceData(), loadWithdrawData()])
  } catch (error) {
    console.error('提现申请失败:', error)
    window.alert('提现申请失败，请检查金额、账号、实名和验证码后重试')
  } finally {
    submittingWithdraw.value = false
  }
}

const reloadSelectedOrderCommissionDetail = async () => {
  if (!selectedOrderDetail.value?.order_id) return
  try {
    orderCommissionLoading.value = true
    orderCommissionDetail.value = await zhengyeAPI.getOrderCommissionDetail(selectedOrderDetail.value.order_id)
  } catch (error) {
    console.error('加载订单分佣详情失败:', error)
    window.alert('加载订单分佣详情失败，请稍后重试')
  } finally {
    orderCommissionLoading.value = false
  }
}

watch(
  () => discountSettings.value.discount_rate,
  value => {
    const nextValue = Number(value)
    // 客户优惠上限 5%
    discountSettings.value.discount_rate = Number.isNaN(nextValue) ? 0 : Math.min(5, Math.max(0, nextValue))
  }
)

const syncEditorForm = (lv: LevelItem) => {
  editorForm.value = {
    name: lv.name,
    rate: lv.rate,
    isEntry: lv.slot === 'entry',
    rule: { ...normalizeRule(lv) },
  }
}

const beginEditLevel = (id: number) => {
  editingLevelId.value = id
  const target = localLevels.value.find(item => item.id === id)
  if (target) syncEditorForm(target)
}

const openLevelEditor = (id: number) => {
  beginEditLevel(id)
}

const cancelEditLevel = () => {
  if (currentEditLevel.value) syncEditorForm(currentEditLevel.value)
  editingLevelId.value = null
  hoveredLevelId.value = null
}

const refreshDecorations = () => {
  localLevels.value = localLevels.value.map((item) => ({
    ...item,
    icon: levelSlotMeta[item.slot].icon,
    style: levelSlotMeta[item.slot].style,
    is_entry: item.slot === 'entry',
  }))
}

const validateLevelPayload = (payload: LevelsData): string => {
  const list = payload.levels || []
  const myRate = Number(currentCommissionRate.value || payload.my_rate || 0)
  if (!canConfigureLevels.value || myRate <= 0) return levelBlockReason.value
  if (list.length === 0 || list.length > 3) return '最多设置 3 个等级，且至少设置 1 个'

  let entryCount = 0
  let previousRate = 0
  for (let index = 0; index < list.length; index += 1) {
    const item = list[index]
    if (!item) return '等级数据异常，请刷新后重试'
    const rate = Number(item.rate || 0)
    if (!String(item.name || '').trim()) return '等级名称不能为空'
    if (rate <= 0) return '等级返佣必须大于 0'
    if (rate >= myRate) return `等级返佣必须小于你自己的 ¥${formatMoney(myRate)} / ¥100`
    if (index > 0 && rate <= previousRate) return `第${index + 1}档必须大于第${index}档，档位要一档比一档高，例如：10、15、19`

    if (item.is_entry) entryCount += 1
    if (index === 0 && !item.is_entry) return '最低档必须是入门档'
    if (index > 0 && item.is_entry) return '只有最低档可以是入门档'

    if (!item.is_entry) {
      const rule = normalizeRule(item)
      if (!rule.enabled) return '非入门档必须设置升级条件'
      if (Number(rule.consecutiveDays || 0) <= 0) return '连续天数必须大于 0'
      if (Number(rule.targetValue || 0) <= 0) return '非入门档必须设置大于 0 的销售额或订单数目标'
    }

    previousRate = rate
  }

  if (entryCount !== 1) return '必须有且只有一个入门档'
  return ''
}

const handleLevelsSave = async (payload: LevelsData) => {
  const errorMessage = validateLevelPayload(payload)
  if (errorMessage) {
    window.alert(errorMessage)
    return
  }
  try {
    savingLevels.value = true
    const saved = await zhengyeAPI.saveLevels(payload)
    levels.value = saved
    await Promise.all([loadDashboard(), loadStats(statsPeriod.value)])
    window.alert('伙伴等级返佣已保存')
  } catch (error: any) {
    console.error('保存 levels 失败:', error)
    window.alert(error?.response?.data?.message || error?.message || '保存失败，请稍后重试')
  } finally {
    savingLevels.value = false
  }
}

const saveContactInfo = async () => {
  try {
    savingContact.value = true
    const payload = {
      phone: contactInfo.value.phone || '',
      notice: contactInfo.value.notice || '',
      group_image_url: contactInfo.value.group_image_url || '',
      parent_group_image_url: contactInfo.value.parent_group_image_url || '',
    }

    await zhengyeAPI.saveContact(payload)
    contactInfo.value = { ...payload }
    window.alert('伙伴联系资料已保存')
  } catch (error) {
    console.error('保存 contact 失败:', error)
    window.alert('保存失败，请稍后重试')
  } finally {
    savingContact.value = false
  }
}

const saveDiscountSettings = async () => {
  try {
    savingDiscount.value = true
    const payload = {
      discount_rate: Math.min(100, Math.max(0, Number(discountSettings.value.discount_rate ?? 0))),
      merchant_page_enabled: Boolean(discountSettings.value.merchant_page_enabled),
      group_section_enabled: Boolean(discountSettings.value.group_section_enabled),
    }

    await zhengyeAPI.saveDiscount(payload)
    discountSettings.value = { ...payload }
    await Promise.all([loadDashboard(), loadStats(statsPeriod.value)])
    window.alert('客户优惠设置已保存')
  } catch (error) {
    console.error('保存 discount 失败:', error)
    window.alert('保存失败，请稍后重试')
  } finally {
    savingDiscount.value = false
  }
}

const savePartnerRate = async (partnerId: number) => {
  try {
    savingPartnerRateId.value = partnerId
    const nextRate = Number(partnerRateDrafts.value[partnerId] ?? 0)
    const response = await zhengyeAPI.updatePartnerRate(partnerId, nextRate)
    const appliedRate = Number(response?.rate ?? nextRate)
    partners.value = partners.value.map(item => (item.id === partnerId ? { ...item, rate: appliedRate } : item))
    partnerRateDrafts.value = {
      ...partnerRateDrafts.value,
      [partnerId]: appliedRate,
    }
    window.alert('伙伴比例已保存')
  } catch (error) {
    console.error('保存 partner rate 失败:', error)
    window.alert('保存失败，请稍后重试')
  } finally {
    savingPartnerRateId.value = null
  }
}

const handleSettle = async (partnerId: number) => {
  try {
    settlingPartnerId.value = partnerId
    await zhengyeAPI.doSettle(partnerId, settleDate.value)
    window.alert('已提交结算请求')
    await loadSettlement()
  } catch (error) {
    console.error('结算失败:', error)
    window.alert('结算失败，请稍后重试')
  } finally {
    settlingPartnerId.value = null
  }
}

const saveCurrentLevel = async () => {
  if (!canConfigureLevels.value) {
    window.alert(levelBlockReason.value)
    return
  }
  if (!currentEditLevel.value) return

  const isEntrySlot = currentEditLevel.value.slot === 'entry'
  const trimmedName = String(editorForm.value.name || '').trim()
  const editingRate = Number(editorForm.value.rate || 0)
  const myRate = Number(currentCommissionRate.value || 0)

  if (!isEntrySlot && !trimmedName && editingRate <= 0) {
    localLevels.value = localLevels.value.map(item => item.id !== currentEditLevel.value?.id
      ? item
      : {
          ...item,
          name: '',
          rate: 0,
          member_count: item.member_count || 0,
          rule: {
            enabled: false,
            metric: 'sales',
            period: 'daily',
            targetValue: 0,
            consecutiveDays: 0,
          },
          upgrade_condition: null,
        })
    refreshDecorations()
  } else {
    if (!trimmedName) {
      window.alert('请先填写档位名称')
      return
    }
    if (editingRate <= 0) {
      window.alert('返佣金额必须大于 0')
      return
    }
  }

  if (isEntrySlot && editingRate <= 0) {
    window.alert('返佣金额必须大于 0')
    return
  }

  if (editingRate > 0 && (myRate <= 0 || editingRate >= myRate)) {
    window.alert(`等级返佣必须小于你自己的 ¥${formatMoney(myRate)} / ¥100`)
    return
  }

  if (!isEntrySlot && editingRate > 0) {
    const targetValue = Number(editorForm.value.rule.targetValue || 0)
    const consecutiveDays = Number(editorForm.value.rule.consecutiveDays || 0)

    if (targetValue <= 0) {
      window.alert('请填写大于 0 的升级目标')
      return
    }

    if (consecutiveDays <= 0) {
      window.alert('连续天数必须大于 0')
      return
    }
  }

  if (trimmedName || editingRate > 0) {
    localLevels.value = localLevels.value.map(item => {
      if (item.id !== currentEditLevel.value?.id) return item

      const nextRule: LevelRule = isEntrySlot
        ? {
            enabled: false,
            metric: 'sales',
            period: 'daily',
            targetValue: 0,
            consecutiveDays: 0,
          }
        : {
            ...editorForm.value.rule,
            enabled: true,
          }

      return {
        ...item,
        name: trimmedName,
        rate: Number(editorForm.value.rate || 0),
        is_entry: isEntrySlot,
        rule: nextRule,
        upgrade_condition: isEntrySlot
          ? null
          : {
              days: Number(nextRule.consecutiveDays || 0),
              daily_amount: nextRule.metric === 'sales' ? Number(nextRule.targetValue || 0) : 0,
              orders: nextRule.metric === 'orders' ? Number(nextRule.targetValue || 0) : 0,
              metric_type: nextRule.metric || 'sales',
              period_type: nextRule.period || 'daily',
            },
      }
    })
  }

  refreshDecorations()

  const nextTeamByLevel = (levels.value?.team_by_level || []).map(group => {
    const match = localLevels.value.find(level => level.id === group.level_id)
    if (!match) return group
    return {
      ...group,
      level_name: levelDisplayName(match),
      rate: match.rate,
    }
  })

  const entryLevel = localLevels.value.find(item => item.slot === 'entry')
  const middleLevel = localLevels.value.find(item => item.slot === 'middle')
  const topLevel = localLevels.value.find(item => item.slot === 'top')

  const payloadLevels = [entryLevel, middleLevel, topLevel]
    .filter((item): item is LevelItem => Boolean(item))
    .filter(item => item.slot === 'entry' || isLevelConfigured(item))
    .map(item => ({
      ...item,
      is_entry: item.slot === 'entry',
      rule: { ...normalizeRule(item) },
      upgrade_condition: item.slot === 'entry'
      ? {
          days: 0,
          daily_amount: 0,
          orders: 0,
          metric_type: 'sales',
          period_type: 'daily',
        }
        : {
            days: Number(normalizeRule(item).consecutiveDays || 0),
            daily_amount: normalizeRule(item).metric === 'sales' ? Number(normalizeRule(item).targetValue || 0) : 0,
            orders: normalizeRule(item).metric === 'orders' ? Number(normalizeRule(item).targetValue || 0) : 0,
            metric_type: normalizeRule(item).metric || 'sales',
            period_type: normalizeRule(item).period || 'daily',
          },
    }))

  await handleLevelsSave({
    ...levels.value,
    entry_rate: Number(entryLevel?.rate || 0),
    levels: payloadLevels,
    team_by_level: nextTeamByLevel,
  })
}

const changeStatsPeriod = async (period: StatsPeriod) => {
  if (statsPeriod.value === period && statsTrend.value.length) return
  await loadStats(period)
}

const copyPromotionLink = async () => {
  const text = promotionLinkText.value === '--' ? '' : promotionLinkText.value
  if (!text) return

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    window.alert('推广链接已复制')
  } catch (error) {
    console.error('复制推广链接失败:', error)
  }
}

const getTrendPointPosition = (index: number, length: number, amount: number) => {
  if (length <= 1) return { left: 0, top: 50 }
  const maxAmount = Math.max(...statsTrend.value.map(item => item.amount), 0)
  const minTop = 18
  const maxTop = 82
  const progress = maxAmount > 0 ? amount / maxAmount : 0

  return {
    left: (index / (length - 1)) * 100,
    top: maxTop - progress * (maxTop - minTop),
  }
}

const getTrendPointStyle = (index: number, length: number, amount: number) => {
  const position = getTrendPointPosition(index, length, amount)
  return {
    left: `${position.left}%`,
    top: `${position.top}%`,
  }
}

// 图片上传
const groupImageInput = ref<HTMLInputElement | null>(null)
const uploadingGroupImage = ref(false)

const handleGroupImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  try {
    uploadingGroupImage.value = true
    const formData = new FormData()
    formData.append('file', file)
    formData.append('scene', 'common')
    const { userApi } = await import('../api/client')
    const res = await userApi.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    const url = res.data?.data?.url || res.data?.url || ''
    if (url) {
      contactInfo.value.group_image_url = url
      window.alert('图片上传成功')
    }
  } catch (error) {
    console.error('上传图片失败:', error)
    window.alert('上传失败，请稍后重试')
  } finally {
    uploadingGroupImage.value = false
    if (groupImageInput.value) groupImageInput.value.value = ''
  }
}

const selectedOrderDetail = ref<OrderItem | null>(null)
const expandedPartnerId = ref<number | null>(null)
const expandedSettlementId = ref<number | null>(null)

const togglePartnerDetail = (partnerId: number) => {
  expandedPartnerId.value = expandedPartnerId.value === partnerId ? null : partnerId
  if (expandedPartnerId.value === partnerId) loadPartnerDetail(partnerId)
}

const toggleSettlementDetail = (settlementId: number) => {
  expandedSettlementId.value = expandedSettlementId.value === settlementId ? null : settlementId
  if (expandedSettlementId.value === settlementId) loadSettlementDetail(settlementId)
}

// 查看订单详情（低风险版本：升级为正式弹层）
const viewOrderDetail = async (item: OrderItem) => {
  selectedOrderDetail.value = item
  await reloadSelectedOrderCommissionDetail()
}

const closeOrderDetail = () => {
  selectedOrderDetail.value = null
  orderCommissionDetail.value = null
}

// 导出 Excel（纯前端，无需依赖库，生成 CSV 格式）
const exportSettlementExcel = () => {
  const items = filteredSettlementItems.value
  if (!items.length) {
    window.alert('暂无数据可导出')
    return
  }
  const headers = ['推广码', '伙伴', '自己销售', '团队销售', '总销售', '自己订单', '团队订单', '待结算', '已结算', '结算日期']
  const rows = items.map(item => [
    item.code,
    item.email,
    item.self_sales,
    item.team_sales,
    item.total_sales,
    item.self_orders,
    item.team_orders,
    item.net_settlement,
    item.original_settlement,
    settlement.value.date || settleDate.value,
  ])
  const csv = [headers, ...rows].map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
  const bom = '\uFEFF'
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `订单结算_${settleDate.value}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// 伙伴分页
const partnerPage = ref(1)
const changePartnerPage = async (page: number) => {
  const total = Array.isArray(partners.value) ? partners.value.length : 0
  const pageSize = 20
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  if (page < 1 || page > totalPages) return
  partnerPage.value = page
  try {
    const res = await zhengyeAPI.getPartners({
      page,
      page_size: pageSize,
      ...(partnerKeyword.value ? { keyword: partnerKeyword.value } : {}),
    })
    partners.value = Array.isArray(res) ? res : (res as any)?.items ?? res
  } catch (error) {
    console.error('加载 partners 失败:', error)
  }
}

// 订单分页
const orderPage = ref(1)
const orderPageSize = 20
const orderTotal = ref(0)
const changeOrderPage = async (page: number) => {
  const totalPages = Math.max(1, Math.ceil(orderTotal.value / orderPageSize))
  if (page < 1 || page > totalPages) return
  orderPage.value = page
  try {
    const res = await zhengyeAPI.getOrders({
      page,
      page_size: orderPageSize,
      ...(orderKeyword.value ? { keyword: orderKeyword.value } : {}),
      ...(orderStatus.value !== '全部' ? { status: orderStatus.value } : {}),
      ...(orderSource.value !== '全部' ? { source: orderSource.value } : {}),
    })
    orders.value = Array.isArray(res) ? res : (res as any)?.items ?? res
    orderTotal.value = (res as any)?.total ?? orders.value.length
  } catch (error) {
    console.error('加载 orders 失败:', error)
  }
}

// 结算分页
const settlementPage = ref(1)
const changeSettlementPage = async (page: number) => {
  const totalPages = Math.max(1, Math.ceil((settlement.value.total || filteredSettlementItems.value.length) / (settlement.value.page_size || 20)))
  if (page < 1 || page > totalPages) return
  settlementPage.value = page
  try {
    settlement.value = await zhengyeAPI.getSettlement({
      date: settleDate.value,
      page,
      page_size: settlement.value.page_size || 20,
      ...(settlementKeyword.value ? { keyword: settlementKeyword.value } : {}),
    })
  } catch (error) {
    console.error('加载 settlement 失败:', error)
  }
}

// 团队分页
const teamPage = ref(1)
const changeTeamPage = async (page: number) => {
  const totalPages = Math.max(1, Math.ceil((team.value.total || filteredTeamMembers.value.length) / (team.value.page_size || 20)))
  if (page < 1 || page > totalPages) return
  teamPage.value = page
  try {
    team.value = await zhengyeAPI.getTeam({
      page,
      page_size: team.value.page_size || 20,
      ...(teamKeyword.value ? { keyword: teamKeyword.value } : {}),
    })
  } catch (error) {
    console.error('加载 team 失败:', error)
  }
}

onMounted(() => {
  loadDashboard()
  loadStats()
  loadRank()
  loadContact()
  loadDiscount()
  loadLevels()
  loadPartners()
  loadTeam()
  loadSettlement()
  loadOrders()
  loadBalanceData()
  loadWithdrawData()
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #f5f7fa;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.distributor-page {
  width: 100%;
  min-height: 100vh;
  padding-top: 6rem;
  background: #f5f7fa;
}
.layout {
  display: flex;
  min-height: calc(100vh - 6rem);
}

/* 左侧侧边栏 */
.sidebar {
  width: 180px;
  background: #fff;
  border-radius: 20px;
  margin: 10px;
  padding: 10px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
.menu-list {
  display: flex;
  flex-direction: column;
}
.menu-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  border-radius: 12px;
  margin: 2px 8px;
  transition: all 0.2s;
}
.menu-item.active {
  background: #007bff;
  color: #fff;
}
.menu-item:hover {
  background: #f0f2f5;
}
.menu-item.active:hover {
  background: #0069d9;
}

/* 右侧内容 */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
.page-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
}
.page-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}
.page-header {
  margin-bottom: 20px;
}
.page-header h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}
.page-header p {
  font-size: 14px;
  color: #666;
}

.top-banner {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) 400px;
  gap: 24px;
  margin-bottom: 20px;
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(180deg, #f7fbff 0%, #eef5fb 100%);
  border: 1px solid #e5edf7;
}

.top-banner__hero {
  min-width: 0;
}

.top-banner__slogan {
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: 700;
  color: #1b6fb8;
}

.top-banner__hero h2 {
  margin-bottom: 10px;
  font-size: 34px;
  line-height: 1.25;
  font-weight: 800;
  color: #1f2937;
}

.top-banner__hero > p {
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.7;
  color: #2f3a4a;
}

.top-banner__guide {
  margin-top: 24px;
}

.top-banner__guide p {
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 1.8;
  color: #4b5563;
}

.top-banner__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.promo-side-card {
  border-radius: 20px;
  box-shadow: 0 8px 26px rgba(15, 23, 42, 0.06);
}

.promo-inline-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.promo-inline-code {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 14px;
  border: 2px solid #d2dbe7;
  border-radius: 12px;
  background: #fff;
  font-size: 26px;
  font-weight: 800;
  color: #3a4351;
}

/* 通用样式 */
.mb-20 {
  margin-bottom: 20px;
}
.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}
.gap-5 {
  gap: 5px;
}
.gap-10 {
  gap: 10px;
}
.gap-20 {
  gap: 20px;
}
.text-sm {
  font-size: 12px;
}
.text-gray {
  color: #666;
}
.text-red {
  color: #dc3545;
}
.text-green {
  color: #28a745;
}
.text-orange {
  color: #fd7e14;
}
.text-blue {
  color: #007bff;
}
.text-center {
  text-align: center;
}
.text-lg {
  font-size: 18px;
  font-weight: 500;
}

/* 卡片 */
.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
.card-header {
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
}
.card h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
}
.success-card {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 1px solid #c3e6cb;
  text-align: center;
}
.success-card h3 {
  font-size: 28px;
  font-weight: 600;
  color: #155724;
  margin: 10px 0;
}
.yellow-card {
  border: 1px solid #ffeeba;
  background: #fff3cd;
}
.yellow-card .value {
  color: #856404;
}

/* 网格 */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.grid-6 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}
.grid-10 {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 12px;
}

/* 统计项 */
.stat-item {
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #f8f9fa;
}
.stat-item.highlight {
  background: #fff3cd;
}
.stat-item.success {
  background: #d4edda;
}
.stat-item.warning {
  background: #fff3cd;
}
.stat-item .label {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
}
.stat-item .value {
  font-size: 18px;
  font-weight: 600;
}
.tip {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  margin-top: 8px;
}
.tip.blue {
  background: #cce5ff;
  padding: 8px;
  border-radius: 6px;
  color: #004085;
}

/* 步骤 */
.step-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #007bff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.step-content h4 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}
.step-content p {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

/* 链接项 */
.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 8px;
  cursor: pointer;
}
.link-item:hover {
  background: #e9ecef;
}

/* 按钮 */
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary {
  background: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background: #0069d9;
}
.btn-default {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
}
.btn-default:hover {
  background: #e9ecef;
}
.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}
.btn-block {
  width: 100%;
}

/* 标签 */
.tag {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 4px;
}
.tag.green {
  background: #d4edda;
  color: #155724;
}
.tag.red {
  background: #f8d7da;
  color: #721c24;
}
.tag.blue {
  background: #cce5ff;
  color: #004085;
}
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}
.dot.red {
  background: #dc3545;
}

/* 提示框 */
.alert {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
}
.alert h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}
.alert p {
  font-size: 14px;
  line-height: 1.5;
}
.alert-gray {
  background: #e9ecef;
  border: 1px solid #dee2e6;
}
.alert-blue {
  background: #cce5ff;
  border: 1px solid #b8daff;
  color: #004085;
}
.alert-red {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

/* 表单 */
.form-item {
  margin-bottom: 20px;
}
.form-item label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}
.form-item input,
.form-item textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}
.form-item input:focus,
.form-item textarea:focus {
  border-color: #007bff;
}
.form-tip {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}
.upload-placeholder {
  padding: 20px;
  border: 1px dashed #dee2e6;
  border-radius: 8px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.preview-box {
  padding: 16px;
  border: 1px dashed #dee2e6;
  border-radius: 8px;
}
.preview-label {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}
.current-discount {
  padding: 10px 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

/* 进度条 */
.progress-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.progress-label {
  width: 60px;
  font-size: 13px;
  color: #666;
}
.progress-track {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 4px;
}
.progress-fill.blue {
  background: #007bff;
}
.progress-fill.gray {
  background: #6c757d;
}
.progress-value {
  width: 60px;
  text-align: right;
  font-size: 13px;
  font-weight: 500;
}

/* 开关卡片 */
.switch-card {
  padding: 16px;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  margin-bottom: 20px;
}
.switch-card h4 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}
.switch-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}
.status-box {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 13px;
  color: #666;
}

/* 等级项 */
.level-item {
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.level-item.active {
  border-color: #007bff;
  background: #f0f7ff;
}
.level-item.yellow {
  border-color: #ffc107;
  background: #fff3cd;
}
.level-item.gray {
  border-color: #6c757d;
  background: #f8f9fa;
}
.level-icon {
  font-size: 20px;
  margin-right: 10px;
}
.level-info {
  flex: 1;
}
.level-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}
.level-desc {
  font-size: 12px;
  color: #666;
}
.level-condition {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}
.level-count {
  font-size: 14px;
  font-weight: 500;
  color: #007bff;
}
.level-editor {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #d7dbe0;
}

.level-editor-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.level-editor-row label {
  font-size: 12px;
  color: #666;
}

.level-editor-row input {
  width: 120px;
  padding: 6px 10px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 12px;
}

.level-editor-actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.level-tip {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 8px;
}
.level-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.team-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #dee2e6;
}

.team-item:last-of-type {
  border-bottom: none;
}

.team-item .info {
  flex: 1;
}

.team-item .name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.team-item .desc {
  font-size: 12px;
  color: #666;
}

.empty-tip {
  padding: 16px 0;
  text-align: center;
  font-size: 13px;
  color: #999;
}

.promo-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.promo-card__block {
  min-width: 0;
}

.promo-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.promo-line--column {
  display: block;
}

.promo-label {
  font-size: 13px;
  color: #666;
}

.promo-link-box {
  margin-top: 8px;
  padding: 12px;
  border-radius: 10px;
  background: #f8f9fa;
  word-break: break-all;
  color: #333;
  font-size: 13px;
}

.parent-contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 14px;
}

.contact-label {
  font-weight: 600;
  color: #495057;
  min-width: 60px;
  flex-shrink: 0;
}

.contact-value {
  color: #212529;
  word-break: break-word;
}

.contact-announcement {
  padding: 12px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
}

.announcement-label {
  font-weight: 600;
  color: #856404;
  margin-bottom: 8px;
  font-size: 14px;
}

.announcement-content {
  color: #856404;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.partner-detail-row td {
  background: #fafbff;
}

.partner-detail-panel {
  padding: 8px 0;
}

.partner-detail-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.partner-detail-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
}

.partner-detail-item .label {
  color: #666;
  font-size: 12px;
  margin-bottom: 8px;
}

.partner-detail-item .value {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.detail-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.detail-modal {
  width: min(920px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 18px;
  padding: 20px;
}

.detail-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.detail-modal__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.detail-modal__item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-modal__item span {
  color: #666;
  font-size: 12px;
}

.detail-modal__commission {
  margin-top: 16px;
}

@media (max-width: 960px) {
  .top-banner {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .top-banner__hero h2 {
    font-size: 28px;
  }

  .promo-card,
  .partner-detail-grid,
  .detail-modal__grid {
    grid-template-columns: 1fr;
  }
}

/* 团队总结 */
.team-summary {
  padding: 20px;
  background: #e3f2fd;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
}
.team-summary h3 {
  font-size: 28px;
  font-weight: 600;
  color: #0d47a1;
  margin-top: 8px;
}

/* 头像 */
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #007bff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

/* 表格 */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
}
.table th {
  background: #f8f9fa;
  font-weight: 500;
}
.total-row {
  background: #f8f9fa;
  font-weight: 500;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-size: 14px;
  color: #666;
}

/* 标签页 */
.tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 12px;
}
.tab {
  padding: 8px 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
}
.tab.active {
  background: #007bff;
  color: #fff;
}

/* 排行榜 */
.rank-bar {
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  margin-top: 12px;
  position: relative;
}
.rank-item {
  position: absolute;
  top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #fff;
}
.rank-item.orange {
  background: #fd7e14;
  left: 10%;
}
.rank-item.gray {
  background: #6c757d;
  left: 25%;
}
.rank-item.blue {
  background: #007bff;
  left: 40%;
}
.rank-item.green {
  background: #28a745;
  left: 10%;
}
.rank-item.purple {
  background: #6f42c1;
  left: 25%;
}
.rank-item.red {
  background: #dc3545;
  left: 40%;
}
.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  margin: 40px 0;
}
.podium-item {
  text-align: center;
}
.podium-item.first {
  transform: translateY(-20px);
}
.podium-item .rank {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffc107;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto 8px;
}
.podium-item:nth-child(1) .rank {
  background: #6c757d;
}
.podium-item:nth-child(3) .rank {
  background: #cd7f32;
}
.podium-item .name {
  font-size: 14px;
  margin-bottom: 4px;
}
.podium-item .amount {
  font-size: 16px;
  font-weight: 500;
}
.my-rank {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}
.my-rank h4 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}
.rank-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
}
.rank-row:last-child {
  border-bottom: none;
}
.rank-tip {
  padding: 8px;
  background: #fff3cd;
  border-radius: 6px;
  font-size: 12px;
  color: #856404;
  margin: 12px 0;
}

/* 图表占位 */
.chart-placeholder {
  min-height: 260px;
  position: relative;
}

.chart-surface {
  position: relative;
  height: 210px;
  margin: 12px 8px 0;
  border-radius: 18px;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  overflow: hidden;
}

.chart-grid {
  position: absolute;
  inset: 16px 0 20px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
}

.chart-grid span {
  border-top: 1px dashed #d9e4f2;
}

.chart-grid span:last-child {
  border-bottom: 1px dashed #d9e4f2;
}

.chart-polyline,
.chart-points {
  position: absolute;
  inset: 0 12px 0 12px;
}

.chart-segment {
  position: absolute;
  height: 3px;
  transform-origin: left center;
  background: linear-gradient(90deg, #7eb8ff 0%, #1677ff 100%);
  box-shadow: 0 0 0 1px rgba(22, 119, 255, 0.05);
}

.point {
  position: absolute;
  transform: translate(-50%, -50%);
}

.point-dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1677ff;
  border: 2px solid #fff;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.35);
}

.point-value {
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #1677ff;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.chart-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 210px;
  margin: 12px 8px 0;
  border-radius: 18px;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  color: #93a1b2;
  font-size: 14px;
}

.chart-x {
  display: flex;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 20px 0;
  font-size: 12px;
  color: #666;
}

.chart-x span {
  flex: 1;
  min-width: 0;
  text-align: center;
  word-break: break-all;
}

.chart-x--empty {
  display: none;
}

.level-config-card {
  overflow: hidden;
  padding: 24px 20px 20px;
  border-radius: 28px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.05);
}

.levels-empty-state {
  margin-top: 20px;
  padding: 56px 20px;
  border: 3px dashed #ffc72b;
  border-radius: 28px;
  text-align: center;
  background: linear-gradient(180deg, #fffdf5 0%, #fff9ea 100%);
}

.levels-empty-icon {
  font-size: 54px;
  margin-bottom: 8px;
}

.levels-empty-state h4 {
  font-size: 22px;
  margin-bottom: 8px;
  color: #1f2937;
}

.levels-empty-state p {
  color: #8b8b8b;
  font-size: 16px;
  margin-bottom: 24px;
}

.empty-add-btn {
  height: 56px;
  padding: 0 34px;
  border-radius: 18px;
  font-size: 18px;
  font-weight: 700;
}

.levels-board {
  position: relative;
  display: flex;
  gap: 18px;
  margin-top: 18px;
  padding: 10px 0 0 52px;
}

.level-axis {
  position: absolute;
  left: 0;
  top: 118px;
  width: 32px;
  color: #f08a19;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 1px;
}

.level-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.level-item {
  position: relative;
  overflow: hidden;
  padding: 18px 20px 16px;
  border: 2px solid #d8dee6;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 3px 12px rgba(15, 23, 42, 0.04);
  transition: all 0.2s ease;
}

.level-item.theme-gold {
  width: 48%;
  margin-left: 24%;
}

.level-item.theme-silver,
.level-item.theme-blue {
  width: 72%;
  margin-left: 12%;
}

.level-item.theme-bronze,
.level-item.theme-purple {
  width: 100%;
}

.level-item.has-actions {
  padding-top: 48px;
}

.level-item.active {
  transform: translateY(-1px);
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
}

.level-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.level-rank-chip {
  position: absolute;
  top: 16px;
  right: 18px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 11px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.level-main {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.level-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  font-size: 28px;
  line-height: 1;
}

.level-info {
  flex: 1;
  padding-right: 86px;
}

.level-name-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.level-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--level-text, #2b2b2b);
}

.level-profit {
  color: var(--level-profit, #0f8f72);
  font-size: 16px;
  font-weight: 700;
}

.level-desc {
  font-size: 12px;
  color: rgba(34, 34, 34, 0.52);
  line-height: 1.55;
}

.level-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.68);
  color: var(--level-text, #333);
  font-size: 12px;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.42);
}

.meta-pill-soft {
  background: rgba(255, 255, 255, 0.45);
  color: rgba(34, 34, 34, 0.72);
  font-weight: 600;
}

.badge {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-blue {
  background: #dff1ff;
  color: #1b7fcc;
}

.badge-blue-light {
  background: #e5f3ff;
  color: #2f85d0;
}

.badge-green {
  background: #d8f4dd;
  color: #2e9c5b;
}

.level-actions {
  position: absolute;
  top: 12px;
  right: 14px;
  bottom: auto;
  z-index: 3;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: calc(100% - 36px);
}

.action-chip {
  height: 33px;
  padding: 0 13px;
  border: 2px solid #a0a0a0;
  border-radius: 999px;
  background: #fff;
  color: #4b5563;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
}

.action-chip-active {
  color: #111827;
  background: #f4f5f7;
}

.action-chip-danger {
  color: #dc2626;
}

.level-tip {
  margin-top: 12px;
  text-align: center;
  color: #8a8a8a;
  font-size: 12px;
}

.team-total-line {
  margin-top: 14px;
  padding: 16px 20px;
  border: 1px solid #edf0f4;
  border-radius: 20px;
  background: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #444;
}

.editor-panel {
  margin-top: 20px;
  padding: 20px 22px;
  border: 3px solid #ffc61a;
  border-radius: 22px;
  background: linear-gradient(180deg, #fffdf5 0%, #fffdf8 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 198, 26, 0.08);
}

.editor-panel h4 {
  margin-bottom: 14px;
  font-size: 16px;
}

.editor-section {
  margin-bottom: 18px;
}

.editor-section label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #707070;
}

.editor-input {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #edf1f6;
  border-radius: 3px;
  background: #fff;
  font-size: 16px;
  box-shadow: inset 0 0 0 1px rgba(240, 244, 248, 0.8);
}

.editor-input:focus {
  border-color: #90c2f8;
}

.money-input-wrap {
  position: relative;
}

.money-input {
  padding-left: 28px;
  padding-right: 90px;
}

.prefix,
.suffix-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 16px;
}

.prefix {
  left: 10px;
}

.suffix-right {
  right: 12px;
}

.entry-check {
  margin-bottom: 14px;
  font-size: 16px;
}

.entry-tip-box {
  margin-bottom: 14px;
  padding: 16px;
  border-radius: 12px;
  background: #edfdf4;
  color: #68866d;
  border: 1px solid #daf4e3;
}

.rule-panel {
  padding: 18px;
  border: 1px solid #efe7d2;
  border-radius: 16px;
  background: #fff;
}

.rule-panel h5 {
  margin-bottom: 18px;
  font-size: 18px;
}

.option-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.option-chip {
  min-width: 88px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #d4d7dd;
  border-radius: 12px;
  background: #f5f6fa;
  font-size: 15px;
  color: #444;
  font-weight: 600;
}

.option-chip.active {
  border-color: #f7b500;
  background: #fffaf0;
  color: #202020;
  box-shadow: inset 0 0 0 1px #f7b500;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.editor-footer-right {
  display: flex;
  gap: 10px;
}

.btn-danger-outline {
  border: 2px solid #ff6d8f;
  color: #ff3355;
  background: #fff;
  border-radius: 14px;
}

.btn-default,
.btn-primary {
  min-width: 88px;
  border-radius: 14px;
}

.btn-default {
  border: 1px solid #d8dde7;
  background: #f3f5f9;
  color: #444;
}

.btn-primary {
  background: linear-gradient(180deg, #2491ff 0%, #0d6efd 100%);
  box-shadow: 0 10px 22px rgba(13, 110, 253, 0.18);
}

@media (max-width: 768px) {
  .levels-board {
    gap: 12px;
    padding-left: 30px;
  }

  .level-axis {
    width: 24px;
    font-size: 12px;
  }

  .level-item,
  .level-item.theme-gold,
  .level-item.theme-silver,
  .level-item.theme-blue,
  .level-item.theme-bronze,
  .level-item.theme-purple {
    width: 100%;
    margin-left: 0;
    padding: 20px 16px 16px;
    border-radius: 22px;
  }

  .level-item.has-actions {
    padding-bottom: 88px;
  }

  .level-info {
    padding-right: 0;
  }

  .level-rank-chip {
    position: static;
    margin-bottom: 12px;
    width: fit-content;
  }

  .level-main {
    flex-direction: column;
  }

  .level-actions {
    left: 16px;
    right: 16px;
    justify-content: flex-start;
  }
}
</style>
        