import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { numberWithDots } from './../helpers/index';

const Lists = props => {
  const { rows, rowHeight, tableHeight } = props;
  const columns = Object.keys(rows[0]);
  const heightTablebody = rowHeight * rows.length;
  const [scroll, setScroll] = useState({
    top: 0,
    index: 0,
    end: Math.ceil(tableHeight * 2 / rowHeight),
  }); 

  // onScroll
  const onScroll = ({ target }) => {
    const { scrollTop } = target;
    const index = Math.floor(scrollTop / rowHeight);
    const tempScroll = { ...scroll };

    tempScroll.index = index;
    tempScroll.end = index + Math.ceil((tableHeight * 2) / rowHeight);
    tempScroll.top = (scrollTop / rowHeight) * rowHeight;

    setScroll(tempScroll);
  }

  // calcalated Rows
  const calcalatedRows = () => {
    const tempScroll = { ...scroll };
    let { index } = tempScroll;
    const { end } = tempScroll;
    let tempRows = [];

    do {
      if (index >= rows.length) {
        index = rows.length;
        break;
      }
      // style for row of table
      const rowAttrs = {
        style: {
          position: 'absolute',
          top: (index * rowHeight),
          left: 0,
          height: rowHeight,
          lineHeight: `${rowHeight}px`
        },
        className: `tr ${(index % 2) === 0 ? 'tr-odd' : 'tr-even'}`
      }

      const rowsIndex = rows[index];
      const trNode = (
        <tr { ...rowAttrs } key={index}>
          {columns.map((column, i) => (
            <td key={i}>
              {
                column === 'id'
                  ?
                  numberWithDots(rowsIndex['id'])
                  : 
                  rowsIndex[column]
              }
            </td>)
          )}
        </tr>
      );
      tempRows.push(trNode);

      index++;
    } while (index < end)

    return tempRows;
  }
  return (
    <>
      <table className="table-header">
        <thead>
          <tr className="tr">
            {columns.map((name, i) =>
              <th key={i}>{name}</th>
            )}
          </tr>
        </thead>
      </table>
      <table
        className = "table-content"
        style = {{
          height: tableHeight > heightTablebody ?
            heightTablebody + 2
            :
            tableHeight
        }}
        onScroll = { onScroll }
      >
        <tbody
          style = {{
            position: 'relative',
            display: 'inline-block',
            height: heightTablebody,
            maxHeight: heightTablebody,
            width: '100%'
          }}
        >
          {calcalatedRows()}
        </tbody>
      </table>
    </>
  )
}

Lists.defaultProps = {
  rowHeight: 35, // default height of row is 35px
  tableHeight: 350 // default height of table is 350 // In order to see 10 rows are visibled
}

Lists.propTypes = {
  rowHeight: PropTypes.number.isRequired,
  tableHeight: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Lists;
