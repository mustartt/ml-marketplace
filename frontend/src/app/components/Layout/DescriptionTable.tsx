import React from 'react';

interface DescriptionTableProps {
  table: TableRowType[];
}

export type TableRowType = {
  name: string;
  value: string | JSX.Element;
}

const TableRow: React.FC<TableRowType> = ({name, value}) => {
  return (
    <tr>
      <td>{name}:</td>
      <td>{value}</td>
    </tr>
  );
};

const DescriptionTable: React.FC<DescriptionTableProps> = ({table}) => {
  return (
    <div className="bg-gray-100 text-gray-700 text-sm px-2 pt-2 pb-4 rounded-md max-w-md w-full shadow">
      <table className="table-auto w-full">
        <tbody>
        {
          table.map((row, index) =>
            <TableRow key={index} name={row.name} value={row.value}/>)
        }
        </tbody>
      </table>
    </div>
  );
};

export default DescriptionTable;