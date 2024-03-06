import React from 'react';
import { RenderEditCellProps } from 'react-data-grid';

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

type RowType = {
  name: string,
  account: string,
  password: number,
  errorMessage?: string,
  [key: string]: string | number | undefined
}


const TextEditor = ({
  row,
  column,
  onRowChange,
  onClose
}: RenderEditCellProps<RowType>) => {
  if (row.errorMessage) {
    return <input
      style={{ background: "red" }}
      ref={autoFocusAndSelect}
      value={row[column.key as keyof RowType] as unknown as string}
      onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true, false)}
      className='rdg-text-editor'
    />
  }
  return <input
    ref={autoFocusAndSelect}
    value={row[column.key as keyof RowType] as unknown as string}
    onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
    onBlur={() => onClose(true, false)}
    className='rdg-text-editor'
  />
}


export default TextEditor;