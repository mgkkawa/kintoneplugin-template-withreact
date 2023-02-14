const TriggerHead = 'app.record.'
const Index = TriggerHead + 'index.'
const Detail = TriggerHead + 'detail.'
const Create = TriggerHead + 'create.'
const Edit = TriggerHead + 'edit.'

const Show = '.show'
const Change = '.change.'
const Submit = '.submit'
const Success = Submit + '.success'

const isString = (str: string | string[]): str is string => typeof str === 'string'
const toStringArray = (str: string | string[]): string[] => (isString(str) ? [str] : str)
const createChangeEvent = (Trigger: string, fieldCd: string) => TriggerHead + Trigger + Change + fieldCd
const createMap = (Trigger: string, fieldCds: string | string[]) => {
  const codes = toStringArray(fieldCds)
  return codes.map(code => createChangeEvent(Trigger, code))
}

export const triggers = {
  index: Index + Show,
  detail: Detail + Show,
  create: {
    show: Create + Show,
    change: (fieldCds: string | string[]) => createMap(Create, fieldCds),
    submit: Create + Submit,
    success: Create + Success,
  },
  edit: {
    show: Edit + Show,
    change: (fieldCds: string | string[]) => createMap(Edit, fieldCds),
    submit: Edit + Submit,
    success: Edit + Success,
  },
}
