import { getCharacter } from 'rickmortyapi'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id)

  const data = await getCharacter(id)

  return data
})
