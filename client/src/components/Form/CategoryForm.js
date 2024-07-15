import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-75 d-flex ">
          <input
            type="text"
            className="form-control rounded-0 "
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
           <button style={{fontSize:'13px'}} type="submit" className="btn btn btn-dark rounded-0 ms-2  ">
         Add
        </button>
        </div>

       
      </form>
    </>
  )
}

export default CategoryForm