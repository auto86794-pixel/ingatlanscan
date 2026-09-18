export interface AIChatMessage {
  role: "system" | "user" | "assistant";

  content: string;
}

export interface AIChatRequest {
  messages: AIChatMessage[];

  temperature?: number;

  maxTokens?: number;
}

export interface AIChatResponse {
  content: string;

  model: string;

  usage?: {
    promptTokens: number;

    completionTokens: number;

    totalTokens: number;
  };
}

export interface AIProvider {
  /**
   * Chat completion.
   */
  chat(
    request: AIChatRequest
  ): Promise<AIChatResponse>;
}