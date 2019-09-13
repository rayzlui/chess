import { setupPlayingBoard } from './setupStart'
import { copyBoard } from './copiesBoard'

describe('copyBoard', () => {
  it('should have new board', () => {
    const mockBoard = setupPlayingBoard()
    mockBoard[4].piece = "JUST TO CHANGE THINGS UP"
    const copiedBoard = copyBoard(mockBoard)
    expect(copiedBoard).not.toEqual(mockBoard)
    const mockKeys = Object.keys(mockBoard)
    const mockValues = Object.values(mockBoard)
    const copiedKeys = Object.keys(copiedBoard)
    const copiedValues = Object.values(copiedBoard)
    mockKeys.forEach((key, index) => {
      expect(key).toEqual(copiedKeys[index])
    })
    mockValues.forEach((value, index) => {
      expect(value).toEqual(copiedValues[index])
    })
  })
})