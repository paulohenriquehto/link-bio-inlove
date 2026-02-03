import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAllLinks, useSettings, useCreateLink, useUpdateLink, useDeleteLink, useUpdateSetting } from "@/hooks/useLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  Star, 
  Eye, 
  BarChart3,
  MessageCircle,
  Save,
  X,
  ExternalLink
} from "lucide-react";
import type { Link } from "@/hooks/useLinks";

const Admin = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: links, isLoading: linksLoading } = useAllLinks();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const createLink = useCreateLink();
  const updateLink = useUpdateLink();
  const deleteLink = useDeleteLink();
  const updateSetting = useUpdateSetting();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for new link form
  const [newLink, setNewLink] = useState({ title: "", url: "", icon: "link" });
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  // Initialize WhatsApp settings when loaded
  useState(() => {
    if (settings) {
      setWhatsappNumber(settings.whatsapp_number || "");
      setWhatsappMessage(settings.whatsapp_message || "");
    }
  });

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleCreateLink = async () => {
    if (!newLink.title || !newLink.url) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    try {
      await createLink.mutateAsync(newLink);
      setNewLink({ title: "", url: "", icon: "link" });
      toast({ title: "Link criado com sucesso!" });
    } catch (error: any) {
      toast({ title: "Erro ao criar link", description: error.message, variant: "destructive" });
    }
  };

  const handleUpdateLink = async (link: Link) => {
    try {
      await updateLink.mutateAsync(link);
      setEditingLink(null);
      toast({ title: "Link atualizado!" });
    } catch (error: any) {
      toast({ title: "Erro ao atualizar", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este link?")) return;

    try {
      await deleteLink.mutateAsync(id);
      toast({ title: "Link excluído!" });
    } catch (error: any) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    }
  };

  const handleToggleActive = async (link: Link) => {
    await updateLink.mutateAsync({ id: link.id, is_active: !link.is_active });
  };

  const handleToggleFeatured = async (link: Link) => {
    await updateLink.mutateAsync({ id: link.id, is_featured: !link.is_featured });
  };

  const handleSaveWhatsapp = async () => {
    try {
      await updateSetting.mutateAsync({ key: "whatsapp_number", value: whatsappNumber });
      await updateSetting.mutateAsync({ key: "whatsapp_message", value: whatsappMessage });
      toast({ title: "Configurações do WhatsApp salvas!" });
    } catch (error: any) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    }
  };

  if (authLoading || linksLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  // Calculate total clicks
  const totalClicks = links?.reduce((sum, link) => sum + (link.click_count || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Eye className="w-4 h-4 mr-2" />
              Ver Página
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Cliques</p>
                <p className="text-3xl font-bold">{totalClicks.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Link */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Adicionar Novo Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Ex: Minha Loja"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://..."
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleCreateLink} className="w-full bg-accent hover:bg-accent/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links List */}
        <Card>
          <CardHeader>
            <CardTitle>Seus Links</CardTitle>
            <CardDescription>Gerencie, ative/desative e veja analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {links?.map((link) => (
              <div
                key={link.id}
                className={`p-4 rounded-lg border ${!link.is_active ? "opacity-50 bg-muted" : "bg-card"}`}
              >
                {editingLink?.id === link.id ? (
                  // Edit mode
                  <div className="space-y-3">
                    <Input
                      value={editingLink.title}
                      onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                      placeholder="Título"
                    />
                    <Input
                      value={editingLink.url}
                      onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                      placeholder="URL"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleUpdateLink(editingLink)}>
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingLink(null)}>
                        <X className="w-4 h-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{link.title}</p>
                        {link.is_featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Click count */}
                      <span className="text-sm text-muted-foreground">
                        {link.click_count || 0} cliques
                      </span>
                      {/* Featured toggle */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFeatured(link)}
                        title="Destacar link"
                      >
                        <Star className={`w-4 h-4 ${link.is_featured ? "text-yellow-500 fill-yellow-500" : ""}`} />
                      </Button>
                      {/* Active toggle */}
                      <Switch
                        checked={link.is_active ?? true}
                        onCheckedChange={() => handleToggleActive(link)}
                      />
                      {/* Edit */}
                      <Button variant="ghost" size="icon" onClick={() => setEditingLink(link)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      {/* Delete */}
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteLink(link.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                      {/* Open link */}
                      <Button variant="ghost" size="icon" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {(!links || links.length === 0) && (
              <p className="text-center text-muted-foreground py-8">
                Nenhum link cadastrado ainda.
              </p>
            )}
          </CardContent>
        </Card>

        {/* WhatsApp Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Configurações do WhatsApp
            </CardTitle>
            <CardDescription>
              Configure a mensagem automática que será enviada quando clicarem no link do WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatsapp_number">Número do WhatsApp (com código do país)</Label>
              <Input
                id="whatsapp_number"
                placeholder="5511999999999"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Formato: 55 (Brasil) + DDD + Número (ex: 5511999999999)
              </p>
            </div>
            <div>
              <Label htmlFor="whatsapp_message">Mensagem Automática</Label>
              <Textarea
                id="whatsapp_message"
                placeholder="Olá! Vim pelo link da bio..."
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                rows={3}
              />
            </div>
            <Button onClick={handleSaveWhatsapp} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
