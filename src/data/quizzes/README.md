# Quiz Configuration Guide
This file defines a quiz flow setup. 
The file name is important — it determines the static route.
For example, `personality-check.json` will be available at `/personality-check`.
---

## FILE STRUCTURE
```
{
  "name": "Quiz Title",         // Visible quiz title
  "slug": "quiz-slug",          // Unique route-friendly ID
  "start": "first-slide-slug",  // Slug of the first slide
  "slides": [ {} ]              // Ordered array of slides
}
```
---

## SLIDE TYPES
Each object inside `slides[]` must have a type and slug.

- ### `single-choice-question`
  Displays a question with multiple choices.
  ```
  {
    "slug": "question-slug",               // Unique identifier for the question
    "type": "single-choice-question",      // Type of slide
    "title": "Question text",              // Question to be displayed
    "note": "Some long text",              // Optionsl: long text under title
    "answers": [                           // Array of answer options
      {
        "label": "Answer text",            // Text for the answer option
        "slug": "answer-slug",             // Unique identifier for the answer
        "nextSlideSlug": "next-slide-slug" // Optional: slug for the next slide, overrides default
      },
      {
        "label": "Answer text",
        "slug": "answer-slug-unique",
      }
    ],
    "nextSlideSlug": "default-next-slide"  // Default next slide if not specified in answers
  }
  ```

- ### `info`
  Static content screen with text and button.
  ```
  {
    "slug": "info-slug",                   // Unique identifier for the info slide
    "type": "info",                        // Type of slide
    "title": "Info title",                 // Title to be displayed
    "description": "Info description",     // Description text
    "button": "Button text",               // Text for the button
    "nextSlideSlug": "next-slide-slug"     // Slug for the next slide, null if last
  }
  ```
---

## DYNAMIC VALUES
You can personalize title, description, note, etc.. using a mini parser with dynamic values.

### Syntax:
```
{{questionSlug === answerSlug1: 'text1', answerSlug2: 'text2', ...}}
```
**Example:**

`Single {{select-gender === female: 'woman', male: 'man'}} who {{single-parent === yes: 'has children, and'}} needs a different approach.`

### Rules:
- Should be wrapped in double curly braces `{{...}}`
- Must start from a valid question slug (slide slug)
- Followed by `===` and a valid answer slug
- Use `:` to separate the answer slug from the response
- Use `,` to separate multiple answer slugs
- Support 1 or more conditions ()
- If no condition matches → outputs empty string (`""`)
- Slide with dynamic values must go after slides which values are used in the condition

---
## CREATE NEW QUIZ
1.	Copy an existing `.json` and rename it (e.g. `my-quiz.json`)
2.	File name determines route: `my-quiz.json` → `/my-quiz`
3.	Update metadata (name, slug, start)
4.	Add slides with unique slugs (answers must also have unique slugs within their level)
5.	Use nextSlideSlug for flow control (null for last slide)
