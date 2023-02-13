import React from 'react';

const FormInputLabel = (props) => {
    return (
        <div className="mt-5 mx-5">
            <label className="block mb-2  text-lg font-medium text-gray-900">{props.children}</label>
            <input onChange={props.onChange}
                type={props.type}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder={props.placeholder} />
        </div>
    );
}

export default FormInputLabel;