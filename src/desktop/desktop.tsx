import React from 'react'
import { Button } from '@mui/material'
import { triggers } from '../types'
import ReactDOM from 'react-dom/client'
import { getKintoneRestAPIClient } from '../modules'
import { Record } from '@kintone/rest-api-client/lib/client/types'

const { index, detail, edit } = triggers
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

kintone.events.on(index, async event => {
  const element = kintone.app.getHeaderMenuSpaceElement() as HTMLElement
  const root = ReactDOM.createRoot(element)
  root.render(
    <Button
      variant='contained'
      onClick={async () => {
        console.log('click')
        await RecordCheck()
      }}>
      ???
    </Button>,
  )
  return event
})

async function RecordCheck() {
  const appId = kintone.app.getId() as number
  const client = await getKintoneRestAPIClient()

  const records = await client.record.getAllRecords({ app: appId })
  const origins = []
  const duplicates = []

  for (let record of records) {
    const recordId = record.??????????????????.value
    const phoneNumber = record.????????????.value
    record.?????????????????????.value = '?????????'
    record.????????????.value = '0'
    record.inout.value = 'out'
    record.?????????.value = '?????????????????????'
    record.????????????????????????.value = yenFormat(record.??????????????????.value)
    record.?????????????????????.value = yenFormat(record.???????????????.value)
    const duplicateArray = records.filter(r => r.??????????????????.value != recordId && r.????????????.value === phoneNumber)
    record.????????????????????????.value = '' + duplicateArray.length
    !duplicateArray.length ? origins.push(record) : duplicates.push(record)
  }

  let listNo: number = 1
  let listCount: number = 0
  if (duplicates.length) {
    const newOrigins = [...origins]
      .sort((a, b) => a.????????????.value - b.????????????.value)
      .map(record => {
        // console.log([listNo, listCount])
        if (listCount >= 100) {
          listCount = 0
          listNo++
        }
        record.???????????????.value = '' + listNo
        listCount++
        return record
      })
    listNo = 100
    listCount = 0
    const newDuplicates = [...duplicates]
      .sort((a, b) => {
        if (a.????????????.value > b.????????????.value) return 1
        if (a.????????????.value < b.????????????.value) return -1
        if (a.????????????.value > b.????????????.value) return 1
        if (a.????????????.value < b.????????????.value) return -1
      })
      .map(record => {
        if (listCount >= 100) {
          listCount = 1
          listNo++
        }
        record.???????????????.value = '' + listNo
        listCount++
        return record
      })
    const updateRecords = [...newOrigins, ...newDuplicates].map(record => {
      const recordId = record.??????????????????.value as string
      ;['??????????????????', '$id', '$revision', '?????????', '????????????', '?????????', '????????????'].forEach(
        fieldCd => delete record[fieldCd],
      )
      return { id: recordId, record: record }
    })
    const result = await client.record.updateAllRecords({ app: appId, records: updateRecords })
    console.log(result)
  }

  // const history = await client.record.getAllRecords({ app: 510 })
}

function yenFormat(_val: any) {
  const _string = String(_val)
  const _length = _string.length
  const _digits = ['', '???', '???', '???', '???', '???']
  let _result = ''
  let _results = []

  for (let i = 0; i < Math.ceil(_length / 4); i++) {
    _results[i] = Number(_string.substring(_length - i * 4, _length - (i + 1) * 4))
    if (_results[i] != 0) _result = String(_results[i]).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,') + _digits[i] + _result
  }
  return _result + '???'
}
