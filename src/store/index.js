import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './UserSlice'

const store = configureStore({
  reducer:{
    user: UserSlice

  },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store