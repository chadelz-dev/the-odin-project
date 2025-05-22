// ////////////////////////////////////////////////////////////////////////////

// example 3: named exports:

// named exports for blog formatting
export const uppercaseTitle = (title) => title.toUpperCase();

export const shortenContent = (content, maxLength = 100) =>
  content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
