/* eslint-disable react/prop-types */

const Button = ({ children, type = 'button', variant = 'primary', onClick }) => {
    const variants = {
        primary: 'bg-gradient-to-r from-pink-500 to-violet-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-300 hover:bg-gray-100 ',
        secondary: 'bg-gray-200 text-gray-700 py-2 px-4 rounded-md focus:outline-none hover:bg-gray-300',
        outline: 'border border-blue-500 text-blue-500 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 hover:bg-blue-500 hover:text-white',
    };

    const selectedVariant = variants[variant];

    return (
        <button type={type} className={selectedVariant} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
