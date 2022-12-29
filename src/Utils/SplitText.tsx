export function splitText(originalText: string) {
  const splitedArray = originalText.split("");

  const lastValue = splitedArray.map((letter, index) => {
    return (
      <span
        className="animatedLetter"
        key={`${index}-${originalText}-span-${letter}`}
      >
        {letter}
      </span>
    );
  });

  return lastValue;
}
