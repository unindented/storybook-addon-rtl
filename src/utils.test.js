import { getDefaultTextDirection, setTextDirection } from './utils'

describe('utils', () => {
  describe('.getDefaultTextDirection', () => {
    it('returns the text direction from the query params', () => {
      const api = {
        getQueryParam: jest.fn().mockReturnValue('rtl')
      }
      jest.spyOn(window, 'getComputedStyle').mockReturnValue({ direction: '' })
      expect(getDefaultTextDirection(api)).toBe('rtl')
    })

    it('returns the text direction from the html tag', () => {
      const api = {
        getQueryParam: jest.fn().mockReturnValue(undefined)
      }
      jest.spyOn(window, 'getComputedStyle').mockReturnValue({ direction: 'rtl' })
      expect(getDefaultTextDirection(api)).toBe('rtl')
    })

    it('returns `ltr` as a fallback', () => {
      const api = {
        getQueryParam: jest.fn().mockReturnValue(undefined)
      }
      jest.spyOn(window, 'getComputedStyle').mockReturnValue({ direction: '' })
      expect(getDefaultTextDirection(api)).toBe('ltr')
    })
  })

  describe('.setTextDirection', () => {
    it('sets the direction of the html tag', () => {
      setTextDirection('rtl')
      expect(document.documentElement.dir).toBe('rtl')
    })
  })
})
