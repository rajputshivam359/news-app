import React from 'react'

const Newsitems =(props)=> {
    
  
    let {title, description,imageurl,newsurl,author,date,source}= props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
    {source}
    
  </span>
           <img className="card-img-top" src={!imageurl?"https://static.toiimg.com/photo/109387283.cms":imageurl} alt="Card image cap"/>
        <div className="card-body">
           <h5 className="card-title">{title}</h5>
           <p className="card-text">{description}</p>
           <p className="card-text"><small className="text-success">By {!author?"unknown":author} on {date}</small></p>
           <a  rel="noreferrer" href={newsurl}  target="_blank"className="btn btn-sm btn-dark">Read More</a>
          </div>
         </div>
        
      </div>
    )
  
}

export default Newsitems