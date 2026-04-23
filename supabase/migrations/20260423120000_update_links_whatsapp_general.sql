-- Atualiza links conforme solicitação:
-- - Remove atendimento Loja DF
-- - Remove rastreio de pedido
-- - Renomeia atendimento Loja SP para atendimento geral

UPDATE public.links
SET
  title = 'Geral: Atendimento InLove',
  icon = 'message-circle',
  updated_at = now()
WHERE lower(title) = 'atendimento loja sp';

UPDATE public.links
SET
  title = 'Geral: Atendimento InLove',
  icon = 'message-circle',
  updated_at = now()
WHERE lower(title) = 'chame no whatsapp';

DELETE FROM public.links
WHERE lower(title) IN (
  'atendimento loja d',
  'atendimento loja df',
  'rastrear meu pedido'
);

-- Garante que exista apenas 1 link de atendimento geral
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY lower(title) ORDER BY position, created_at, id) AS rn
  FROM public.links
  WHERE lower(title) = 'geral: atendimento inlove'
)
DELETE FROM public.links
WHERE id IN (
  SELECT id FROM ranked WHERE rn > 1
);
