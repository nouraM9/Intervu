interface CardProps {
  children?: React.ReactNode;
}

function Card({children} :  CardProps) {
 
    return (
    <div className="border-2 mb-3 text-center py-5">{children}</div>
  )
}

export default Card