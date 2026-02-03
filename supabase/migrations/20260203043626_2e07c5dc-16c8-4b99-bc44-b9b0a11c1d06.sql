-- Função para incrementar contagem de cliques
CREATE OR REPLACE FUNCTION public.increment_click_count(link_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.links 
  SET click_count = click_count + 1 
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;