import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getSearchIdApi = createAsyncThunk('tickets/searchId', async () => {
  const res = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await res.json()
  return data
})

export const getTicketsListApi = createAsyncThunk('tickets/ticketsList', async (searchId) => {
  const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  const data = await res.json()
  return data
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    ticketsList: [],
    requestData: [],
    status: null,
    error: null,
    isStop: false,
    loader: false,
  },
  reducers: {
    sortTicketsListCheapest(state) {
      state.ticketsList.sort((a, b) => a.price - b.price)
    },
    sortTicketsListFastest(state) {
      state.ticketsList.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      )
    },
    sortTicketsListOptimal(state) {
      state.ticketsList.sort(
        (a, b) =>
          a.price +
          a.segments[0].duration +
          a.segments[1].duration -
          (b.price + b.segments[0].duration + b.segments[1].duration)
      )
    },
    filterTicketsList(state, action) {
      state.ticketsList.forEach((el) => {
        const item = el
        const arrLength0 = item.segments[0].stops.length
        const arrLength1 = item.segments[1].stops.length

        if (action.payload.id === 1) {
          if ((arrLength0 === 0 || arrLength1 === 0) && !action.payload.checked) item.extraClass = 'zero-transfers'
          if ((arrLength0 === 0 || arrLength1 === 0) && action.payload.checked) item.extraClass = ''
          if (item.extraClass === 'all-transfers') item.extraClass = ''
        } else if (action.payload.id === 2) {
          if ((arrLength0 === 1 || arrLength1 === 1) && !action.payload.checked) item.extraClass = 'one-transfers'
          if ((arrLength0 === 1 || arrLength1 === 1) && action.payload.checked) item.extraClass = ''
          if (item.extraClass === 'all-transfers') item.extraClass = ''
        } else if (action.payload.id === 3) {
          if ((arrLength0 === 2 || arrLength1 === 2) && !action.payload.checked) item.extraClass = 'two-transfers'
          if ((arrLength0 === 2 || arrLength1 === 2) && action.payload.checked) item.extraClass = ''
          if (item.extraClass === 'all-transfers') item.extraClass = ''
        } else if (action.payload.id === 4) {
          if ((arrLength0 === 3 || arrLength1 === 3) && !action.payload.checked) item.extraClass = 'three-transfers'
          if ((arrLength0 === 3 || arrLength1 === 3) && action.payload.checked) item.extraClass = ''
          if (item.extraClass === 'all-transfers') item.extraClass = ''
        } else if (action.payload.id === 0) {
          if (!action.payload.checked && !item.extraClass) {
            if (arrLength0 === 0 || arrLength1 === 0) item.extraClass = 'zero-transfers'
            else if (arrLength0 === 1 || arrLength1 === 1) item.extraClass = 'one-transfers'
            else if (arrLength0 === 2 || arrLength1 === 2) item.extraClass = 'two-transfers'
            else if (arrLength0 === 3 || arrLength1 === 3) item.extraClass = 'three-transfers'
            else item.extraClass = 'all-transfers'
          }
          if (action.payload.checked) item.extraClass = ''
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchIdApi.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getSearchIdApi.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.requestData = action.payload
      })
      .addCase(getSearchIdApi.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
      .addCase(getTicketsListApi.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.loader = true
      })
      .addCase(getTicketsListApi.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.loader = false
        state.ticketsList = state.ticketsList.concat(action.payload.tickets)
        if (!action.payload.stop) {
          state.isStop = !state.isStop
        } else {
          state.isStop = action.payload.stop
        }
      })
      .addCase(getTicketsListApi.rejected, (state, action) => {
        state.status = 'rejected'
        state.isStop = !state.isStop
        state.error = action.error
      })
  },
})

export const { sortTicketsListCheapest, sortTicketsListFastest, sortTicketsListOptimal, filterTicketsList } =
  ticketsSlice.actions
export default ticketsSlice.reducer
