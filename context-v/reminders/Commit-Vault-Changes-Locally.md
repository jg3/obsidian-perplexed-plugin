---
title: "Commit Vault Changes Locally"
purpose: "Reminder: after Perplexed writes a note or a stored workflow, track that change in git on this machine. Remote push is optional and stays off unless the user turns it on."
status: Authoritative
last_verified: 2026-10-05
applies_to: perplexed-plugin vault writes
---

## The one rule

When a directory template or a stored workflow changes the vault, track that change in git **locally**.

- Default behavior is a reminder Notice. It names Obsidian Git’s local commit (`obsidian-git:commit`).
- Settings → **Track vault changes** → **Commit locally** runs that command when Obsidian Git is installed.
- **Also push to the remote** is off. Leave it off unless a remote push was explicitly requested. That path uses `obsidian-git:commit-push` and is never the default.

If Obsidian Git is missing, fall back to the reminder. Do not invent a second git implementation inside the plugin.
