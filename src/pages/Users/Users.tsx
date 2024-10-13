import { GetUsersApi } from "@/api/Users.api";
import { CommonHeader } from "@/components";
import CustomModal from "@/components/Modal/UserModal";
import TableUsers from "@/components/Tables/TableUsers";
import { UserEdit } from "@/types/user.types";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const UsersPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [userEdit, setUserEdit] = useState<UserEdit | null>(null);

  const { isSuccess, data, isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = GetUsersApi();
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const openModal = () => {
    setShowModal(true);
  }

  const openModalEdit = (user: UserEdit) => {
    setUserEdit(user);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="flex flex-col w-full px-5 py-10 min-h-screen">
      <div className="overflow-x-auto bg-white pb-10">
        <CommonHeader
          title="Listado de usuarios"
          buttonOne="Ingresar nuevo usuario"
          actionBtnOne={openModal}
        />
        {
            isFetching && <CircularProgress color="success" size={50} sx={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }} />
        }

        {
           isSuccess && data && !isFetching && <TableUsers users={data} openModal={openModalEdit} refetch={refetch}/>
        }
      </div>
      <CustomModal open={showModal} handleClose={closeModal} refetch={refetch} user={userEdit}/>
    </div>
  );
};

export default UsersPage;
