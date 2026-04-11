const URL_REGEX = /(https?:\/\/[^\s<]+)/gi;

function trimTrailingPunctuation(url) {
  const match = url.match(/[),.;!?]+$/);
  if (!match) return { url, trailing: '' };

  const trailing = match[0];
  return {
    url: url.slice(0, -trailing.length),
    trailing
  };
}

export function splitTextWithLinks(text) {
  const input = text ?? '';
  const parts = [];
  let lastIndex = 0;

  for (const match of input.matchAll(URL_REGEX)) {
    const fullMatch = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: 'text', value: input.slice(lastIndex, index) });
    }

    const { url, trailing } = trimTrailingPunctuation(fullMatch);
    if (url) {
      parts.push({ type: 'link', value: url });
    }
    if (trailing) {
      parts.push({ type: 'text', value: trailing });
    }

    lastIndex = index + fullMatch.length;
  }

  if (lastIndex < input.length) {
    parts.push({ type: 'text', value: input.slice(lastIndex) });
  }

  return parts.length ? parts : [{ type: 'text', value: input }];
}
