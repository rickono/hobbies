"use client";

import { Card } from "components/ui/card";
import { useState } from "react";
import { InitialAdd } from "./InitialAdd/InitialAdd";
import { ReviewRecipe } from "./ReviewRecipe/ReviewRecipe";
import { RecipeFormData } from "./types";

export const AddRecipe = () => {
  const [data, setData] = useState<RecipeFormData | null>(null);
  const [step, setStep] = useState<"initial" | "review">("initial");

  return (
    <Card>
      <InitialAdd
        show={step === "initial"}
        onSubmit={(d) => {
          setData(d);
          setStep("review");
        }}
      />
      {step === "review" && data && (
        <ReviewRecipe
          initialRecipe={data}
          onCancel={() => {
            setData(null);
            setStep("initial");
          }}
        />
      )}
    </Card>
  );
};
