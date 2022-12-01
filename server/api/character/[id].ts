import { getCharacter } from "rickmortyapi";
import type { ApiResponse, Character } from "rickmortyapi/dist/interfaces";

export default defineEventHandler(
  async (event): Promise<ApiResponse<Character | { [key: string]: never }>> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parameters: { id: string } = event.context.params;

    return await getCharacter(Number(parameters.id));
  }
);
