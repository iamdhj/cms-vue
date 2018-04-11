import {Mix, ShowPrice, SavePrice} from '*utils'
import Urls from '*urls'

import {Getters, Mutations} from '../../store/keys'

import './style.scss'
import view from './view.vue'
import uploadImage from '*/components/upload-image.vue'

let ruleRequired = { required: true, message: '不能为空', trigger: 'blur' }

let page = Mix({
  props: ['title', 'paths'],
  data: () => ({
    goodInfo: {
      id: '',
      name: '',
      img: '',
      price: '',
      desc: ''
    },
    rules: {
      name: [ ruleRequired ],
      img: [ ruleRequired ],
      price: [ Mix({}, ruleRequired, {pattern: /^\d+(\.\d{1,2})?$/, message: '价格不正确(最多两位小数)'}) ],
      desc: [ ruleRequired ]
    }
  }),
  computed: {
    realTitle() {
      return this.title
    }
  },
  methods: {
    initInfo(id) {
      // 初始化商品信息
      let goodInfo = this.$store.getters[Getters.GOOD_INFO](id)

      if (id && goodInfo) {
        this.goodInfo = Mix({}, goodInfo)
        this.goodInfo.price = ShowPrice(goodInfo.price)
      } else if (id) {
        this.$router.replace(this.paths.GOODS)
      }
    },
    submit(name) {
      // 提交商品编辑数据
      this.$refs[name].validate((valid) => {
        if (valid) {
          let id = this.goodInfo.id
          let isEdit = id !== ''
          let url = isEdit ? Urls.EDIT_GOOD_INFO : Urls.ADD_GOOD_INFO

          let origin = this.$store.getters[Getters.GOOD_INFO](id)
          let goodInfo = Mix({}, this.goodInfo)
          goodInfo.price = SavePrice(goodInfo.price)
          if (JSON.stringify(goodInfo) === JSON.stringify(origin)) {
            this.$Modal.confirm({
              title: '内容没有修改',
              content: '是否返回商品列表页面',
              onOk: () => {
                this.$router.replace(this.paths.GOODS)
              }
            })
            return
          }

          this.$fetch(url, goodInfo).then(({id}) => {
            this.$store.commit(Mutations.ADD_GOOD_INFO, goodInfo)
            this.$Modal.confirm({
              title: `${isEdit ? '编辑' : '添加'}成功`,
              content: '是否返回商品列表页面?',
              onOk: () => {
                this.$router.replace(this.paths.GOODS)
              }
            })
          })
        } else {
          this.$Message.error('请输入正确的数据')
        }
      })
    }
  },
  created() {
    this.initInfo(this.$route.params.id)
  },
  beforeRouteUpdate(to, from, next) {
    this.initInfo(to.params.id)
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.goodInfo = {
      id: '',
      name: '',
      img: '',
      price: '',
      desc: ''
    }
    next()
  },
  components: {
    'upload-image': uploadImage
  }
}, view)

export default page
