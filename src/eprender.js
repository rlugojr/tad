/* @flow */

import * as styles from '../less/easypivot.less'  // eslint-disable-line

import * as reltab from './reltab' // eslint-disable-line
import rtc from './reltab-electron'
import * as epslick from './epslick'
// import { Grid, Data, Formatters } from 'slickgrid-es6'
import PivotTreeModel from './PivotTreeModel'

console.log('Hello EasyPivot!')

const baseQuery = reltab.tableQuery('bart-comp-all')
  .project([ 'JobFamily', 'Title', 'Union', 'Name', 'Base', 'TCOE' ])
const {col, constVal} = reltab
const q5 = baseQuery.filter(reltab.and().eq(col('JobFamily'), constVal('Executive Management')))
rtc.evalQuery(q5)
  .then(res => {
    console.table(res.rowData)
  })
/*
const sq5 = JSON.stringify(q5, null, 2)
remoteQuery(sq5, res => {
  console.log('q5 evaluation completed, result: ', res)
  console.table(res.rowData)
})
*/
console.log('sent query to remoteQuery')
/*
, err => {
  console.error('q5 evaluation failed, error: ', err)
})
*/

var ptm = new PivotTreeModel(rtc, baseQuery, [ 'Union', 'JobFamily', 'Title' ])
ptm.openPath([])
/*ptm.openPath(['Non-Represented', 'Audit'])
ptm.openPath(['Non-Represented', 'Clerical'])
ptm.openPath(['Non-Represented', 'Information Systems'])
ptm.openPath(['Non-Represented', 'Information Systems', 'Manager of Information Systems'])
*/
const sgv = epslick.sgView('#epGrid', ptm)
const sgc = epslick.sgController(sgv, ptm)  // eslint-disable-line
