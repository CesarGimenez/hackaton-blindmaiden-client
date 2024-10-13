import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DeleteUserApi } from "@/api/Users.api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Employee } from "@/types/employee.types";

interface PropsTable {
  employees: Employee[];
  openModal: (employee: Employee) => void;
  refetch: () => void;
}

const TableEmployees = ({ employees, openModal, refetch }: PropsTable) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const mutationDelete = useMutation({
    mutationFn: (id: number) => DeleteUserApi(id),
    onMutate: () => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (data.typeError) {
        toast.error(data.message, {
          toastId: "eqmwg",
        });
      } else {
        toast.success(data.message, {
          toastId: "eqmwg",
        });
        refetch();
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message, {
        toastId: "eqmwg",
      });
    }
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", paddingX: "20px" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>Nombre y Apellido</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Documento de identidad</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Telefono</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Rol</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Estatus</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.length > 0 &&
              employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => {
                  const isActive = employee.active;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={employee.id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell align="center">{employee.document}</TableCell>
                      <TableCell align="center">{employee.phone}</TableCell>
                      <TableCell align="center">{employee.type}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <span
                          className={`${
                            isActive ? "bg-emerald-600" : "bg-red-600"
                          } text-white rounded-lg px-4 py-2`}
                        >
                          {isActive ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex flex-row justify-center items-center gap-2">
                            <button className='bg-blue-600 text-white rounded-lg px-4 py-2' onClick={() => openModal(employee)}><ModeEditIcon /></button>
                            <button className='bg-red-600 text-white rounded-lg px-4 py-2' onClick={() => mutationDelete.mutate(employee.id)}><DeleteIcon /></button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableEmployees;
