export function vbindPx(px: number | string): string {
  const pxValue = typeof px === 'string' ? parseFloat(px) : px
  if (isNaN(pxValue)) {
    return '0px'
  }
  return `${pxValue}px`
}