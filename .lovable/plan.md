

# Plano de Redesign - Estilo "Romani Alianças"

## O que vamos fazer

Vamos transformar sua página de links para seguir o visual elegante da imagem de referência, com:

1. **Imagem grande no topo** - A foto das alianças douradas que você enviou
2. **Fundo na cor das alianças** - Tom marrom/bege inspirado na imagem
3. **Nome e descrição** - Logo abaixo da imagem do topo
4. **Card com efeito 3D** - Mantendo a profundidade que você pediu anteriormente

## Visual Final

O layout ficará assim:
- Fundo sólido em tom marrom/bege elegante (inspirado nas cores da foto)
- Imagem da aliança ocupando a parte superior
- Nome "InLove Store" centralizado com selo de verificado
- Bio/descrição logo abaixo
- Botões de links com estilo refinado
- Ícones sociais no rodapé

## Etapas de Implementação

### 1. Adicionar a Imagem da Aliança ao Projeto
- Copiar a foto das alianças douradas para a pasta de assets
- Será usada como imagem de destaque no topo

### 2. Atualizar as Cores do Tema
- Mudar o fundo da página para um tom marrom/bege sólido (similar à imagem de referência)
- Ajustar variáveis CSS para harmonizar com a foto dourada

### 3. Criar Componente de Imagem do Topo
- Novo componente `HeroImage` que exibe a foto da aliança
- Imagem com cantos arredondados
- Ocupando boa parte da largura do card

### 4. Reorganizar o Layout Principal
- Remover o componente `DecorativeBackground` (diamantes e anéis espalhados)
- Estrutura: Imagem → Nome → Bio → Links → Redes Sociais → Rodapé
- Manter o efeito 3D do card principal

### 5. Ajustar o ProfileSection
- Posicionar abaixo da imagem
- Texto em cor clara para contrastar com o fundo escuro

---

**Detalhes Técnicos**

Arquivos que serão modificados:
- `src/index.css` - Novas variáveis de cor (marrom/bege)
- `src/pages/Index.tsx` - Nova estrutura com imagem no topo
- `src/components/links/ProfileSection.tsx` - Ajuste de cores do texto
- Novo arquivo: `src/components/links/HeroImage.tsx`
- Remover: `src/components/links/DecorativeBackground.tsx`

