const getLR = value => {
  return `
      padding-left: ${value};
      padding-right: ${value};
    `;
};
export default function(
  selector = '',
  { layout, breakpoint: bp },
  { overrides = {} } = {}
) {
  const { lrPaddingMobile, lrPaddingBase, grid } = layout;
  const lrMobile = getLR(lrPaddingMobile);
  const lrMedium = getLR(lrPaddingBase);
  const { maxWidth } = overrides;
  return `
  ${selector} {
    ${lrMobile}
    max-width: ${
      typeof maxWidth == 'string'
        ? maxWidth
        : parseInt(grid.width) - parseInt(lrPaddingMobile) + 'px'
    };
  }
  @media only screen and (min-width: ${bp.medium}){
    ${selector} {
      ${lrMedium}
      margin-left: auto;
      margin-right: auto;
    }
  }
  `;
}
