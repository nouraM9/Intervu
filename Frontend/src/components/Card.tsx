// import type { ReactNode } from "react";
import { FaCheck,FaTimes} from 'react-icons/fa'; // ✅ Correct
interface CardProps {
  title : string
  value : string | number

}

function Card({title,value} :  CardProps) {
 
    return (
<div className="rounded-3xl bg-white p-16 shadow-(--card-shadow) border border-(--border) relative">      
    <div className="absolute top-0 left-1.5 p-4 ">
          <h1 className="body-text-2 text-(--light-text)">{title}</h1>
        </div>
        <div className="absolute bottom-4 flex gap-4 items-center">
        {title === 'Resume' && (

        value === 'Uploaded' ?  <FaCheck /> : <FaTimes/>
        )}
          <h1 className="heading-2 text-(--text)">{value}</h1>
        </div>
        
   </div> 
   
  )
}

export default Card