export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline,
    customClasses,
    type,

  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center hover:scale-95 transition duration-300 ${
          outline ? "border  border-yellow-50 bg-transparent text-white" : "bg-blue-50 text-black"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }