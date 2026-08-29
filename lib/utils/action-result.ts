export type ActionResult<T> =
  | { success: true; message: string; status: number; data: T }
  | { success: false; message: string; status: number }

export function successResult<T>({
  message,
  status = 200,
  data,
}: {
  message: string
  status?: number
  data: T
}): ActionResult<T> {
  return { success: true, message, status, data }
}

export function errorResult({
  message,
  status = 500,
}: {
  message: string
  status?: number
}): ActionResult<never> {
  return { success: false, message, status }
}
