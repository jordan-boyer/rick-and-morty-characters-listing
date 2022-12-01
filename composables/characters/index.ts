import {
  type Info,
  type Character,
  type CharacterFilter,
  type ApiResponse,
} from "rickmortyapi/dist/interfaces";

import useCharactersStore from "./store";

async function callApi<ApiReturnType, ReturnType>(
  callBack: () => Promise<ApiReturnType>,
  validator: (data: ApiReturnType) => Error | ReturnType
): Promise<Error | ReturnType> {
  try {
    const res = await callBack();
    const validation = validator(res);
    if (validation instanceof Error) {
      return validation;
    }
    return validation;
  } catch {
    return new Error(
      "An error occur with rick and morty api.\nPlease try again later"
    );
  }
}

function initData<Type>(data: Type) {
  const error = ref("");
  const internalData = ref<Type>(data);

  const defaultReturn = { error, data: internalData };

  return { defaultReturn, error, internalData };
}

export async function useFetchCharacters(filters: Readonly<CharacterFilter>) {
  const { getCharacters, addCharacters } = useCharactersStore();

  const { defaultReturn, internalData, error } = initData<Info<Character[]>>(
    getCharacters(filters)
  );

  if (internalData.value.results && internalData.value.results.length > 0) {
    return defaultReturn;
  }

  const apiResponse = await callApi(
    async () => await $fetch("/api/characters", { params: filters }),
    (characters) => {
      if (characters.data.results && characters.data.results.length > 0) {
        return characters;
      }
      return new Error("No data found for your search");
    }
  );

  if (apiResponse instanceof Error) {
    error.value = apiResponse.message;

    return defaultReturn;
  }

  internalData.value = addCharacters(filters, apiResponse.data);

  return defaultReturn;
}

export async function useFetchCharacter(id: number) {
  const { getCharacter } = useCharactersStore();
  const { defaultReturn, error, internalData } = initData(getCharacter(id));

  if (internalData.value) {
    return defaultReturn;
  }

  const apiResponse = await callApi(
    async () => await $fetch(`/api/character/${id}`),
    (character) => {
      const { data } = character;
      if ("id" in data) {
        // find a better way with typescript to narrow type here
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return character as ApiResponse<Character>;
      }
      return new Error("No data found for your search");
    }
  );

  if (apiResponse instanceof Error) {
    error.value = apiResponse.message;

    return defaultReturn;
  }

  internalData.value = apiResponse.data;

  return defaultReturn;
}
