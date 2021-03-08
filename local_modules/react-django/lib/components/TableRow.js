import React from 'react';
import { Link, withRouter } from 'react-router-dom'


const TableRowCol = props => {
  const {items, row, options, editable, history} = props

  return items.map((item, key) => {
    if (options[item]['type'] === 'nested object') {
      const child_items = Object.keys(options[item]['children']);
      return <TableRowCol key={key} options={options[item]['children']} items={child_items} row={row[item]} />;
    } else if ((options[item]['type'] === "boolean") && (row[item])) {
      return <td key={key}><span style={{color: 'red'}}>X</span></td>
    } else if (options[item]['type'] === "datetime") { 
      return <td key={key}>{ row[item] ? new Date(row[item]).toLocaleString('en-GB') : '' }</td>
    } else if (item === "id" && editable) {
      return <th key={key} scope="row"><Link to={`${history.location.pathname}/${row[item]}`} onClick={(event) => event.stopPropagation()}>{row[item]}</Link></th>
    } else {
      return <td key={key}>{row[item]}</td>
    }
  })
}

const TableRow = props => {
  return (
    <tr 
      key={props.rowKey} 
      onClick={() => { if (props.historyClick) return props.history.push(`${props.location.pathname}/${props.row.id}/history`)}}
    >
      <TableRowCol {...props} />
    </tr>
  )
}


export default withRouter(TableRow);