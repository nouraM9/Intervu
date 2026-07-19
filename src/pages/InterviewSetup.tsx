import { useState } from "react"
import { Link } from "react-router";

function InterviewSetup() {
  const [type , setType] = useState<string>('');
  const [difficulty , setDifficulty] = useState<string>('')

const  handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    console.log(type)
  }
  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    setDifficulty(e.target.value);
    console.log(difficulty)
  }
  return (
    <>
      <h1 className="block">Set Up Your Mock Interview</h1>
    <div className=" flex flex-col justify-center items-center h-screen " >
      <div >
      <label htmlFor="label">Interview Type</label>
      <select 
      defaultValue='select' 
      className="bg-gray-300 rounded-2xl ml-2 select appearance-none px-2"  
      onChange={handleType}>
        <option value="select" disabled={true}>Select</option>
        <option value="FrontEnd">FrontEnd</option>
        <option value="BackEnd">BackEnd</option>
        <option value="System Desgin">System Design</option>
        <option value="Behavioral">Behavioral</option>

      </select>

      </div>

    <div>

         <label htmlFor="label">Difficulty</label>
      <select
       defaultValue='select' 
       className="bg-gray-300 rounded-2xl ml-2 select appearance-none px-2"
       onChange={handleDifficulty}
        >
        <option value="select" disabled={true}>Select</option>
        <option value="Junior">Junior</option>
        <option value="Med">Med</option>
        <option value="Senior">Senior </option>


      </select>
    </div>
      <div className="btn mt-3">
        <Link to = '/interview' className="bg-blue-600 text-white p-2 rounded d-block">Start Interview </Link>
      </div>
    </div>
    
    </>
  )
}

export default InterviewSetup