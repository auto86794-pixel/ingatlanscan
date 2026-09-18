import type {
  AssistantItem,
} from "@/types/assistant";

import type {
  AssistantContext,
} from "../assistant-context";

/**
 * Minden Assistant szabály ezt
 * az interfészt valósítja meg.
 */
export interface AssistantRule {
  /**
   * Lefuttatja a szabályt.
   */
  execute(
    context: AssistantContext
  ): AssistantItem[];
}