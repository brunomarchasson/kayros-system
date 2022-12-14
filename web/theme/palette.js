
/**
 * Customized Material UI color palette.
 *
 * @see https://mui.com/customization/palette/
 * @see https://mui.com/customization/default-theme/?expand-path=$.palette
 */
const createPalette = (mode) => ({
  mode,
  background: {
    default: mode === "light" ? "rgba(242,246,252,1)" : "#121212",
  },
});

export { createPalette };
