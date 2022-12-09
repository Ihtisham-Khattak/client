import { configureStore } from '@reduxjs/toolkit'
import Slicer from './Slicer'

export const store  = new configureStore({

    name: '',
    reducer: {
        cart: Slicer
    }

})
