import { useState } from "react"
import { Github, Wand } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { VideoInputForm } from "../components/video-input-form";
import { useCompletion } from "ai/react";
import { PromptCreate } from "../components/prompt-create";
import { PromptCombobox } from "../components/prompt-combobox";

export function Home() {
    const [temperature, setTemperature] = useState(0.5)
    const [videoId, setVideoId] = useState<string | null>(null)

    function handleGithubPage() {
        window.open('https://github.com/kzs3c', '_blank');
    }

    const {
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        completion,
        isLoading
    } = useCompletion({
        api: 'http://localhost:3333/ai/generate',
        body: {
            videoId,
            temperature,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return (
        <div className="min-h-screen flex flex-col">
            <div className="px-6 py-3 flex items-center justify-between border-b">
                <h1 className="text-xl font-bold">upload.ai</h1>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Desenvolvido com ❤ no NLW da Rocketseat - By KayZuu</span>

                    <Separator orientation="vertical" className="h-6 w-0.5 bg-muted-foreground" />

                    <Button variant="outline" onClick={handleGithubPage}>
                        <Github className="w-4 h-4 mr-2" />
                        Github
                    </Button>
                </div>
            </div>

            <main className="flex-1 p-6 flex gap-6">
                <div className="flex flex-col flex-1 gap-4">
                    <div className="grid grid-rows-2 gap-4 flex-1">
                        <Textarea
                            className="resize-none p-4 leading-relaxed"
                            placeholder="Inclua o prompt para a IA..."
                            value={input}
                            onChange={handleInputChange}
                        />
                        <Textarea
                            className="resize-none p-4 leading-relaxed"
                            placeholder="Resultado gerado pela IA..."
                            readOnly
                            value={completion}
                        />
                    </div>
                    <span className="text-sm text-muted-foreground">Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</span>
                </div>
                <aside className="w-80 space-y-6">
                    <VideoInputForm onVideoUploaded={setVideoId} />

                    <Separator className="mx-2 h-0.5 bg-zinc-800" />

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Prompt</Label>
                            <div className="flex gap-2">
                                <PromptCombobox onPromptSelected={setInput} />
                                <PromptCreate />
                            </div>
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
                                value={[temperature]}
                                onValueChange={value => setTemperature(value[0])}
                            />
                            <span
                                className="block text-xs text-muted-foreground italic"
                            >
                                Valores mais altos tendem a deixar o resultado mais criativo porém com possíveis erros.
                            </span>
                        </div>

                        <Separator className="mx-2 h-0.5 bg-zinc-800" />

                        <Button disabled={isLoading}
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
