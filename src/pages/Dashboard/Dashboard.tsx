/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetMyInfoApi } from "@/api/Users.api";
import { CardInfo, CardInfoTwo } from "@/components";
import { useAuthStore } from "@/store";
import useAppointmentStore from "@/store/AppointmentStore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimeToLeaveIcon from "@mui/icons-material/AccessTimeTwoTone";
import CancelIcon from "@mui/icons-material/Cancel";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const Dashboard = () => {
  const userId = useAuthStore((state) => state.user?._id);
  const setAppointments = useAppointmentStore((state) => state.setAppointments);
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const data = await GetMyInfoApi(userId as string);
      if(data) {
        setAppointments(data?.appointments || []);
        return data;
      }
    },
  });

  return (
    <div className="flex-1 py-5 sm:px-5 mt-10">
      <h1 className="text-2xl font-semibold text-purple-700">Dashboard</h1>
      <motion.div
        className="py-5 bg-white px-4 rounded-lg mt-10"
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-2xl font-semibold mb-5 text-purple-600">
          Tu medico de cabecera
        </h1>
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-around">
          <div className="flex flex-col items-center justify-center">
            <div className="overflow-hidden rounded-full w-20 h-20">
              <img
                src={data?.doctor?.image}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <p className="text-lg font-semibold text-gray-600">
              Nombre:{" "}
              <span className="text-purple-600">{data?.doctor?.name}</span>
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Matricula: <span className="text-purple-600">123456789</span>
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Correo:{" "}
              <span className="text-purple-600">{data?.doctor?.email}</span>
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Telefono:{" "}
              <span className="text-purple-600">{data?.doctor?.phone}</span>
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="lg:grid lg:grid-cols-3 lg:gap-4 py-5 space-y-5 lg:space-y-0"
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <CardInfo
          title="Citas medicas pendientes"
          content={data?.pendingAppointments}
          Icon={AccessTimeIcon}
          action={() => {}}
        />
        <CardInfo
          title="Citas medicas completadas"
          content={data?.completeAppointments}
          Icon={TimeToLeaveIcon}
          action={() => {}}
        />
        <CardInfo
          title="Citas medicas canceladas"
          content={data?.canceledAppointments}
          Icon={CancelIcon}
          action={() => {}}
        />
        <CardInfo
          title="Progreso del tratamiento"
          content={`${data?.progress}%`}
          Icon={PlaylistAddCheckCircleIcon}
          message={data?.message}
          action={() => {}}
        />
        <CardInfo
          title="Documentos"
          content="3"
          Icon={ChecklistRoundedIcon}
          action={() => {}}
        />
      </motion.div>

      {data?.goals && data?.goals?.length > 0 ? (
        <motion.div variants={variants} initial="hidden" animate="visible">
          <h1 className="text-2xl font-semibold mb-5">Tus logros</h1>
          {data.goals.map((goal: any, index: number) => (
            <CardInfoTwo
              key={index}
              title={goal.name}
              content={goal.content}
              date={goal.createdAt}
              Icon={goal.Icon}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-600">
            A medida que avances con tu tratamiento, podras lograr tus objetivos
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
