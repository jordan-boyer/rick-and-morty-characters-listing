import type {
  Character,
  CharacterFilter,
  Info,
} from "rickmortyapi/dist/interfaces";

export default function useCharactersStore() {
  const characters = useState<Map<string, Info<Character[]>>>(
    "characters",
    () => new Map()
  );

  function getCharacters(filters: Readonly<CharacterFilter>) {
    const key = JSON.stringify(filters);
    return (
      characters.value.get(key) ?? {
        results: undefined,
        info: undefined,
      }
    );
  }

  function getCharacter(id: number) {
    for (const characterPerPages of characters.value.values()) {
      const foundCharacter = characterPerPages.results?.find(
        (character) => character.id === id
      );
      if (foundCharacter) {
        return foundCharacter;
      }
    }
    return undefined;
  }

  function addCharacters(
    filters: Readonly<CharacterFilter>,
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    charactersToAdd: Info<Character[]>
  ) {
    const key = JSON.stringify(filters);
    characters.value.set(key, charactersToAdd);
    return charactersToAdd;
  }

  return { getCharacter, getCharacters, addCharacters };
}
