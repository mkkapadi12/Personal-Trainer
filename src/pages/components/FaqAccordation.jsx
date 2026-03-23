import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FaqAccordion({ question, answer, value }) {
  return (
    <Accordion collapsible className="w-full">
      <AccordionItem value={value} className="border! w-full border-gray-300">
        <AccordionTrigger className="text-left px-4 font-semibold text-[15px] hover:no-underline border-b shadow-none rounded-none">
          {question}
        </AccordionTrigger>

        <AccordionContent className="text-gray-600 text-sm leading-relaxed p-2">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
