module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "chore", // Maintenance tasks
        "style", // Code style changes
        "docs", // Documentation changes
        "test", // Adding or updating tests
        "refactor", // Code refactoring
        "build", // Build-related changes
        "ci", // CI/CD changes
        "perf", // Performance improvements
      ],
    ],
    "scope-empty": [2, "never"], // Require a scope (e.g., ui, header)
    "subject-empty": [2, "never"], // Require a commit message
  },
};
