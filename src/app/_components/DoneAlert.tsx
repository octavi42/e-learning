import { Terminal } from "lucide-react"
import { useRouter } from "next/navigation";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/components/ui/alert"
import { Button } from "~/components/ui/button"

export function AlertDemo() {

    const router = useRouter();

  return (
    <Alert variant="destructive" className="fixed w-1/3 bottom-0 right-0 m-10">
        <div className="w-full flex justify-center items-center">
            <AlertTitle>Congrats you're done with the questions!</AlertTitle>
            <Button onClick={() => {router.push("/evaluate/finish")}} className="ml-4">evaluate</Button>
        </div>
    </Alert>
  )
}
