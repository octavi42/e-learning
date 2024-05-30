import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "~/components/ui/accordion"
  
  export function AccordionDemo({categories}) {
    return (
      <Accordion type="single" collapsible className="w-1/2">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            <AccordionContent>
              <p>{category.summary}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }
  