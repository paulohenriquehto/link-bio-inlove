# InLove Store — Link na Bio

Link na bio estático da **InLove Store**, loja de alianças e acessórios. Desenvolvido em React + Vite + Tailwind CSS, sem backend ou banco de dados.

## Stack

- **React 18** + TypeScript
- **Vite** (bundler)
- **Tailwind CSS** + Shadcn UI
- **React Icons** (ícones)
- **React Router** (navegação)

## Rodando localmente

```bash
bun install
bun run dev
```

Acesse `http://localhost:8080`.

## Build para produção

```bash
bun run build
```

Os arquivos gerados ficam em `dist/`.

## Editando os links

Todos os links, redes sociais e textos de perfil estão centralizados em:

```
src/data/content.ts
```

Basta editar esse arquivo para alterar URLs, títulos, ícones ou adicionar novos links. Após editar, rode `bun run build` para gerar a versão atualizada.

### Estrutura do arquivo

```ts
// Texto do perfil
export const PROFILE = { name, bio }

// Botões de link
export const LINKS = [{ id, title, url, icon, isFeatured }]

// Ícones de redes sociais
export const SOCIAL_LINKS = [{ id, platform, url, icon }]
```

### Ícones disponíveis

| Valor       | Ícone exibido |
|-------------|---------------|
| `ring`      | Aliança / anel |
| `store`     | Loja / site |
| `tag`       | Promoção / outlet |
| `whatsapp`  | WhatsApp (verde) |
| `star`      | Estrela / destaque |
| `link`      | Link genérico |

## Rastreamento (Google Analytics)

Os cliques nos links e ícones sociais são enviados ao Google Analytics via `gtag` com parâmetros UTM. Nenhuma configuração extra é necessária além do script do GA já presente no `index.html`.
