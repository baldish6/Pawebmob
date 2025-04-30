import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div>
        <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
  <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
    </div>
  )
}

export default App
