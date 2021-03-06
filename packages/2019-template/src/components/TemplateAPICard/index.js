import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import TemplateAPICardMeta from "./templateAPICardMeta";
import api from "../../state/template-api-data/api";

const TemplateAPICard = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = !isLoaded(data.ridershipOverTime);

  return (
    <CivicCard
      cardMeta={TemplateAPICardMeta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

TemplateAPICard.displayName = "TemplateAPICard";

TemplateAPICard.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ ridershipOverTime: resourceShape }),
  Layout: PropTypes.func
};

TemplateAPICard.tags = TemplateAPICardMeta().tags;

export default connect(
  state => ({
    data: {
      ridershipOverTime: api.selectors.getMockRidershipData(
        state.package2019Template || state
      )
    }
    // state.packageName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getMockRidershipData());
    }
  })
)(TemplateAPICard);
