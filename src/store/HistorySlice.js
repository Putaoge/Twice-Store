import { createSlice } from "@reduxjs/toolkit";


const localInfo = JSON.parse(localStorage.getItem('twice_store_user'))
let data;
if (localInfo) {
  data = {
    history: localInfo.history || []
  }
}

const HistorySlice = createSlice({
  name: 'history',
  initialState: data || {},
  reducers: {
    addOrder: (state, { payload }) => {
      // console.log('payload: ', payload);
      /* 
        {
    "newAddress": "韩国首爾特別市江東區江東大路205號（城內洞448-13,JYP Center大樓）",
    "cartInfo": [
        {
            "title": "SET ME FREE (Tommy “TBHits” Brown Remix) (ENG) Digital Single",
            "price": "$0.69",
            "picPath": "https://cdn.shopify.com/s/files/1/0267/1371/8831/products/ReadyToBeRemix_796482b3-eae5-4d4f-85d7-cf32d15b2a1d_344x.png?v=1678808079",
            "soldout": false,
            "limit": 99999,
            "cartMessage": [
                "DIGITAL DOWNLOAD OF \"SET ME FREE (Tommy “TBHits” Brown Remix) (ENG) Digital Single\" WILL BE DELIVERED VIA EMAIL UPON PURCHASE.",
                "DIGITAL DOWNLOADS ARE ONLY AVAILABLE TO U.S. CUSTOMERS.",
                "DIGITAL DOWNLOADS ARE DELIVERED AS MP3 44.1KHZ/24-BIT AUDIO FILES.",
                "*LIMIT OF 99999 PER CUSTOMER."
            ],
            "amount": 107,
            "path": "/shop/READY-TO-BE/SET%20ME%20FREE%20(Tommy%20%E2%80%9CTBHits%E2%80%9D%20Brown%20Remix)%20(ENG)%20Digital%20Single"
        }
    ],
    "total": 73.83
}
      */
      let time = new Date().toLocaleString('tw')
      // console.log('time: ', time);
      
      state.history.unshift({
        product: payload.cartInfo,
        address: payload.newAddress,
        date: time,
        total: payload.total
      })

      let userInfo = JSON.parse(localStorage.getItem('twice_store_user'))
      // console.log('userInfo: ', userInfo);
      let newInfo = {
        ...userInfo,
        history: state.history
      }

      // 更新歷史記錄信息
      localStorage.setItem('twice_store_user', JSON.stringify(newInfo))
      localStorage.setItem(userInfo.username, JSON.stringify(newInfo))

    }
  }
})


export const getHistory = state => state.history.history

export const {
  addOrder
} = HistorySlice.actions

export default HistorySlice.reducer