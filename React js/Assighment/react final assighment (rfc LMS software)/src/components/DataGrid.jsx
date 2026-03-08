import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { IconButton } from './Button';
import '../styles/components.css';

export const DataGrid = ({
  columns,
  rows = [],
  onEdit,
  onDelete,
  loading = false,
  pagination = true,
  pageSize = 10
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure rows is always an array
  const safeRows = Array.isArray(rows) ? rows : [];

  const paginatedRows = pagination
    ? safeRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : safeRows;

  const totalPages = Math.ceil(safeRows.length / pageSize);

  return (
    <div className="data-grid-container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : rows.length === 0 ? (
        <div className="empty-state">No data found</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="data-grid">
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col.field}>{col.headerName}</th>
                  ))}
                  {(onEdit || onDelete) && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row, idx) => (
                  <tr key={row.id || idx}>
                    {columns.map(col => (
                      <td key={col.field}>
                        {col.render ? col.render(row[col.field], row) : row[col.field]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="actions-cell">
                        {onEdit && (
                          <IconButton
                            icon={FiEdit2}
                            onClick={() => onEdit(row)}
                            title="Edit"
                          />
                        )}
                        {onDelete && (
                          <IconButton
                            icon={FiTrash2}
                            onClick={() => onDelete(row.id)}
                            title="Delete"
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
