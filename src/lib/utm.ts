// UTM Parameter Utilities for tracking link clicks

interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}

// Map link titles to campaign names
const campaignMap: Record<string, string> = {
  'ver nova coleção': 'colecao',
  'nova coleção': 'colecao',
  'site oficial': 'site',
  'alianças & joias': 'produtos',
  'alianças': 'produtos',
  'joias': 'produtos',
  'outlet & promoções': 'outlet',
  'outlet': 'outlet',
  'promoções': 'outlet',
  'atendimento loja sp': 'atendimento',
  'atendimento loja df': 'atendimento',
  'whatsapp': 'atendimento',
  'rastrear meu pedido': 'rastreio',
  'rastrear': 'rastreio',
};

// Map link titles to content identifiers
const contentMap: Record<string, string> = {
  'ver nova coleção': 'botao_nova_colecao',
  'nova coleção': 'botao_nova_colecao',
  'site oficial': 'botao_site_oficial',
  'alianças & joias': 'botao_aliancas',
  'alianças': 'botao_aliancas',
  'joias': 'botao_joias',
  'outlet & promoções': 'botao_outlet',
  'outlet': 'botao_outlet',
  'promoções': 'botao_promocoes',
  'atendimento loja sp': 'whatsapp_loja_sp',
  'atendimento loja df': 'whatsapp_loja_df',
  'whatsapp': 'whatsapp',
  'rastrear meu pedido': 'botao_rastreio',
  'rastrear': 'botao_rastreio',
};

/**
 * Normalize a string for matching (lowercase, remove accents)
 */
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

/**
 * Get campaign name from link title
 */
const getCampaignFromTitle = (title: string): string => {
  const normalized = normalizeString(title);
  
  // Check exact match first
  if (campaignMap[normalized]) {
    return campaignMap[normalized];
  }
  
  // Check partial matches
  for (const [key, value] of Object.entries(campaignMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  // Default: create slug from title
  return normalized.replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
};

/**
 * Get content identifier from link title
 */
const getContentFromTitle = (title: string): string => {
  const normalized = normalizeString(title);
  
  // Check exact match first
  if (contentMap[normalized]) {
    return contentMap[normalized];
  }
  
  // Check partial matches
  for (const [key, value] of Object.entries(contentMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  // Default: create slug from title
  return 'botao_' + normalized.replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
};

/**
 * Add UTM parameters to a URL
 */
export const addUtmParams = (url: string, linkTitle: string): string => {
  // Don't add UTM to placeholder URLs or internal links
  if (!url || url === '#' || url.startsWith('/')) {
    return url;
  }

  // For WhatsApp links, we need to handle the existing query params
  const isWhatsAppLink = url.includes('wa.me');
  
  try {
    const urlObj = new URL(url);
    
    const utmParams: UtmParams = {
      utm_source: 'biolink_inlove',
      utm_medium: 'biosite',
      utm_campaign: getCampaignFromTitle(linkTitle),
      utm_content: getContentFromTitle(linkTitle),
    };

    // Add UTM params
    Object.entries(utmParams).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });

    return urlObj.toString();
  } catch {
    // If URL parsing fails, return original
    return url;
  }
};

/**
 * Add UTM parameters specifically for social links
 */
export const addSocialUtmParams = (url: string, platform: string): string => {
  if (!url || url === '#') {
    return url;
  }

  try {
    const urlObj = new URL(url);
    
    const utmParams: UtmParams = {
      utm_source: 'biolink_inlove',
      utm_medium: 'social',
      utm_campaign: 'redes_sociais',
      utm_content: `icone_${platform.toLowerCase()}`,
    };

    Object.entries(utmParams).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });

    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Track link click in Google Analytics
 */
export const trackLinkClick = (linkTitle: string, linkUrl: string, linkCategory: string): void => {
  // Check if gtag is available (Google Analytics loaded)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag('event', 'link_click', {
      link_title: linkTitle,
      link_url: linkUrl,
      link_category: linkCategory,
      utm_source: 'biolink_inlove',
      utm_medium: 'biosite',
      utm_campaign: getCampaignFromTitle(linkTitle),
      utm_content: getContentFromTitle(linkTitle),
    });
  }
};

/**
 * Track social icon click in Google Analytics
 */
export const trackSocialClick = (platform: string, url: string): void => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag('event', 'social_click', {
      platform: platform,
      link_url: url,
      utm_source: 'biolink_inlove',
      utm_medium: 'social',
      utm_campaign: 'redes_sociais',
      utm_content: `icone_${platform.toLowerCase()}`,
    });
  }
};
