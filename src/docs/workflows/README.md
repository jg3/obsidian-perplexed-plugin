---
title: Perplexed — stored workflows
description: Review, rewrite, and fact-check instructions you can edit and re-run.
---

# Perplexed — stored workflows

This folder holds **stored workflows**. Each file is one instruction the **Run stored workflow** command can apply to the current selection, or to the whole note when nothing is selected. The result is appended under that text. Edit these files freely — Perplexed only re-seeds a workflow when its filename is missing.

## Shipped workflows

| File | What it does |
|---|---|
| `unclear-claims.md` | Identify unclear claims or missing evidence. |
| `fact-check.md` | Fact-check this; cite authoritative current sources. |
| `tighter-executive-version.md` | Suggest a tighter executive version; preserve meaning. |
| `contradictions.md` | Find contradictions, vague terms, and unsupported assertions. |
| `design-review-questions.md` | Create review questions for this technical design. |
| `security-claims.md` | Review this for imprecise security claims, unstated assumptions, and missing controls. Keep recommendations actionable. |
| `time-sensitive-fact-check.md` | Fact-check time-sensitive claims. List only claims that require verification and cite primary or authoritative sources. |
| `executive-rewrite.md` | Rewrite for an executive audience: concise, concrete, and technically accurate. Preserve the intended meaning. |
| `network-security-design-review.md` | Identify ambiguity, contradictions, and terms that need definition for a network-security design review. |
| `customer-facing-explanation.md` | Turn this into a customer-facing explanation without overselling or losing technical accuracy. |
| `capture-a-process.md` | Tell me about a checking, editing or modification process to make into another stored workflow. |

Fact-check workflows ask Perplexity for citations and a short recency window. The others stay on `sonar-pro` and work from the text you supply.

## Capture a process

`capture-a-process.md` does not rewrite the open note. It asks you to describe a checking, editing, or modification process, then writes a new workflow file into this folder. Existing filenames are left alone; a collision gets a numeric suffix.

## Retired research templates

Market-map, market-category, and standards-and-specs profiles are no longer shipped. If copies remain in your templates folder from an earlier version, delete those files to stop the command palette from offering them. Perplexed does not delete vault files on its own.

## Vault git

After a workflow or directory template writes to the vault, Perplexed reminds you to commit locally with Obsidian Git. Remote push stays off unless you turn on **Also push to the remote** in settings.
