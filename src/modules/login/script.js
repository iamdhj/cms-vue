import Vue from 'vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import {Init, Mix} from '*utils'
import {Urls, Links} from '*urls'

import './style.scss'
import view from './view.vue'
Vue.use(iview)

let ruleRequired = { required: true, message: '不能为空', trigger: 'blur' }

let page = Mix({
  data: () => ({
    userInfo: {
      account: '',
      password: ''
    },
    rules: {
      account: [ ruleRequired ],
      password: [ ruleRequired ]
    }
  }),
  methods: {
    login(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$fetch(Urls.LOGIN, this.userInfo).then((data) => {
            location.href = Links.MAIN
          })
        } else {
          this.$Message.error('请输入正确的帐号和密码')
        }
      })
    }
  }
}, view)

Init({}, page)
