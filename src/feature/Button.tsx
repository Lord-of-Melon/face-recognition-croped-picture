type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <div>
        <div className="flex justify-start items-center">
          <button 
            className={`bg-blue-500 hover:text-black text-balance text-white font-bold py-2 px-4 m-1 rounded-md active:scale-95 transition duration-300 delay-50`} 
            onClick={props.onClick}
          >
              {props.children}
          </button>
        </div>
    </div>
  );
};

export default Button;
