import { createSlice } from '@reduxjs/toolkit'

export const sortSlice = createSlice({
  name: 'sortTab',
  initialState: {
    tabs: [
      { id: 0, title: 'Самый дешёвый', active: 'active' },
      { id: 1, title: 'Самый быстрый', active: '' },
      { id: 2, title: 'Оптимальный', active: '' },
    ],
  },
  reducers: {
    activeTab(state, action) {
      state.tabs.forEach((el) => {
        const tab = el
        tab.active = ''
        if (tab.id === action.payload) {
          tab.active = 'active'
        }
      })
    },
  },
})

export const { activeTab } = sortSlice.actions
export default sortSlice.reducer
