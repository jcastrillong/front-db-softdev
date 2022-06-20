import React from "react";

function FormItem( { ...rest }) {

  if(rest.type) {
    return (
      <div className="form-item">
      <label htmlFor="exampleFormControlSelect1">{`${rest.label}:`}</label>
      <input 
        {...rest}
      />
    </div>
    )
  } else {
    return (
      <div className="form-item">
        <label>{`${rest.label}:`}</label>
        <select {...rest}>
          <option value="0" disabled>--Select Product--</option>
          {
            rest.options.map((option) => {
              return (
                <option key={option.idProduct} id={option.idProduct}>{option.name}</option>
              )
            })  
          }
        </select>
      </div>
    )
  
  }
}

export default FormItem;