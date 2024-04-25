/* eslint-disable no-param-reassign */
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
  },
  reducers: {
    ticketsListResult() {},
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
      })
      .addCase(getTicketsListApi.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.ticketsList = action.payload
      })
      .addCase(getTicketsListApi.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  },
})

export const { ticketsListResult } = ticketsSlice.actions
export default ticketsSlice.reducer
