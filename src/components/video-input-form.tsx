import { FileVideo, Upload } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { ChangeEvent, useState } from "react"

export function VideoInputForm() {
    const [videoFile, setVideoFile] = useState<File | null>(null);

    function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.currentTarget

        if (!files) {
            return
        }

        const selectedFile = files.item(0);

        setVideoFile(selectedFile);
    }

    return (
        <form className="space-y-6">
            <label
                htmlFor="video"
                className="border flex w-full rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
            >
                {videoFile ? 'oi' : (
                    <>
                        <FileVideo className="h-4 w-4"></FileVideo>
                        Selecione um vídeo
                    </>
                )}
            </label>
            <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

            <Separator className="mx-2 h-0.5 bg-zinc-800" />

            <div className="space-y-2">
                <Label htmlFor="transcription_prompt">Prompt de Transcrição</Label>
                <Textarea
                    id="transcription_prompt"
                    className="h-20 leading-relaxed resize-none"
                    placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
                />
            </div>

            <Button type="submit" className="w-full">
                Carregar vídeo
                <Upload className="w-4 h-4 ml-2" />
            </Button>
        </form>
    )
}