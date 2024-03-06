"use client"
import 'react-data-grid/lib/styles.css';

import DataGrid, { RenderCellProps, RenderEditCellProps, RenderRowProps, Row, textEditor } from 'react-data-grid';
import { useState } from 'react';

type RowType = {
  name: string,
  account: string,
  password: number,
  errorMessage?: string,
  [key: string]: string | number | undefined
}

const Test = (props: RenderCellProps<RowType>) => {
  const { row, column } = props
  const { key } = column

  console.log(row)

  if (row.errorMessage) {
    return <div style={{ background: "yellow" }}>{row[key]}</div>
  }
  return <div>{row[key]}</div>
}


const TextEditor = (props: RenderEditCellProps<RowType>) => {
  const { row, column } = props
  const { key } = column
  console.log(props)

  if (row.errorMessage) {
    return <div style={{ background: "yellow" }}>{row[key]}</div>
  }
  return <div>{row[key]}</div>
}



const columns = [
  { key: 'name', name: '이름', renderEditCell: TextEditor, renderCell: Test },
  { key: 'account', name: '계정', renderEditCell: textEditor, renderCell: Test },
  { key: 'password', name: '비밀번호', renderEditCell: textEditor, renderCell: Test }
];



const rowsData: RowType[] = [
  { name: '1', account: 'test1@naver.com', password: 1234, errorMessage: '계정 수정해주셈' },
  { name: '2', account: 'test2@naver.com', password: 3452 },
  { name: '3', account: 'test3@naver.com', password: 1234234, errorMessage: '계정 수정해주셈' },
];


function myRowRenderer(key: React.Key, props: RenderRowProps<RowType>) {
  return (
    <Row {...props} key={key} />
  );
}


export default function Home() {
  const [rows, setRows] = useState(rowsData);

  const handleDeleteRow = (rowIdx: number) => {
    setRows([...rows.slice(0, rowIdx), ...rows.slice(rowIdx + 1)]);
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      onRowsChange={setRows}
      renderers={{ renderRow: myRowRenderer }}
      onCellContextMenu={({ row }, event) => {
        event.preventGridDefault();
        console.log(row, event)
      }}

    />

  );
}
