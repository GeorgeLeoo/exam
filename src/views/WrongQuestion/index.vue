<!--
  @Description: 错题
  @Author: George
  @Date: 2020/3/29 6:48 PM
-->
<template>
  <div class="wrong-question wrapper1024 clearfix">
    <tabs class="paper-tab" v-model="activeName" @tab-click="handleTabChange">
      <tab-pane v-for="(item, index) in tabNames" :key="index" :label="item.label" :name="item.name"/>
    </tabs>
    <div v-show="activeName === 'CHARTS'">
      <div ref="CHARTS" id="CHARTS" style="width: 1024px;height:800px;"></div>
    </div>
    <div v-show="activeName !== 'CHARTS'">
      <aside class="fl left">
        <side-menu :data="sideList" :tip="true" @load-data="loadData"/>
      </aside>
      <section v-loading="isLoading" class="fl right">
        <article v-loading="loading">
          <ul class="list">
            <li v-for="(item, index) in list" :key="item._id" class="list-item">
              <h3 class="title">{{ (page - 1) * limit + index + 1 }}. 题目：{{ item.question }}</h3>
              <span class="error">错误次数：{{ item.count }}</span>
              <p class="origin">来源：{{ item.paper && item.paper.paperName }}</p>
              <span class="time">时间：{{ item.createdAt | parseTime }}</span>
              <el-button class="showWrong" type="primary" @click="handleShowWrong(item)">查看错题</el-button>
            </li>
          </ul>
          <pagination
            v-show="total > limit"
            :total="total"
            :page.sync="page"
            :limit.sync="limit"
            background
            layout="prev, pager, next"
            @current-change="getList"
          />
        </article>
      </section>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="'题目：' + item.question"
      width="1024px"
      :close="handleCancel"
    >
      <div class="dialog-content">
        <ul v-if="item.original">
          <li v-if="item.original.a">A: {{ item.original.a }}</li>
          <li v-if="item.original.b">B: {{ item.original.b }}</li>
          <li v-if="item.original.c">C: {{ item.original.c }}</li>
          <li v-if="item.original.d">D: {{ item.original.d }}</li>
        </ul>
        <p v-if="item.original" class="origin">答案：
          <span
            v-if="item.original.a && item.original.b && item.original.c && item.original.d && typeof item.original.correctAnswer === 'string'">{{ item.original.correctAnswer }}
          </span>
          <span
            v-if="item.original.a && item.original.b && item.original.c && item.original.d && typeof item.original.correctAnswer === 'object'">{{ item.original.correctAnswer.join(', ') }}
          </span>
          <span
            v-if="typeof item.original.correctAnswer === 'number'">{{ item.original.correctAnswer | trueOrFalseFilter }}
          </span>
          <span
            v-if="!item.original.a && !item.original.b && !item.original.c && !item.original.d && typeof item.original.correctAnswer === 'string'">{{ item.original.correctAnswer }}
          </span>
        </p>
        <span class="">错误次数：{{ item.count }}</span>
        <p class="origin">考点：{{ item.original && item.original.knowledgePoint }}</p>
        <p class="origin">解析：{{ item.original && item.original.explanation }}</p>
        <h3>
          试卷：{{ item.paper ? item.paper.paperName : '' }}
        </h3>
        <p>
          科目：{{ item.subject }}
        </p>
        <span class="time">时间：{{ item.createdAt | parseTime }}</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="handleCancel"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Tabs, TabPane, Pagination, Button, Dialog, Input } from 'element-ui'
import SideMenu from '@/components/SideMenu'
import { getWrongs, getWrongsByType, getWrongListForCharts } from '@/api/wrongs'
import echarts from 'echarts'

const tabNames = [
  {
    label: '科目',
    name: 'SUBJECT'
  },
  {
    label: '考点',
    name: 'KNOWLEDGE_POINT'
  },
  {
    label: '图表',
    name: 'CHARTS'
  }
]

export default {
  name: 'WrongQuestion',
  components: {
    Tabs,
    TabPane,
    Pagination,
    SideMenu,
    ElButton: Button,
    ElInput: Input,
    ElDialog: Dialog
  },
  data () {
    return {
      question: '',
      isLoading: false,
      loading: false,
      tabNames,
      sideList: [],
      list: [],
      activeName: tabNames[0].name,
      searchKey: '',
      page: 1,
      limit: 10,
      total: 0,
      dialogVisible: false,
      item: {},
      wrongCharts: [],
      xAxisDataDay: [],
      myChart: '',
      xAxisData: [],
      seriesData: [],
      option: {
        title: {
          text: '我的错题考点统计'
        },
        xAxis: {
          data: this.xAxisData
        },
        yAxis: {},
        series: [{
          data: this.seriesData,
          type: 'bar'
        }]
      }
    }
  },
  created () {
  },
  mounted () {
    this.getWrongs()
    this.getWrongCharts()
  },
  methods: {
    draw () {
      const myChart = echarts.init(document.getElementById('CHARTS'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '我的错题考点统计'
        },
        tooltip: {},
        xAxis: {
          data: this.xAxisData
        },
        color: ['#409eff'],
        yAxis: {},
        series: [{
          type: 'bar',
          data: this.seriesData
        }]
      })
    },
    handleSearch () {},
    handleShowWrong (item) {
      this.item = item
      this.dialogVisible = true
    },
    handleCancel () {
      this.dialogVisible = false
    },
    getList (page) {
      this.page = page
      this.getWrongsByType()
    },
    async getWrongs () {
      this.isLoading = true
      const params = {
        type: this.activeName,
        searchKey: this.searchKey ? this.searchKey : '前端',
        limit: this.limit,
        page: this.page
      }
      const { data } = await getWrongs(params)
      this.sideList = data.map(item => {
        item.name = item._id
        return item
      })
      this.searchKey = data[0]._id
      this.isLoading = false
      this.getWrongsByType()
    },
    /**
       * tab按钮改变事件
       */
    handleTabChange () {
      if (this.activeName === 'CHARTS') {
        // this.getWrongCharts()
      } else {
        this.getWrongs()
      }
    },
    /**
     * 将对象转换为数组
     */
    splitObjToArray (obj) {
      const arr = []
      const keys = Object.keys(obj)
      for (const key of keys) {
        arr.push({
          _id: key,
          total: obj[key]
        })
      }
      return arr
    },
    /**
     * 将列表转化为想要的格式
     */
    setWrongListForCharts (data) {
      const obj = {}
      for (const item of data) {
        obj[item.knowledgePoint] = 0
      }
      for (const item of data) {
        const count = obj[item.knowledgePoint]
        const num = count + item.count
        obj[item.knowledgePoint] = num
      }
      return this.splitObjToArray(obj)
    },
    async getWrongCharts () {
      const res = await getWrongListForCharts({})
      this.wrongCharts = this.setWrongListForCharts(res.data)
      // this.wrongCharts = (res.data.list)
      const x = []
      const s = []
      this.wrongCharts.map(item => {
        x.push(item._id)
        s.push(item.total)
      })
      this.xAxisData = x
      this.seriesData = s
      this.draw()
    },
    async getWrongsByType () {
      this.isLoading = true
      if (!this.searchKey) {
        return
      }
      this.loading = true
      const params = {
        type: this.activeName,
        searchKey: this.searchKey,
        limit: this.limit,
        page: this.page
      }
      const { data } = await getWrongsByType(params)
      this.list = data.list
      this.total = data.total
      this.loading = false
      this.isLoading = false
    },
    /**
       * 根据菜单查询信息
       */
    loadData (id) {
      this.page = 1
      this.searchKey = id
      this.getWrongsByType()
    }
  }
}
</script>

<style scoped lang="scss">
  .wrong-question {
    margin-top: 16px;

    .head {
      height: 60px;
    }

    .right {
      width: 780px;
    }

    .list {
      margin-left: 14px;

      .list-item {
        margin-bottom: 16px;
        padding: 16px;
        line-height: 32px;
        border-radius: 6px;
        border: 1px solid rgba(213, 216, 222, 1);
        position: relative;

        .showWrong {
          position: absolute;
          right: 16px;
        }
      }
    }

    .title {
      font-size: 20px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }

    .error {
      font-size: 16px;
      color: #E02020;
    }

    .time {
      font-size: 12px;
      color: #979797;
    }

    .paper-name {
      margin-top: 0;
      line-height: 32px;
      font-size: 20px;
    }

    .subject-name {
      line-height: 30px;
    }

    .dialog-content {
      line-height: 32px;
      margin-top: -30px;
      word-break: break-word;

      ul {
        font-size: 16px;
      }
    }
  }
</style>
