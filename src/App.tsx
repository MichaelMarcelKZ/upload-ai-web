import { Github, Wand } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";

export function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido com ❤ no NLW da Rocketseat</span>

          <Separator orientation="vertical" className="h-6 w-0.5 bg-muted-foreground" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />
            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
            />
          </div>
          <span className="text-sm text-muted-foreground">Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</span>
        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm />

          <Separator className="mx-2 h-0.5 bg-zinc-800" />

          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="videoTitle">Título de Vídeo</SelectItem>
                  <SelectItem value="videoDescription">Descrição de Vídeo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">Você poderá customizar essa opção em breve!</span>
            </div>

            <Separator className="mx-2 h-0.5 bg-zinc-800" />

            <div className="space-y-3">
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}

              />
              <span
                className="block text-xs text-muted-foreground italic"
              >
                Valores mais altos tendem a deixar o resultado mais criativo porém com possíveis erros.
              </span>
            </div>

            <Separator className="mx-2 h-0.5 bg-zinc-800" />

            <Button
              type="submit"
              className="w-full"
            >
              Executar
              <Wand className="h-4 w-4 ml-2" />
            </Button>

          </form>
        </aside>
      </main>
    </div>
  )
}
