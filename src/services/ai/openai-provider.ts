import type {
  AIChatRequest,
  AIChatResponse,
  AIProvider,
} from "./ai-provider";

/**
 * OpenAI Provider.
 *
 * Az OpenAI API kommunikációért felel.
 */
export const openAIProvider: AIProvider = {
  async chat(
    request: AIChatRequest
  ): Promise<AIChatResponse> {
    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Hiányzik az OPENAI_API_KEY környezeti változó."
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${apiKey}`,
        },

        body: JSON.stringify({
          model: "gpt-5.5",

          messages: request.messages,

          temperature:
            request.temperature ??
            0.2,

          max_completion_tokens:
            request.maxTokens ?? 1000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `OpenAI hiba: ${response.status}`
      );
    }

    const data =
      await response.json();

    return {
      content:
        data.choices?.[0]?.message
          ?.content ?? "",

      model:
        data.model,

      usage: data.usage
        ? {
            promptTokens:
              data.usage
                .prompt_tokens,

            completionTokens:
              data.usage
                .completion_tokens,

            totalTokens:
              data.usage
                .total_tokens,
          }
        : undefined,
    };
  },
};