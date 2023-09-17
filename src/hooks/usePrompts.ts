import { useContext } from "react";
import { PromptContext } from "@/contexts/PromptContext";

export function usePrompts() {
    const value = useContext(PromptContext)

    return value;
}
