function FormItem(props) {

  if(props.type) {
    return (
      <div className="form-item">
      <label htmlFor="exampleFormControlSelect1">{`${props.label}:`}</label>
      <input 
        type={props.type} 
        className="form-control" 
        {
          ...props.disable ? 
          {disabled: true} :
          {disabled: false}
        }
        id={`${props.label}`}
        placeholder={`Ingrese ${props.label}`} 
      />
    </div>
    )
  } else if(props.select) {
    return (
      <div className="form-item">
        <label>{`${props.label}:`}</label>
        <select defaultValue="0">
          <option value="0" disabled>--Select Product--</option>
          {
            props.options.map((option, index) => {
              return (
                <option key={index} value={option.id}>{option.name}</option>
              )
            })  
          }
        </select>
      </div>
    )
  
  }
}

export default FormItem;