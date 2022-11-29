import type { Character, CharacterFilter, Info } from 'rickmortyapi/dist/interfaces'
import { useCharactersStore } from './store'

export const useFetchCharacters = async (filters: CharacterFilter) => {
  const { getCharacters, addCharacters } = useCharactersStore()

  const internalError = ref('')
  const internalData = ref<Info<Character[]>>(getCharacters(filters))

  const defaultReturn = { error: internalError, data: internalData }

  if (internalData.value.results && internalData.value.results.length > 0)
    return defaultReturn

  try {
    const characters = await $fetch('/api/characters', { params: filters })

    if (!Array.isArray(characters.data.results) || characters.data.results.length <= 0 || !characters.data.info) {
      internalError.value = 'No data found for your search'
      return defaultReturn
    }

    addCharacters(filters, characters.data)

    internalData.value = characters.data

    return defaultReturn
  }
  catch (e) {
    internalError.value = 'An error occur with rick and morty api.\nPlease try again later'
    return defaultReturn
  }
}

export const useFetchCharacter = async (id: number) => {
  const { getCharacter } = useCharactersStore()
  const internalData = ref<Character | undefined>(getCharacter(id))
  const internalError = ref('')

  const defaultReturn = { error: internalError, data: internalData }

  if (internalData.value)
    return defaultReturn

  try {
    const character = await $fetch(`/api/character/${id}`)

    if (!character.data) {
      internalError.value = 'No data found for your search'
      return defaultReturn
    }

    internalData.value = character.data

    return defaultReturn
  }
  catch (e) {
    internalError.value = 'An error occur with rick and morty api.\nPlease try again later'
    return defaultReturn
  }
}
