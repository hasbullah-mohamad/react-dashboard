import React from 'react';

const TableBody = props => {
  const { data, options } = props;

  const items = Object.keys(options);

  const childrenWithProps = (row, rowKey) => {
    return React.Children.map(props.children, function(child) {
      return React.cloneElement(child, { row, rowKey, options, items });
    });
  }

  if (typeof(data) === 'undefined') {
    return <tbody></tbody>
  }

  return (
    <tbody>
      { data.map((row, index) => ( 
        childrenWithProps(row, index) 
      ))}
    </tbody>
  )
}


export default TableBody;