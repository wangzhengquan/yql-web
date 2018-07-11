export const SELECT_POSITION = 'SELECT_POSITION'
export function selectPosition(position) {
  return {
    type: SELECT_POSITION,
    position
  }
}
