import React from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPasword?: boolean;
}

const InputText = ({ label, isPasword = false, ...props }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [type, setType] = React.useState('password');   

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className="relative">
      <label htmlFor={label} className="sr-only">
        {label}
      </label>
      <input
        id={label}
        required
        className="appearance-none mb-5 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        autoComplete="off"
        type={type}
        {...props}
      />
      {
        isPasword && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm z-5"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </div>
        )
      }
    </div>
  );
};

export default InputText;
