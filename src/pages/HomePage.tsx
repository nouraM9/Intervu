import { useState } from "react"
import Card from "../assets/components/Card"
import { Link } from "react-router";

function HomePage() {
    const [name, setName] = useState<string>('Noura');
    const [resumeStatus , setResumeStatus] = useState<string>('Not Uploaded');
    const [latestScore,setLatestScore] = useState<number>(0); 
    const [totalInterviewsCount , setTotalInterviewCount] = useState<number>(0);
  return (
    <>
    <h1 className="text-blue-500 text-center ">Welcome {name}</h1>
    <section className="flex flex-col justify-center items-center h-screen">
    <div className="grid grid-cols-3 gap-5">
        <Card>
            <h3>Resume Status </h3>
            <h3 className="mb-3">{resumeStatus}</h3>
            <input type="file" />


        </Card>
        <Card>
            <h3>latest Score</h3>
            <h3>{latestScore}</h3>
        </Card>
        <Card>
            <h3>Total Interviews </h3>
            <h3>{totalInterviewsCount}</h3>
        </Card>

    </div>

        <Link to = '/interview-setup' className="bg-blue-600 text-white p-2 rounded d-block" >Start Interview</Link>

    </section>
    
    </>
  )
}

export default HomePage