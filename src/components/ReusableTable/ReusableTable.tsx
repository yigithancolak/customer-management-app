import { Skeleton } from '@mui/material'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import { useMemo } from 'react'
import { theme } from '../../styles/theme'
import { TitleCard } from '../TitleCard/TitleCard'
import { TableWrapper } from './TableWrapper'

interface ReusableTableProps<T> {
  data: T[] | undefined
  columns: ColumnDef<T>[]
  isFetching: boolean
  title: string
}

export const ReusableTable = <T,>(props: ReusableTableProps<T>) => {
  const { data = [], columns, isFetching, title } = props

  const tableColumns = useMemo(
    () =>
      isFetching
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton variant='text' />
          }))
        : columns,
    [isFetching, columns]
  )

  const tableData: T[] = useMemo(
    () => (isFetching ? Array(5).fill({}) : (data as T[])),
    [isFetching, data]
  )

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <TableWrapper>
      <TitleCard title={title} />
      <table style={{ width: '100%' }}>
        <thead style={{ backgroundColor: theme.palette.secondary.main }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}
