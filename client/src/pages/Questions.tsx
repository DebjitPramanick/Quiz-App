import React from "react";
import { PageLayout, QuestionPageLayout } from "../styles/layouts";
import { QuestionSection } from "../styles/pages";
import Option from "../components/Option";
import { Button, QuestionText } from "../styles/component";

const Questions = () => {
  return (
    <PageLayout>
      <QuestionPageLayout>
        Dec
        <QuestionSection>
          <QuestionText>What is your name?</QuestionText>
          {[1, 2, 3, 4].map((_option) => (
            <Option />
          ))}
          <Button style={{margin: "auto"}}>Next</Button>
        </QuestionSection>
      </QuestionPageLayout>
    </PageLayout>
  );
};

export default Questions;
