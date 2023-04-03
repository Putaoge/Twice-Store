import { createSlice } from "@reduxjs/toolkit";
import { memberAvatarArr, randomVoice } from "../Api/data";

const localInfo = JSON.parse(localStorage.getItem('twice_store_user'))
let data;
if (localInfo) {
  // // console.log('localInfo: ', localInfo);
  let total = + localInfo.cart.reduce((sum, curr) => sum + +curr.price.replace('$', '') * curr.amount, 0).toFixed(2)

  // // console.log('total: ', total);
  data = {
    cart: localInfo.cart,
    total,
    user: localInfo,
    history: localInfo.history || []
  }
}

const UserSlice = createSlice({
  name: 'user',
  initialState: data || {
    cart: [

    ],
    total: 0,
    user: null,
    history: []
  },
  reducers: {

    // 添加購物車商品
    addProduct: (state, { payload }) => {
      // console.log('payload: ', payload);
      // state.cart
      // console.log('state.cart: ', JSON.parse(JSON.stringify(state.cart)) );


      // // console.log('state: ', JSON.parse(JSON.stringify(state.user.userLimitHistory)));
      // 判斷是否有下訂單的記錄
      if (state.user?.userLimitHistory) {
        // // console.log('state.user.userLimitHistory: ', state.user.userLimitHistory);
        let index;
        let preAmount;
        let bol = state.user.userLimitHistory.find((item, num) => {
          if (item.title === payload.productData.title) {
            index = num
            preAmount = item.amount
          }
          return item.title === payload.productData.title
        })
        // console.log('bol: ', JSON.parse(JSON.stringify(bol)));
        // // console.log('bol: ', bol);

        // 判斷訂單記錄中的數量與將要加入的數量是否超過限制
        if (bol) {
          // console.log('bol: ', bol);

          let cartNum = 0;
          let cartIndex;
          let res = state.cart.find((item, cartRank) => {
            if (item.title === bol.title) {
              cartNum = item.amount
              cartIndex = cartRank
            }

            return item.title === bol.title
          })

          if (payload.productNum + preAmount + cartNum >= payload.productData.limit) {
            // console.log('payload.productNum: ', payload.productNum);
            // console.log('cartNum: ', cartNum);
            // console.log('preAmount: ', preAmount);
            // console.log('payload.productNum + preAmount + cartNum: ', payload.productNum + preAmount + cartNum);
            // console.log('我打');
            payload.productNum = payload.productData.limit - preAmount - cartNum
            // console.log('payload.productData.limit: ', payload.productData.limit);
            // console.log('比对过了payload: ', payload);
          }
        }
      }

      if (payload.productNum === 0) {
        return;
      }

      let bol = state.cart.find(item => item.title === payload.productData.title)
      if (bol) {
        // console.log('bol: ', bol);
        let index;
        state.cart.forEach((item, rank) => {
          if (item.title === payload.productData.title) {
            index = rank
          }
        })
        // console.log('index: ', index);

        // 每人限購
        state.cart[index].amount = state.cart[index].amount + payload.productNum >= payload.productData.limit ? payload.productData.limit : state.cart[index].amount + payload.productNum

        // 計算金額
        state.total = state.cart.reduce((sum, cur) => sum + +cur.price.replace('$', '') * cur.amount, 0)
        state.total = +state.total.toFixed(2)

      }
      else {
        state.cart.push({
          ...payload.productData,
          amount: payload.productNum,
          path: payload.path
        })
        state.total += +payload.productData.price.replace('$', '') * payload.productNum
        state.total = +state.total.toFixed(2)

      }

      // 添加至內存
      let localUser = JSON.parse(localStorage.getItem('twice_store_user'))
      if (localUser) {
        // // console.log('localUser: ', localUser);
        let newUserInfo = {
          ...localUser,
          cart: state.cart
        }
        // console.log('newUserInfo: ', newUserInfo);
        localStorage.setItem('twice_store_user', JSON.stringify(newUserInfo))
        localStorage.setItem('twice_store_'+newUserInfo.username, JSON.stringify(newUserInfo))
      }

    },


    // 減 購物車商品
    minusProduct: (state, { payload }) => {
      // console.log('payload: ', payload);
      // console.log('state.cart: ', state.cart);

      let index;
      state.cart.forEach((item, rank) => {
        // console.log('item: ', item);
        if (item.title === payload.title) {
          index = rank
        }
      })
      if (state.cart[index].amount - 1 === 0) {
        state.cart[index].amount = 0
        state.cart.splice(index, 1)

      } else {
        state.cart[index].amount -= 1
        // console.log(22);
      }
      state.total -= +payload.price.replace('$', '')
      state.total = +state.total.toFixed(2)

      // 添加至內存
      let localUser = JSON.parse(localStorage.getItem('twice_store_user'))
      if (localUser) {
        // // console.log('localUser: ', localUser);
        let newUserInfo = {
          ...localUser,
          cart: state.cart
        }
        // console.log('newUserInfo: ', newUserInfo);
        localStorage.setItem('twice_store_user', JSON.stringify(newUserInfo))
        localStorage.setItem('twice_store_' +newUserInfo.username, JSON.stringify(newUserInfo))
      }
    },
    // 清空購物車
    resetCart: (state) => {
      state.cart = []
      state.total = 0;
      // 添加至內存
      let localUser = JSON.parse(localStorage.getItem('twice_store_user'))
      if (localUser) {
        // // console.log('localUser: ', localUser);
        let newUserInfo = {
          ...localUser,
          cart: state.cart
        }
        // console.log('newUserInfo: ', newUserInfo);
        localStorage.setItem('twice_store_user', JSON.stringify(newUserInfo))
        localStorage.setItem('twice_store_' +newUserInfo.username, JSON.stringify(newUserInfo))
      }
    },

    // 第一次登入
    setUser: (state, { payload }) => {
      // console.log('第一次登入啊 state: ', JSON.parse(JSON.stringify(state.cart)));
      // console.log('setUser payload: ', payload);


      let avatarNum = +(Math.random() * (memberAvatarArr.length - 1)).toFixed()

      payload = {
        ...payload,
        cart: state.cart,
        nickname: 'ONCE',
        address: '韩国首爾特別市江東區江東大路205號（城內洞448-13,JYP Center大樓）',
        balance: 20151020,
        avatar: `url(${memberAvatarArr[avatarNum].avatar})`,
        shadow: `${memberAvatarArr[avatarNum].shadow}`,
        userLimitHistory: [],
        history: []
      }
      // console.log('payload: ', payload);
      // state.user = payload;
      // 為什麼沒設置上
      localStorage.setItem('twice_store_user', JSON.stringify(payload))
      localStorage.setItem('twice_store_' +payload.username, JSON.stringify(payload))
      state.user = payload
      // console.log('設置上了嗎state.user: ', state.user);
      // console.log('設置上了嗎payload: ', payload);

    },

    // 登入過了
    secondLogin: (state, { payload }) => {
      // payload是localStorage裡面存的用戶信息
      // console.log('登入過了, payload: ', payload);
      /* 

      */


      // state.cart.forEach(item=>{

      // })

      // if (state.user?.userLimitHistory) {
      //   // // console.log('state.user.userLimitHistory: ', state.user.userLimitHistory);
      //   let index;
      //   let preAmount;
      //   let bol = state.user.userLimitHistory.find((item, num) => {
      //     if (item.title === payload.productData.title) {
      //       index = num
      //       preAmount = item.amount
      //     }
      //     return item.title === payload.productData.title
      //   })
      //   // // console.log('bol: ', bol);

      //   // 判斷訂單記錄中的數量與將要加入的數量是否超過限制
      //   if (bol) {
      //     // console.log('bol: ', bol);

      //     let cartNum = 0;
      //     let cartIndex;
      //     let res = state.cart.find((item, cartRank) => {
      //       if (item.title === bol.title) {
      //         cartNum = item.amount
      //         cartIndex = cartRank
      //       }

      //       return item.title === bol.title
      //     })

      //     if (payload.productNum + preAmount + cartNum >= payload.productData.limit) {
      //       payload.productNum = payload.productData.limit - preAmount - cartNum
      //       // console.log('比对过了payload: ', payload);
      //     }
      //   }
      // }



      // 未登入前的購物車裡的內容
      state.cart.forEach((item, index) => {
        // console.log('item: ', item);
        // let index;
        // 緩存裡存儲的用戶的購物車裡的內容
        let bol = payload.cart.find((product, num) => {
          if (product.title === item.title) {
            // 記錄購物車內符合商品的index
            // index = num;
          }
          return product.title === item.title
        })

        // 緩存裡存儲的用戶的購買記錄
        let hisToryIndex;
        let historyBol = payload.userLimitHistory.find((historyProduct, hisIndex) => {
          if (historyProduct.title === item.title) {
            hisToryIndex = hisIndex
          }
          return historyProduct.title === item.title
        })

        // console.log('historyBol: ', historyBol); // undefined
        // console.log('index: ', index); // index:  0 可以獲取到
        if (bol && historyBol) {
          // console.log('bol: ', bol);
          // // // console.log(bol.amount); // 2 當前購物車裡面的數量
          // console.log('historyBol: ', historyBol);

          // if (historyBol){
          //   // 我買過這個東西
          // console.log('我買過這個東西: ', `我買過這個東西`);

          // 控制上限
          if (item.amount + bol.amount + historyBol.amount >= item.limit) {
            // console.log('超出預算');
            // item.limit - historyBol.amount 就是能購買的上限
            item.amount = item.limit - historyBol.amount
          } else {
            item.amount += item.amount
          }
          // }else{
          //   // 控制上限
          //   if (item.amount + bol.amount >= item.limit) {
          //     state.cart[index].amount = item.limit
          //   } else {
          //     state.cart[index].amount += item.amount
          //   }
          // }

          // // 存入
          // payload = {
          //   ...payload,
          //   cart: state.cart
          // }

          // 只有緩存裡的購物車裡面有
        } else if (bol) {
          // payload.cart[payload.cart.length] = item
          // // console.log('item.title: ', item.title);
          // // console.log('payload.cart: ', payload.cart);
          // 控制上限
          if (item.amount + bol.amount >= item.limit) {
            // console.log('超出預算');
            // item.limit - historyBol.amount 就是能購買的上限
            item.amount = item.limit
          } else {
            item.amount += item.amount
          }




          // // 存入
          // payload = {
          //   ...payload,
          //   cart: state.cart
          // }
          // 只有歷史記錄有
        } else if (historyBol) {

          if (item.amount + historyBol.amount >= item.limit) {
            // console.log('超出預算');
            // item.limit - historyBol.amount 就是能購買的上限
            item.amount = item.limit - historyBol.amount
          } else {
            item.amount += item.amount
          }

          // // 存入
          // payload = {
          //   ...payload,
          //   cart: state.cart
          // }
        }
      })
      // // console.log('payload.cart: ', payload.cart[1].title);
      // console.log('payload: ', payload);
      // payload = {
      //   ...payload,
      //   cart: state.cart
      // }
      let newCart = state.cart.filter(item => item.amount !== 0)
      payload = {
        ...payload,
        cart: state.cart
      }

      let total = newCart.reduce((sum, curr) => {
        let currTotal = +(+curr.price.replace('$', '') * curr.amount).toFixed(2)
        return sum + currTotal
      }, 0)

      state.cart = newCart

      state.user = payload
      state.history = payload.history
      state.total = total

      localStorage.setItem('twice_store_' +payload.username, JSON.stringify(payload))
      localStorage.setItem('twice_store_user', JSON.stringify(payload))

    },

    // 添加訂單
    addOrder: (state, { payload }) => {
      // console.log('payload: ', payload);

      let time = new Date().toLocaleString('tw')
      // console.log('time: ', time);

      let voiceNum = +(Math.random() * (randomVoice.length - 1)).toFixed()

      // 添加歷史購買記錄
      state.history.unshift({
        product: payload.cartInfo,
        address: payload.newAddress,
        date: time,
        total: payload.total,
        randomVoice: randomVoice[voiceNum]
      })

      // 給user添加購買記錄(用於數量限制)

      payload.cartInfo.forEach(product => {
        // if (!state.user.userLimitHistory) {
        //   state.user.userLimitHistory = [
        //     {
        //       title: product.title,
        //       amount: product.amount
        //     }
        //   ]
        // } else {
        let bol = state.user.userLimitHistory.find(item => item.title === product.title)
        if (!bol) {
          // 沒買過
          state.user.userLimitHistory.push({
            title: product.title,
            amount: product.amount
          })
        } else {
          // 買過 要添加到購買記錄裡
          let index = state.user.userLimitHistory.indexOf(bol)
          let prevCount = state.user.userLimitHistory[index].amount
          state.user.userLimitHistory.splice(index, 1, {
            title: product.title,
            amount: product.amount + prevCount
          })
        }
        // }
      })




      // 清空購物車
      state.cart = []
      state.total = 0
      state.user.balance -= payload.total;
      state.user.balance = + state.user.balance.toFixed(2)

      // let userInfo = JSON.parse(localStorage.getItem('twice_store_user'))
      // // console.log('userInfo: ', userInfo);
      let newInfo = {
        ...state.user,
        cart: state.cart,
        history: state.history
      }



      // 更新歷史記錄信息
      localStorage.setItem('twice_store_user', JSON.stringify(newInfo))
      localStorage.setItem('twice_store_' +state.user.username, JSON.stringify(newInfo))

    },

    // 刪除訂單
    removeOrder: (state, { payload }) => {
      // console.log('payload: ', payload);
      /* 
        {
          "product": [
              {
                  "title": "MORE & MORE T-SHIRT",
                  "price": "$35.00",
                  "picPath": "https://cdn.shopify.com/s/files/1/0267/1371/8831/products/More-More-Replace-Back_344x.png?v=1590983693",
                  "soldout": false,
                  "limit": 8,
                  "cartMessage": [
                      "\"MORE & MORE T-SHIRT\"",
                      "*LIMIT OF 8 PER CUSTOMER."
                  ],
                  "dirname": "MERCHANDISE-ACCESSORIES",
                  "amount": 8,
                  "path": "/shop/MORE-MORE/MORE%20&%20MORE%20T-SHIRT"
              }
          ],
          "address": "韩国首爾特別市江東區江東大路205號（城內洞448-13,JYP Center大樓）",
          "date": "2023/3/31 上午5:16:46",
          "total": 280,
          "randomVoice": "./voice/8.채영_허허이.wav"
        }
      */
      // let index;
      // state.history.findOne((item, historyIndex)=>{
      //   if (item.date === payload.date){
      //     index = 
      //   }
      // })

      // 刪除購買記錄
      state.history = state.history.filter(item=>item.date!==payload.date)
      // 減掉limit記錄

      payload.product.forEach((item,index)=>{
        let product = state.user.userLimitHistory.find((history, historyIndex)=>{
          return history.title === item.title;
        })
        product.amount -= item.amount
      })
      
      

      // console.log('state.history: ', JSON.parse(JSON.stringify(state.history)));
      state.user = {
        ...state.user,
        history: state.history,
        balance: state.user.balance + payload.total
      }
      localStorage.setItem('twice_store_user', JSON.stringify(state.user))
      localStorage.setItem('twice_store_' +state.user.username, JSON.stringify(state.user))

    },

    // 修改用戶信息
    changeUserInfo: (state, { payload }) => {
      // console.log('payload: ', payload);
      let {
        username,
        password,
        nickname,
        address
      } = payload


      let userInfo = JSON.parse(localStorage.getItem('twice_store_user'))
      let newInfo = {
        ...userInfo,
        ...payload
      }
      localStorage.removeItem(state.user.username)
      localStorage.setItem('twice_store_' + username, JSON.stringify(newInfo))
      localStorage.setItem('twice_store_user', JSON.stringify(newInfo))


      state.user = {
        ...state.user,
        username,
        password,
        nickname,
        address
      }


    },

    // 登出
    logout: (state) => {

      localStorage.removeItem('twice_store_user')
      // state = {
      //   cart: [],
      //   total: 0,
      //   user: null,
      //   history: []
      // }
      state.cart = [];
      state.total = 0;
      state.user = null;
      state.history = [];
    },





  },

})

// 獲取購物車信息
export const getCartInfo = state => state.user.cart
// 獲取總金額
export const getTotalPrice = state => state.user.total

// 獲取用戶信息
export const getUserInfo = state => state.user.user

// 獲取歷史訂單
export const getHistoryOrder = state => state.user.history


export const {
  addProduct,
  minusProduct,
  setUser,
  secondLogin,
  resetCart,
  addOrder,
  removeOrder,
  changeUserInfo,
  logout
} = UserSlice.actions

export default UserSlice.reducer