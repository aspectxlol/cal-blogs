// import { Progress } from "@material-tailwind/react"
import { ProgressBar } from 'react-bootstrap'

export default function Stats({
  data
}: {
    data: {
      [key: string]: number
    }
  }) {
  const variants = ['success', 'info', 'warning', 'danger']
  
  
  return (
    <div className="flex w-96 gap-4 flex-col p-2 border-2 rounded">
      {/* <Progress value={50} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} placeholder={""}/> */}
      {/* <ProgressBar now={60} label={`Math`} animated/> */}
      {Object.keys(data)
        .map((v) =>
          <ProgressBar
            key={v}
            now={data[v]}
            label={`${v} ${data[v]}%`}
            variant={variants[Math.floor(Math.random() * variants.length)]}
            animated
            
          />
        )}
    </div>
  )
}