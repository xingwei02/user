# Token 商三态前端规则记录（2026-04-19）

## 背景

本文件记录 user 前端对 Token 商三态访问规则的最终对齐结论，方便后续继续开发路由守卫、宣传页、正业页时作为直接依据。

## 1. 三态访问规则

1. 游客
   - 不能访问 `/token-merchant-v2`
   - 不能访问 `/zhengye`
2. 注册客户
   - 可以访问 `/token-merchant-v2`
   - 不能访问 `/zhengye`
   - 可以在宣传页申请成为 Token 商
3. Token 商
   - 可以访问 `/token-merchant-v2`
   - 可以访问 `/zhengye`

## 2. 路由行为约定

### `/token-merchant-v2`

- 未登录：不可访问
- 已登录普通注册客户：允许访问
- 已登录 Token 商：允许访问，并可继续进入 `/zhengye`

### `/zhengye`

- 未登录：跳登录
- 非 Token 商：跳转 `/token-merchant-v2`
- Token 商：允许进入

## 3. `merchant_page_enabled` 的前端解释

该字段只在“命中某个 Token 商推广归因”的情况下生效。

即：

- 普通自然流量注册客户，不应因没有 `affiliate_code` 被拦截
- 命中某个 Token 商推广归因的注册客户，才继续受该商户自己的 `merchant_page_enabled` 开关控制
- 已经成为 Token 商的用户，不因该字段关闭而失去 `/zhengye` 权限

## 4. 本轮修正点

1. 修正了“注册客户必须带 affiliate code 才能看宣传页”的错误实现
2. 修正了“非 Token 商访问 `/zhengye` 的跳转逻辑”
3. 将页面逻辑与后端 `affiliate_discounts` 语义重新对齐

## 5. 后续开发注意事项

后续若继续改：

- `user/src/router/index.ts`
- `user/src/views/affiliate/TokenMerchantGuestV2.vue`
- `user/src/views/zhengye.vue`

默认先回看本文件，避免把三态逻辑改回旧版本。