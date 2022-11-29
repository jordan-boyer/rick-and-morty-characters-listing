import type { Character, CharacterFilter, Info } from 'rickmortyapi/dist/interfaces'

export const useCharactersStore = () => {
  const characters = useState<Map<string, Info<Character[]>>>('characters', () => new Map())

  const getCharacters = (filters: CharacterFilter) => {
    const key = JSON.stringify(filters)
    return characters.value.get(key) ?? {
      results: undefined,
      info: undefined,
    }
  }

  const getCharacter = (id: number) => {
    for (const characterPerPages of characters.value.values()) {
      const character = characterPerPages.results?.find(character => character.id === id)
      if (character)
        return character
    }
    return undefined
  }

  const addCharacters = (filters: CharacterFilter, charactersToAdd: Info<Character[]>) => {
    const key = JSON.stringify(filters)
    characters.value.set(key, charactersToAdd)
  }

  return { getCharacter, getCharacters, addCharacters }
}
