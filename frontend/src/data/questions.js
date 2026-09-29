const questions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Array",
    pattern: "HashMap",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
  },

  {
    id: 2,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Array",
    pattern: "Greedy",
    companies: ["Amazon", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },

  {
    id: 3,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Array",
    pattern: "HashSet",
    companies: ["Amazon", "Google"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/contains-duplicate/",
  },

  {
    id: 4,
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "String",
    pattern: "HashMap",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/valid-anagram/",
  },

  {
    id: 5,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    pattern: "Stack",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/valid-parentheses/",
  },

  {
    id: 6,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Array",
    pattern: "Kadane's Algorithm",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/maximum-subarray/",
  },

  {
    id: 7,
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "String",
    pattern: "HashMap",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/group-anagrams/",
  },

  {
    id: 8,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Array",
    pattern: "Prefix Product",
    companies: ["Amazon", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/product-of-array-except-self/",
  },

  {
    id: 9,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "String",
    pattern: "Sliding Window",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },

  {
    id: 10,
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    topic: "String",
    pattern: "Sliding Window",
    companies: ["Google", "Amazon"],
    importance: "Medium",
    leetcodeUrl:
      "https://leetcode.com/problems/longest-repeating-character-replacement/",
  },

  {
    id: 11,
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    pattern: "Binary Search",
    companies: ["Amazon", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/binary-search/",
  },

  {
    id: 12,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    pattern: "Modified Binary Search",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },

  {
    id: 13,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Pointer Manipulation",
    companies: ["Amazon", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/reverse-linked-list/",
  },

  {
    id: 14,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Two Pointers",
    companies: ["Amazon", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/merge-two-sorted-lists/",
  },

  {
    id: 15,
    title: "Linked List Cycle",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Fast and Slow Pointers",
    companies: ["Amazon", "Google"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/linked-list-cycle/",
  },

  {
    id: 16,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topic: "Tree",
    pattern: "DFS",
    companies: ["Amazon", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
  },

  {
    id: 17,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Tree",
    pattern: "BFS",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  },

  {
    id: 18,
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graph",
    pattern: "DFS",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/number-of-islands/",
  },

  {
    id: 19,
    title: "Clone Graph",
    difficulty: "Medium",
    topic: "Graph",
    pattern: "BFS",
    companies: ["Amazon", "Google"],
    importance: "Medium",
    leetcodeUrl:
      "https://leetcode.com/problems/clone-graph/",
  },

  {
    id: 20,
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    pattern: "1D DP",
    companies: ["Amazon", "Google"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/climbing-stairs/",
  },

  {
    id: 21,
    title: "House Robber",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    pattern: "1D DP",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/house-robber/",
  },

  {
    id: 22,
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    pattern: "Unbounded Knapsack",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/coin-change/",
  },

  {
    id: 23,
    title: "Subsets",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Backtracking",
    companies: ["Amazon", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/subsets/",
  },

  {
    id: 24,
    title: "Combination Sum",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Backtracking",
    companies: ["Amazon", "Google"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/combination-sum/",
  },

  {
    id: 25,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Array",
    pattern: "Two Pointers",
    companies: ["Amazon", "Google", "Microsoft"],
    importance: "High",
    leetcodeUrl:
      "https://leetcode.com/problems/trapping-rain-water/",
  },
];

export default questions;