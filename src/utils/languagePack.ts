import serverConfig from '../../serverConfig.json'
import utils from './utils'

interface languageType { zh: string, en: string }

let currentLang = serverConfig.lang

if (!utils.isNull(sessionStorage.getItem('lang'))) {
  currentLang = sessionStorage.getItem('lang') || 'zh'
}

function translate (fieldName: string) {
  if (utils.isNull(fieldName)) { return fieldName }

  const words = fieldName.split(' ')

  let result = ''

  words.forEach((word: string) => {
    const tempWord = languagePacks.get(word)
    result += tempWord === undefined ? word : tempWord[currentLang === 'en' ? 'en' : 'zh']
  })

  return result
}

const languagePacks:Map<string, languageType> = new Map<string, languageType>()

languagePacks.set('undefined', { zh: '未知', en: 'unknown' })
languagePacks.set('null', { zh: '空', en: 'null' })
languagePacks.set('', { zh: '空', en: 'null' })
languagePacks.set('Dark', { zh: '深色', en: 'Dark' })
languagePacks.set('Light', { zh: '浅色', en: 'Light' })
languagePacks.set('Mode', { zh: '模式', en: 'Mode' })
languagePacks.set('zh', { zh: '中文', en: 'zh' })
languagePacks.set('en', { zh: '英文', en: 'en' })
languagePacks.set('On', { zh: '开', en: 'On' })
languagePacks.set('Off', { zh: '关', en: 'Off' })
languagePacks.set('User', { zh: '用户', en: 'User' })
languagePacks.set('Name', { zh: '名', en: 'Name' })
languagePacks.set('Please', { zh: '请', en: 'Please' })
languagePacks.set('Input', { zh: '输入', en: 'Input' })
languagePacks.set('Select', { zh: '选择', en: 'Select' })
languagePacks.set('Password', { zh: '密码', en: 'Password' })
languagePacks.set('Login', { zh: '登陆', en: 'Login' })
languagePacks.set('name', { zh: '名字', en: 'name' })
languagePacks.set('age', { zh: '年龄', en: 'age' })
languagePacks.set('time', { zh: '时间', en: 'time' })
languagePacks.set('submit', { zh: '提交', en: 'submit' })
languagePacks.set('Action', { zh: '操作', en: 'Action' })
languagePacks.set('add', { zh: '新增', en: 'add' })
languagePacks.set('edit', { zh: '编辑', en: 'edit' })
languagePacks.set('delete', { zh: '删除', en: 'delete' })
languagePacks.set('ok', { zh: '确定', en: 'ok' })
languagePacks.set('cancel', { zh: '取消', en: 'cancel' })

export default translate
