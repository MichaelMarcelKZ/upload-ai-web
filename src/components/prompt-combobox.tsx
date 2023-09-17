"use client"

import { useState } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { usePrompts } from "@/hooks/usePrompts"

interface PromptComboboxProps {
    onPromptSelected: (template: string) => void
}

export function PromptCombobox(props: PromptComboboxProps) {
    const [open, setOpen] = useState(false)
    const { prompts } = usePrompts();
    const [selectedId, setSelectedId] = useState("")

    function handlePromptSelected(title: String) {
        const selectedPrompt = prompts?.find(prompt => prompt.title.trim().toLowerCase() === title.trim().toLowerCase())

        if (!selectedPrompt) {
            return
        }

        setSelectedId(selectedPrompt.id === selectedId ? "" : selectedPrompt.id)
        setOpen(false)

        props.onPromptSelected(selectedPrompt.template)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="flex-1 mx-0">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                >
                    {selectedId
                        ? prompts?.find((prompt) => prompt.id === selectedId)?.title
                        : "Selecione um prompt..."}
                    <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex-1 p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {prompts?.map((prompt) => (
                            <CommandItem
                                key={prompt.id}
                                onSelect={handlePromptSelected}
                            >
                                {prompt.title}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        selectedId === prompt.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
