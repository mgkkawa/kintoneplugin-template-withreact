import { triggers } from '../types'

const { detail, edit } = triggers
const config: PluginConfig = kintone.plugin.app.getConfig(kintone.$PLUGIN_ID)
const { changes, hiddens, resets, disableds } = config

const valueCheck = (record: any, terms: Terms): boolean => {
  const { target, arg, operand } = terms
  const { value } = record[target]
  if (!value) return false
  switch (operand) {
    case 0:
      return value == arg
    case 1:
      return value != arg
    case 2:
      return value <= arg
    case 3:
      return value >= arg
    case 4:
      return arg.includes(value)
    case 5:
      return !arg.includes(value)
    default:
      return false
  }
}

const fieldHiddens = (event: any, hiddens: HiddenField[] | undefined) => {
  if (!hiddens) return
  const { type, record } = event
  const isDetailTiming = type.includes('detail')

  for (let hidden of hiddens) {
    const { fieldCd, terms, isDetail } = hidden
    if (isDetailTiming && !isDetail) continue
    kintone.app.record.setFieldShown(fieldCd, terms ? valueCheck(record, terms) : true)
  }
}

const fieldResets = (event: any, resets: ResetField[] | undefined) => {
  if (!resets) return
  const { record } = event

  for (let reset of resets) {
    const { fieldCd, value, terms } = reset
    const field = record[fieldCd]
    const isSet = terms ? valueCheck(record, terms) : true
    field.value = isSet ? value : field.value
  }
}

const fieldDisableds = (event: any, disableds: DisableField[] | undefined) => {
  if (!disableds) return
  const { record } = event

  for (let disabled of disableds) {
    const { fieldCd, terms } = disabled
    if (!(fieldCd in record)) continue
    record[fieldCd].disabled = terms ? valueCheck(record, terms) : true
  }
}

const changeEvent = (change: ChangeEventProps) => {
  const { fieldCd, hiddens, resets, disableds } = change

  kintone.events.on(edit.change(fieldCd), event => {
    fieldHiddens(event, hiddens)
    fieldResets(event, resets)
    fieldDisableds(event, disableds)

    return event
  })
}

const changesEventSet = (changes: ChangeEventProps[]) => {
  for (let change of changes) {
    changeEvent(change)
  }
}

kintone.events.on(detail, async event => {
  fieldHiddens(event, hiddens)

  return event
})

kintone.events.on(edit.show, async event => {
  fieldHiddens(event, hiddens)
  fieldResets(event, resets)
  fieldDisableds(event, disableds)

  return event
})

if (changes) {
  changesEventSet(changes)
}
