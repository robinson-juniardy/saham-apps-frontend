import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h3`
  font-family: Century Gothic;
`;

function PageTitle({ title }) {
  return <Title>{title}</Title>;
}

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;
