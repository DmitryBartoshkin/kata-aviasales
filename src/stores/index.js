import { configureStore } from '@reduxjs/toolkit'

import sortSliceReducer from './sort-slice'
import filterSliceReducer from './filter-slice'
import ticketsSliceReducer from './tickets-slice'

export default configureStore({
  reducer: {
    sortTab: sortSliceReducer,
    filters: filterSliceReducer,
    ticketsList: ticketsSliceReducer,
  },
})
