import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "~/components/ui/alert-dialog"
  import { Button } from "~/components/ui/button"
import { ScrollAreaDemo } from "./LinkScrollArea"

  
  export function AlertDialogLinks({links}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Question Review</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-[80%] min-w-[70%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Questions</AlertDialogTitle>
            <AlertDialogDescription className="h-[88%]">
                <ScrollAreaDemo links={links} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="absolute bottom-0 right-0 mb-4 mr-4">
            <AlertDialogAction>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  