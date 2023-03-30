import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './UserSlice'
import HistorySlice from './HistorySlice'
const store = configureStore({
  reducer:{
    user: UserSlice

  }
})

export default store