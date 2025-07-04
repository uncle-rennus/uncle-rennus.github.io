---
title: "Why I Ditched WSL for MINGW64 — And the Tale of .bashrc"
description: "My journey choosing MINGW64 over WSL, battling newbie quirks, and the surprising .bashrc detail."
date: 2025-07-04
draft: false
tags: ["blog", "post", "shell", "mingw64", "dotfiles"]
categories: ["general"]
---

# Why I Ditched WSL for MINGW64 — And the Tale of .bashrc

For years, Windows Subsystem for Linux (WSL) has been the go-to solution for many Windows users wanting a Linux shell experience. But for me? WSL was never quite the right fit.

## Why Not WSL?

I don’t dislike WSL because it’s “not Linux enough” — it’s quite robust for many tasks. My main gripe is that I want to use the **standard shell environment** I’m comfortable with, without juggling multiple distros or dealing with some WSL quirks. I want:

- A straightforward package manager
- Tools like `cygpath` for seamless Windows path integration
- Easy, native integration with my Windows environment and tooling

This led me to choose **MINGW64**, the MSYS2 environment that offers a Unix-like shell with native Windows compatibility. It ships with `pacman` as a package manager, includes handy utilities like `cygpath` to convert Windows paths to Unix-style, and works smoothly with PowerShell and Windows paths.

---

## The Struggle: Launching MINGW64 From PowerShell, In The Right Directory

I wanted a simple PowerShell function:

- Launch MINGW64 bash
- Start **in the current PowerShell directory** if requested
- Keep my prompt, functions, and git branch info working flawlessly

But it was not that easy.

### The problems I ran into:

- Running `bash` with `--login -i` always opened in `$HOME` regardless of current directory.
- Using `exec bash` inside `-c` to start a fresh shell would reset to home.
- Passing the current directory as an argument was tricky — `bash` didn’t support the convenient `--cd` option.
- Running nested shells inside `-c` caused the directory to jump back to `$HOME`.
- Trying to bypass profiles with `--noprofile --norc` fixed the directory but **killed my prompt and git branch function**.

I tried multiple variants, temp RC files, environment variables, and even accepted opening a new terminal window — but it felt clunky.

---

## The Big Reveal: It Was All `.bashrc`

After adding debug `echo "Starting bash with PWD=$PWD"` lines to my `.bashrc`, I discovered the culprit:

```bash
cd $HOME
This single line forced every new interactive shell to start in the home directory, overriding any inherited directory from the parent shell.

By removing/commenting out that line, I finally had a working PowerShell function that:

Starts MINGW64 bash as a login interactive shell

Starts in the current PowerShell directory when requested

Keeps my prompt, git branch info, and custom functions working

The Takeaway: Always Look at the Big Picture
It’s easy to chase fancy hacks and workarounds when something behaves unexpectedly. But sometimes, the root cause is a simple line hiding in a config file.

Before reinventing the wheel:

Inspect your shell startup files carefully

Understand what each line does, especially those that change directories or environment variables

Test with debug outputs to see what your shell actually does on startup

This journey reminded me to zoom out and look at the entire environment instead of just the symptoms. And now, with MINGW64 and PowerShell working smoothly together, I’m back in control of my shell experience on Windows.

Happy hacking!