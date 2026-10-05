---
title: Capture a process
description: Tell me about a checking, editing or modification process to make into another stored workflow.
kind: capture
model: sonar-pro
return-citations: false
---

Tell me about a checking, editing or modification process to make into another stored workflow.

The user will describe a checking, editing, or modification process. Turn that description into one stored-workflow markdown file and return only that file, with no surrounding commentary and no code fence.

Start with YAML frontmatter using exactly these keys:

---
title: short name
description: the one-sentence instruction
kind: review
model: sonar-pro
return-citations: false
---

`kind` must be `review`. Set `return-citations` to true and add `search-recency` (`day`, `week`, `month`, or `year`) only when the process needs live source checks. After the frontmatter, write the instruction the workflow should apply to a note, including a line that says to preserve the intended meaning.
