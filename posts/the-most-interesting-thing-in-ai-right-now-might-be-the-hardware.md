---
title: The most interesting thing in AI right now might be the hardware.
description: Hardware Pioneers Max 2026 — notes from a software person on edge AI, chip physics, sovereign processors, and why the constraint might no longer be the code.
date: 2026-06-12
category: tech
draft: true
---

Having spent most of my career on the software side — web dev, technical support, account management — I went to Hardware Pioneers Max mostly out of curiosity. I'm not the typical attendee, but edge AI was one of the dominant themes this year, and that intersection of AI and physical hardware is something I find genuinely exciting. I didn't catch everything, but the buzz was real: people building and shipping things they clearly believed in.

Gajendra Prasad Singh from Ambient Scientific made the case that AI compute needs to run directly inside tiny, power-constrained devices rather than bouncing everything to the cloud. Rodolfo Rosini of Vaire Computing went further: conventional chips are approaching a physical wall, and the answer is combining an analog resonator with digital components to recycle energy through the circuit rather than losing it as heat. Two different bets, both rooted in physics rather than software abstractions. That's the shift that caught me — the constraint is no longer the code, it's the silicon itself.

The talk I keep returning to was the security panel, and specifically John Goodacre. The panel raised a question that landed hard: is the industry building the future it intends, or the one it's incentivised to build? He connected it to something he'd previously written (full article [here](https://www.theregister.com/systems/2026/05/16/europe-built-sovereign-clouds-to-escape-us-control-then-forgot-about-the-processors/5237735)): Europe has poured billions into "sovereign cloud" infrastructure to escape US legal reach, while largely forgetting to ask who controls the processors running underneath. Almost no one at CyberUK in April knew about the Intel Management Engine — a subsystem that sits below the OS, below the hypervisor, largely outside any certification scope.
We tend to think of security as something you bolt on at the application layer, maybe the network layer if you're diligent. But if the silicon itself has surfaces you don't control, the rest is theatre. That applies to every software company managing sensitive data on behalf of clients — the ones who tick every compliance box and still have no visibility into what's running below the hypervisor. Who certified that layer? It's not a gotcha. It's just a question that doesn't seem to be in the room yet.

The stand that made my day as an engineer: Caligra and their c100 Developer Terminal — a Linux machine built from first principles, with their own OS, Workbench, designed for people who make things rather than consume them. Stripped back, no distractions. Something I've wanted for a while.

If you're in software and you haven't looked at what's happening in hardware lately, it's worth the time.