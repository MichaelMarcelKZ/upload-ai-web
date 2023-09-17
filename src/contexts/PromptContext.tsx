import { createContext, useState, useEffect, ReactNode, Dispatch } from "react";
import { api } from "@/lib/axios";

interface Prompt {
    id: string
    title: string
    template: string
}

type PromptContextType = {
    prompts: Prompt[] | null
    setPrompts: Dispatch<React.SetStateAction<Prompt[] | null>>
}

type PromptContextProviderProps = {
    children: ReactNode
}
export const PromptContext = createContext({} as PromptContextType);

export function PromptContextProvider(props: PromptContextProviderProps) {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null);

    useEffect(() => {
        api.get('/prompts').then(response => {
            setPrompts(response.data)
        })
    }, [])

    return (
        <PromptContext.Provider value={{ prompts, setPrompts }}>
            {props.children}
        </PromptContext.Provider>
    )
}