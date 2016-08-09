export const getDAttribute = (x, y, isCustom) => `M${x} ${y - (isCustom ? 5 : 0)} L${x} ${y + (isCustom ? 35 : 30)}`;
