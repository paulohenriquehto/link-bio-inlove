-- Tabela de links
CREATE TABLE public.links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'link',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  position INTEGER NOT NULL DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de configurações (WhatsApp, perfil, etc.)
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de redes sociais
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para leitura (qualquer pessoa pode ver os links)
CREATE POLICY "Links are viewable by everyone" 
ON public.links FOR SELECT 
USING (is_active = true);

CREATE POLICY "Settings are viewable by everyone" 
ON public.settings FOR SELECT 
USING (true);

CREATE POLICY "Social links are viewable by everyone" 
ON public.social_links FOR SELECT 
USING (is_active = true);

-- Políticas para admin (usuários autenticados podem gerenciar tudo)
CREATE POLICY "Authenticated users can manage links" 
ON public.links FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage settings" 
ON public.settings FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage social links" 
ON public.social_links FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_links_updated_at
BEFORE UPDATE ON public.links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Dados iniciais: Links do seu design
INSERT INTO public.links (title, url, icon, is_featured, position) VALUES
('Ver Nova Coleção', '#', 'sparkles', true, 1),
('Site Oficial', '#', 'globe', false, 2),
('Alianças & Joias', '#', 'gem', false, 3),
('Outlet & Promoções', '#', 'tag', false, 4),
('Atendimento WhatsApp', 'https://wa.me/5500000000000', 'message-circle', false, 5),
('Rastrear Meu Pedido', '#', 'package', false, 6);

-- Configurações iniciais
INSERT INTO public.settings (key, value) VALUES
('whatsapp_number', '5500000000000'),
('whatsapp_message', 'Olá! Vim pelo link da bio e gostaria de saber mais sobre os produtos.'),
('profile_name', 'InLove Store'),
('profile_bio', 'Moda, Alianças e Acessórios ✨\nEnviamos para todo o Brasil 🇧🇷');

-- Redes sociais iniciais
INSERT INTO public.social_links (platform, url, icon, position) VALUES
('Instagram', 'https://instagram.com/inlovestore.com.br', 'instagram', 1),
('TikTok', 'https://tiktok.com/@inlovestore', 'tiktok', 2),
('Facebook', 'https://facebook.com/inlovestore', 'facebook', 3),
('Email', 'mailto:contato@inlovestore.com.br', 'mail', 4);