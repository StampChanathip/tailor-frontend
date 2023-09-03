export default {
  _type: "SpellCheck",
  flaggedTokens: [
    {
      offset: 0,
      token: "Hollo",
      type: "UnknownToken",
      suggestions: [
        {
          suggestion: "Hello",
          score: 0.732547848053522,
        },
      ],
    },
    {
      offset: 9,
      token: "nme",
      type: "UnknownToken",
      suggestions: [
        {
          suggestion: "name",
          score: 0.732547848053522,
        },
      ],
    },
    {
      offset: 16,
      token: "Stmp",
      type: "UnknownToken",
      suggestions: [
        {
          suggestion: "Stomp",
          score: 0.732547848053522,
        },
        {
          suggestion: "Stm",
          score: 0.6788228192870046,
        },
        {
          suggestion: "Stamp",
          score: 0.7213124504169743,
        },
      ],
    },
  ],
};
