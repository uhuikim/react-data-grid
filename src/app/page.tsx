"use client"
import 'react-data-grid/lib/styles.css';

import DataGrid, { RenderCellProps, RenderEditCellProps, RenderRowProps, Row, textEditor } from 'react-data-grid';
import { useState } from 'react';
import TextEditor from '@/components/TextEditor';

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

  if (row.errorMessage) {
    return <div style={{ background: "yellow", height: "100px" }}>
      {row[key]}
      <p>악!!!!!계정 다시 입력해줘어어!!!</p>
    </div>
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
      onCellContextMenu={({ row }, event) => {
        event.preventGridDefault();
        console.log(row, event)
      }}

    />

  );
}
