export const copyToClipboard = (text) => {
  try {
    window.navigator.clipboard.writeText(text);
    console.log(`OK -- copied text '${text}' (${text.length} B) to clipboard`);
    return text.length;
  } catch (e) {
    console.error("clipboard copy failed with", e);
    return 0;
  }
};
