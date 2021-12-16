<template>
  <div>
    <h1>Luolicon</h1>
    <n-radio-group v-model="r18Mode">
      <n-radio-button :value="0">正常的</n-radio-button>
      <n-radio-button :value="1">不正常的</n-radio-button>
      <n-radio-button :value="2">我都要</n-radio-button>
    </n-radio-group>
    <n-input-group>
      <n-input v-model="keywords" placeholder="关键字"></n-input>
      <n-button type="primary" @click="fetchLuolicon">搜索</n-button>
    </n-input-group>
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
      <n-grid-item v-for="(item, index) in serverList" :key="index">
        <n-card  :title="item.title">
          <template #cover>
            <img :src="item.urls.original" />
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import httpClient from './utils/httpClient'
import serverConfig from '../serverConfig.json'
// import utils from './utils/utils'
import { NCard, NGrid, NGridItem, NRadioGroup, NRadioButton, NInput, NInputGroup, NButton } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NCard, NGrid, NGridItem, NRadioGroup, NRadioButton, NInput, NInputGroup, NButton
  },
  setup () {
    const serverList = ref<Array<any>>([])
    const keywords = ref<string>('')
    const r18Mode = ref<number>(0)
    const fetchLuolicon = async () => {
      const result = await httpClient.post(serverConfig.serverHost, {
        r18: 2,
        num: 30,
        keywords: keywords.value
      })
      serverList.value = result.data.data
    }
    onMounted(() => { fetchLuolicon() })
    return {
      serverList,
      r18Mode,
      keywords,
      fetchLuolicon
    }
  }
})
</script>

<style>
#app {
  height: 100%
}
.fullHeight{
  height:100%;
  overflow: hidden
}
html{
  height:100%
}
body{
  height:100%
}
</style>
