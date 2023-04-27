import React from "react";
import PageTitle from "../../partials/PageTitle";
import PageWrapper from "../../partials/PageWrapper";

const AboutPage = () => {
  return (
    <div>
      <PageTitle title="About Page" />
      <PageWrapper breadCrumbsItems={[{ label: "About" }]}>
        this is about page
      </PageWrapper>
    </div>
  );
};

export default AboutPage;
