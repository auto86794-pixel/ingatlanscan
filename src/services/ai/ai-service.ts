import {
  AIChatRequest,
  AIChatResponse,
} from "./ai-provider";

import {
  openAIProvider,
} from "./openai-provider";

/**
 * AI Service.
 *
 * A HomeFlow AI belépési pontja.
 */
export class AIService {
  /**
   * Chat.
   */
  async chat(
    request: AIChatRequest
  ): Promise<AIChatResponse> {
    return openAIProvider.chat(
      request
    );
  }
}

/**
 * Singleton.
 */
export const aiService =
  new AIService();