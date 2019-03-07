export function getDefaultTextDirection (api) {
  const queryParam = api.getQueryParam('direction')
  const bodyDirection = window.getComputedStyle(document.documentElement).direction.toLowerCase()
  return queryParam || bodyDirection || 'ltr'
}

export function setTextDirection (direction) {
  document.documentElement.dir = direction
}
