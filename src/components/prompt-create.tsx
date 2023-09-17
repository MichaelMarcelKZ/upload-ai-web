import { PlusCircle } from "lucide-react";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

import { useState, useRef } from "react";

import { api } from "@/lib/axios";

import { usePrompts } from "@/hooks/usePrompts";

export function PromptCreate() {
    const [open, setOpen] = useState(false)
    const promptTitleRef = useRef<HTMLInputElement>(null)
    const promptTextRef = useRef<HTMLTextAreaElement>(null)

    const { prompts, setPrompts } = usePrompts();

    const { toast } = useToast();

    async function handleCreatePrompt() {

        const template = promptTextRef.current?.value
        const title = promptTitleRef.current?.value

        if (!title || title.length < 5) {
            toast({
                title: "Atenção!",
                description: "O título deve conter no mínimo 5 caractéres!",
                variant: "destructive"
            })
            return
        }

        if (!template || template.length < 30) {
            toast({
                title: "Atenção!",
                description: "O prompt deve conter no mínimo 30 caractéres!",
                variant: "destructive"
            })
            return
        }

        if (!template.includes("{transcription}")) {
            toast({
                title: "Atenção!",
                description: "O uso da varíavel {transcription} no prompt é obrigatório!",
                variant: "destructive"
            })
            return
        }

        const apiResponse = await api.post('/prompts', {
            title,
            template
        }).catch((reason) => {
            const { error } = reason.response.data;
            if (error) {
                toast({
                    title: "Atenção!",
                    description: error,
                    variant: "destructive"
                })
            } else {
                toast({
                    title: "Atenção!",
                    description: "Erro inesperado!",
                    variant: "destructive"
                })
            }
        });

        if (!apiResponse) {
            return
        }

        const { prompt } = apiResponse.data;

        if (prompt.id) {
            let newPrompts = prompts
            newPrompts?.push(prompt)
            setPrompts(newPrompts);

            toast({
                title: "Sucesso!",
                description: "Prompt cadastrado!",
                variant: "success",
            })
            setOpen(false);
            return
        }

        toast({
            title: "Atenção!",
            description: "Erro Inesperado!",
            variant: "destructive"
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button asChild size="icon" className="w-9 bg" ><PlusCircle className="px-1.5" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] max-h-[800px]">
                <DialogHeader>
                    <DialogTitle>Cadastrar um novo Prompt</DialogTitle>
                    <DialogDescription>
                        O seu novo prompt deve conter um título. Além disso, no seu prompt, é obrigatório informar uma vez a variável<code className="text-violet-400">{" {transcription} "}</code>
                        para que a transcrição do vídeo seja adicionada ao seu prompt.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 space-y-1">
                    <Label htmlFor="prompt-title">Titulo</Label>
                    <Input ref={promptTitleRef} id="prompt-title" placeholder="Insira um título para seu prompt..." />
                    <Label htmlFor="new-prompt">Prompt</Label>
                    <Textarea ref={promptTextRef} id="new-prompt" className="max-h-[500px] min-h-[300px] leading-relaxed p-4" placeholder="Insira o seu novo prompt..." />
                </div>

                <DialogFooter>
                    <Button onClick={handleCreatePrompt}>Criar prompt</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}