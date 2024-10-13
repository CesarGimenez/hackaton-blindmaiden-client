interface Props {
  title: string;
  buttonOne?: string | null;
  buttonTwo?: string | null;
  actionBtnOne?: () => void;
  actionBtnTwo?: () => void;
}

const CommonHeader = ({
  title = "",
  buttonOne = null,
  buttonTwo = null,
  actionBtnOne = () => {},
  actionBtnTwo = () => {},
}: Props) => {
  return (
    <div className="flex flex-row justify-between w-full px-5 mt-10 py-10">
      <h1 className="text-2xl font-semibold mb-5">{title}</h1>
      {buttonOne && (
        <button
          className="bg-emerald-600 text-white p-2 rounded-lg mb-10"
          onClick={actionBtnOne}
        >
          {buttonOne}
        </button>
      )}
      {buttonTwo && (
        <button
          className="bg-emerald-600 text-white p-2 rounded-lg mb-10"
          onClick={actionBtnTwo}
        >
          {buttonTwo}
        </button>
      )}
    </div>
  );
};

export default CommonHeader;
