const LINK_PREVIEW_BOT_RE =
  /telegrambot|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|vkshare|googlebot|bingbot|yandexbot|crawler|spider|bot/i

export function isLinkPreviewBot(userAgent: string | undefined): boolean {
  if (!userAgent) {
    return false
  }

  return LINK_PREVIEW_BOT_RE.test(userAgent)
}
