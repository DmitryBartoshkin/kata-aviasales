import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filterTransfer',
  initialState: {
    filterItems: [
      { id: 0, title: 'Все', checked: '' },
      { id: 1, title: 'Без пересадок', checked: '' },
      { id: 2, title: '1 пересадка', checked: '' },
      { id: 3, title: '2 пересадки', checked: '' },
      { id: 4, title: '3 пересадки', checked: '' },
    ],
  },
  reducers: {
    toggleItem(state, action) {
      if (action.payload.id === 0 && !action.payload.checked) {
        state.filterItems.forEach((el) => {
          const item = el
          item.checked = 'checked'
        })
      }
      if (action.payload.id === 0 && action.payload.checked) {
        state.filterItems.forEach((el) => {
          const item = el
          item.checked = ''
        })
      }
      if (action.payload.id !== 0 && !action.payload.checked) {
        state.filterItems.forEach((el) => {
          const item = el
          if (item.id === action.payload.id) {
            item.checked = 'checked'
          }
        })

        const checkedAllItems = state.filterItems.filter((el) => !el.checked)
        if (checkedAllItems.length === 1) {
          checkedAllItems[0].checked = 'checked'
        }
      }
      if (action.payload.id !== 0 && action.payload.checked) {
        state.filterItems.forEach((el) => {
          const item = el
          if (item.id === action.payload.id) {
            item.checked = ''
          }
        })

        const uncheckedAllItems = state.filterItems.filter((el) => el.id === 0)
        if (uncheckedAllItems[0].checked) {
          uncheckedAllItems[0].checked = ''
        }
      }
    },
  },
})

export const { toggleItem } = filterSlice.actions
export default filterSlice.reducer
