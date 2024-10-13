import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

export const commonRoutes = [
    { name: "Inicio", path: "/dashboard", icon: HomeOutlinedIcon },
    { name: "Especialistas", path: "/doctors", icon: MedicalInformationOutlinedIcon },
    { name: "Tratamiento", path: "/treatments", icon: MedicationOutlinedIcon },
    // { name: "Actividades", path: "/activities", icon: LocalShippingOutlinedIcon },
    // { name: "Tus logros", path: "/avance", icon: MonetizationOnOutlinedIcon },
    { name: "Mi carpeta", path: "/folder", icon: FolderCopyOutlinedIcon },
    { name: "Calendario", path: "/calendar", icon: CalendarMonthOutlinedIcon },
    { name: "IA", path: "/ia", icon: EngineeringOutlinedIcon },
]

export const doctorRoutes = [
    { name: "Pacientes", path: "/patients", icon: LocalShippingOutlinedIcon },
    { name: "Mi carpeta", path: "/folder", icon: FolderCopyOutlinedIcon },
    { name: "Calendario", path: "/calendar", icon: CalendarMonthOutlinedIcon },
]