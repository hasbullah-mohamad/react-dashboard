import React from 'react';

const TableHeaderCol = props => {
  const { options, nested, handleAddSearchParam, search } = props;

  const items = Object.keys(options);
  return (
    items.map((item, key) => {
      if (options[item]['type'] === 'nested object') {
        return (
          <TableHeaderCol 
            key={key} 
            options={options[item]['children']} 
            nested={item.replace('_nested','')} 
            handleAddSearchParam={handleAddSearchParam} 
            search={search}
          />
        )
      } else {
        const itemValues = options[item];
        return (
          <th scope="col" key={key} >
            { search ? 
              <a href="/" name={nested ? `${nested}__${item}` : item} onClick={handleAddSearchParam}>{itemValues['label']}</a>
              : itemValues['label']
            }
          </th>
        )
      }
    })
  )
} 

const TableHeader = props => {

  return (
    <thead>
      <tr>
        <TableHeaderCol {...props} />
      </tr>
    </thead>
  )
} 

export default TableHeader;