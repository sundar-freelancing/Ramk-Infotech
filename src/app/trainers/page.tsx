import { trainers } from "@/constant/staticTrainers";
import { Container } from "@/components/ui/Container";
import { TrainersCards } from "@/components/common/TrainersCards";

export default function Trainers() {
  console.log(trainers);
  return (
    <Container>
      {!trainers || trainers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No trainers available at the moment.
          </p>
        </div>
      ) : (
        <TrainersCards trainers={trainers} />
      )}
    </Container>
  );
}
