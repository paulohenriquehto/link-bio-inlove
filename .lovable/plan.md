
# Plano: UTM Tracking + Google Analytics

## Objetivo
Adicionar parâmetros UTM automaticamente a todos os links para rastreamento completo no Google Analytics, seguindo o formato que você já usa no Instagram.

## O que são parâmetros UTM?
Baseado no seu exemplo do Instagram, os parâmetros UTM são:
- `utm_source` = de onde veio o clique (ex: instagram, linktree, biolink)
- `utm_medium` = tipo de mídia (ex: biosite, social)
- `utm_campaign` = nome da campanha (ex: home, colecao)
- `utm_content` = identificador do link específico (ex: link_in_bio, botao_loja)

---

## Implementação

### 1. Criar função utilitária para UTM
Criarei um helper que adiciona automaticamente os parâmetros UTM a qualquer URL:

```text
src/lib/utm.ts
├── addUtmParams(url, linkTitle) → URL com UTM
├── utm_source = "biolink_inlove"
├── utm_medium = "biosite"  
├── utm_campaign = baseado no título do link
└── utm_content = identificador único do link
```

### 2. Atualizar componentes para usar UTM

**LinkButton.tsx** - Botões principais:
- Antes de abrir o link, adicionar parâmetros UTM
- Cada botão terá seu próprio `utm_content`

**SocialIcons.tsx** - Ícones de redes sociais:
- Adicionar UTM também aos links sociais
- `utm_content` = nome da rede (instagram, tiktok, etc.)

### 3. Integrar Google Analytics

**index.html**:
- Adicionar script do Google Analytics 4 (GA4)
- Você precisará fornecer seu **ID de Medição** do GA4

**Eventos personalizados**:
- Disparar evento `click` sempre que um link for clicado
- Incluir informações do link no evento

### 4. Atualizar URLs no banco de dados

Os links que têm URLs reais (não "#") serão atualizados:

| Link | UTM Campaign | UTM Content |
|------|-------------|-------------|
| Ver Nova Coleção | colecao | botao_nova_colecao |
| Site Oficial | site | botao_site_oficial |
| Alianças & Joias | produtos | botao_aliancas |
| Outlet & Promoções | outlet | botao_outlet |
| WhatsApp SP | atendimento | whatsapp_loja_sp |
| WhatsApp DF | atendimento | whatsapp_loja_df |
| Rastrear Pedido | rastreio | botao_rastreio |

---

## O que você precisa fazer

Para completar a integração, você precisará:

1. **Fornecer as URLs reais** dos links (atualmente alguns estão como "#"):
   - Ver Nova Coleção → URL?
   - Site Oficial → URL? (provavelmente `https://www.inlovestore.com.br`)
   - Alianças & Joias → URL?
   - Outlet & Promoções → URL?
   - Rastrear Meu Pedido → URL?

2. **Fornecer seu ID do Google Analytics 4**:
   - Formato: `G-XXXXXXXXXX`
   - Encontrado em: Google Analytics → Administrador → Fluxos de dados

---

## Resultado final

Quando um cliente clicar em qualquer link, a URL ficará assim:

```
https://www.inlovestore.com.br/?utm_source=biolink_inlove&utm_medium=biosite&utm_campaign=site&utm_content=botao_site_oficial
```

No seu Google Analytics você verá:
- De qual link veio cada visita
- Quantos cliques cada botão recebe
- Taxa de conversão por fonte
- Relatórios completos de aquisição

---

## Detalhes Técnicos

### Estrutura do código UTM:
```typescript
// src/lib/utm.ts
export const addUtmParams = (url: string, linkTitle: string): string => {
  const baseParams = {
    utm_source: 'biolink_inlove',
    utm_medium: 'biosite',
    utm_campaign: getCampaignFromTitle(linkTitle),
    utm_content: getContentFromTitle(linkTitle)
  };
  // Adiciona parâmetros à URL
};
```

### Tracking de eventos no GA4:
```typescript
// Dispara quando link é clicado
gtag('event', 'link_click', {
  link_title: 'Site Oficial',
  link_url: 'https://...',
  link_category: 'site'
});
```
