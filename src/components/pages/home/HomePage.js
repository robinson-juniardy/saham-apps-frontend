import React from "react";
import PageTitle from "../../partials/PageTitle";
import PageWrapper from "../../partials/PageWrapper";

const HomePage = () => {
  return (
    <div>
      <PageTitle title="Home Page" />
      <PageWrapper breadCrumbsItems={[{ label: "Home" }]}>
        this is home page
      </PageWrapper>
    </div>
  );
};

export default HomePage;
