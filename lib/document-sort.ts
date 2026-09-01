export const SORT_OPTIONS = [
  'createdAt',
  'updatedAt',
  'titleAsc',
  'titleDesc',
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]

export const DEFAULT_SORT: SortOption = 'updatedAt'

export const SORT_LABELS: Record<SortOption, string> = {
  createdAt: 'Date created',
  updatedAt: 'Date updated',
  titleAsc: 'Name (A → Z)',
  titleDesc: 'Name (Z → A)',
}

export function parseSort(value: string | string[] | undefined): SortOption {
  return (SORT_OPTIONS as readonly string[]).includes(value as string)
    ? (value as SortOption)
    : DEFAULT_SORT
}

type SortableDocument = { title: string; createdAt: Date; updatedAt: Date }

// Sorted in JS rather than via Prisma `orderBy` because the generated
// client here has no case-insensitive collation option for `title`, and
// Postgres's default collation sorts all-uppercase titles before any
// lowercase ones.
export function sortDocuments<T extends SortableDocument>(
  documents: T[],
  sort: SortOption
): T[] {
  const sorted = [...documents]
  switch (sort) {
    case 'createdAt':
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case 'updatedAt':
      sorted.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      break
    case 'titleAsc':
      sorted.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      )
      break
    case 'titleDesc':
      sorted.sort((a, b) =>
        b.title.localeCompare(a.title, undefined, { sensitivity: 'base' })
      )
      break
  }
  return sorted
}
