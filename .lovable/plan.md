
Objetivo
- Corrigir o bug que está duplicando a mensagem do WhatsApp (ficando “Olá... ?text=Olá...”) nos dois botões de WhatsApp.

O que está acontecendo (causa raiz)
- No banco de dados, os dois links de WhatsApp já estão salvos assim:
  - https://wa.me/5511941711858?text=Olá, vim do Instagram, gostaria de ser atendido.
- No código (src/pages/Index.tsx), quando detecta wa.me ele monta novamente a URL adicionando `?text=...`:
  - `${url}?text=${message}`
- Resultado: a URL final fica com dois “?text”, por exemplo:
  - https://wa.me/... ?text=Olá... ?text=Olá...
  - O WhatsApp interpreta o segundo “?text=...” como parte do texto da mensagem, então a mensagem aparece “duplicada”.

Plano de correção (sem mudar o visual)
1) Ajustar o clique do WhatsApp para nunca “duplicar” parâmetros
- Arquivo: src/pages/Index.tsx
- Mudança:
  - Em vez de concatenar string com `?text=`, vamos usar `URL` + `URLSearchParams`:
    - Criar um `urlObj = new URL(url)`
    - `urlObj.searchParams.set("text", settings.whatsapp_message)`
    - Isso substitui qualquer `text` existente (não duplica) e já faz o encode corretamente.
  - Se por algum motivo o link no banco vier sem protocolo, garantir `https://` (fallback simples).
- Importante:
  - Quando for WhatsApp e a gente fizer `window.open(...)`, precisamos impedir o clique padrão do `<a>` para não abrir duas abas ou navegar pelo href.
  - Para isso vamos passar o evento de clique para a função e chamar `event.preventDefault()`.

2) Permitir que o LinkButton repasse o evento de clique (para podermos dar preventDefault no WhatsApp)
- Arquivo: src/components/links/LinkButton.tsx
- Mudança:
  - Alterar o tipo de `onClick` para receber o evento: `onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void`
  - No `handleClick`, chamar `onClick?.(e)` (passando o evento).
  - Manter o tracking (Google Analytics + contador) como está, mas permitindo que o handler do WhatsApp cancele a navegação padrão.

3) Atualizar o handler do WhatsApp para cancelar o clique padrão e abrir somente a URL correta
- Arquivo: src/pages/Index.tsx
- Mudança:
  - Alterar `handleLinkClick` para receber também o evento:
    - `handleLinkClick(e, linkId, url)`
  - Sempre registrar o clique no banco (`trackClick.mutate(linkId)`).
  - Se for WhatsApp e existir `settings.whatsapp_message`:
    - `e.preventDefault()`
    - Montar a URL via `URL(...)` e `searchParams.set("text", settings.whatsapp_message)`
    - `window.open(finalUrl, "_blank", "noopener,noreferrer")`

4) (Recomendado) “Limpar” os dois links no banco para não carregar `?text=` no campo URL
- Motivação:
  - Mesmo com o código corrigido, deixar o banco “limpo” evita confusões futuras e deixa o admin mais organizado.
- Ajuste de banco (1 comando):
  - Atualizar os links de WhatsApp para remover tudo depois de “?”:
    - Ex.: transformar `https://wa.me/5511941711858?text=...` em `https://wa.me/5511941711858`
- Observação:
  - Isso não muda nada para o usuário final, porque o texto continuará sendo aplicado pelo código na hora do clique.

Critérios de aceite (como você vai validar)
- Na página “/”, clique em “Atendimento Loja SP”:
  - O WhatsApp deve abrir com a mensagem exatamente: “Olá, vim do Instagram, gostaria de ser atendido.”
  - A mensagem não pode conter “?text=...”
- Repetir o teste em “Atendimento Loja D”.
- Confirmar que:
  - Abre apenas uma aba/janela (não duplica abertura).
  - O contador de cliques continua incrementando normalmente.

Riscos e cuidados
- Se o link de WhatsApp no banco estiver sem “https://”, `new URL(url)` pode falhar. Vamos tratar com um fallback simples para garantir robustez.
- Manteremos o comportamento atual de não adicionar UTM em links do WhatsApp (já existe no src/lib/utm.ts e está correto).

Arquivos envolvidos
- src/components/links/LinkButton.tsx (repassar evento de clique)
- src/pages/Index.tsx (construção correta da URL do WhatsApp + preventDefault)
- Banco de dados: tabela `links` (opcional/recomendado: remover `?text=` das URLs já salvas)

