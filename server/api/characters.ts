import { getCharacters } from 'rickmortyapi'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const params = {
    ...query.page && { page: Number(query.page) },
    ...query.name && { name: query.name.toString() },
    ...query.status && { status: query.status.toString() },
    ...query.species && { species: query.species.toString() },
    ...query.type && { type: query.type.toString() },
    ...query.gender && { gender: query.gender.toString() },
  }

  const data = await getCharacters(params)

  return data
})
