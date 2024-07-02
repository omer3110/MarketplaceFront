import React from "react";
import PropTypes from "prop-types";

function Button({
  type = "button",
  onClick,
  className = "",
  children,
  variant = "primary",
  disabled = false,
}) {
  const baseStyle =
    "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    delete: "bg-red-500 hover:bg-red-700 text-white",
    create: "bg-green-500 hover:bg-green-700 text-white",
  };

  const disabledStyle = "bg-gray-300 text-gray-500 cursor-not-allowed";
  const variantStyle = disabled
    ? disabledStyle
    : variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "delete", "create"]),
  disabled: PropTypes.bool,
};

export default Button;
