import React from "react";
import { Collapsable } from "@hackoregon/component-library";

import HomeLoanApprovalsVisualization from "./HomeLoanApprovalsVisualization";

const HomeLoanApprovalsMeta = (/* data */) => ({
  title: "Card #2: Racial Demographics of Home Loan Approvals",
  slug: "home-loan-approvals",
  introText: <p>INTRO TEXT: TBD</p>,
  visualization: HomeLoanApprovalsVisualization, // data, isLoading are passed to this as props
  additionalText: <p>ADDITIONAL TEXT: TBD</p>,
  shareText: "TODO: Add share text!",
  tags: ["Housing", "Portland"],
  selector: null,
  analysis: (
    <Collapsable>
      <Collapsable.Section>
        <p>ANALYSIS: TBD</p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>ADD DETAILS HERE</p>
      </Collapsable.Section>
    </Collapsable>
  ),
  metadata: (
    <Collapsable>
      <Collapsable.Section>
        <p>METADATA: TBD</p>
      </Collapsable.Section>
      <Collapsable.Section hidden>
        <p>ADD DETAILS HERE</p>
      </Collapsable.Section>
    </Collapsable>
  ),
  resources: [
    {
      heading: "Organizations",
      items: [
        { link: "http://www.hackoregon.org", description: "Hack Oregon" },
        {
          link: "https://www.civicsoftwarefoundation.org",
          description: "Civic Software Foundation"
        },
        { link: "https://www.civicplatform.org", description: "Civic Platform" }
      ]
    }
  ],
  // authors likely an array of keys in the future
  authors: [
    "https://civicsoftwarefoundation.org/static/human-grid-test-4c90bfc3f316f5d4e104320cb98c43c8.png",
    "https://civicsoftwarefoundation.org/static/human-grid-test2-ea1849501456af341647068243fc72bb.png"
  ]
});

export default HomeLoanApprovalsMeta;