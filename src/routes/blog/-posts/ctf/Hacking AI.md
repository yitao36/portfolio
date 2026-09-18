# AI is dumb... or not?

Before learning the ways to hack AI, I thought that AI can be easily hacked by repeatedly begging it to reveal some secrets. Or perhaps lie about needing it for educational purposes, with similar vibes to `my dog ate my homework :(`. But alas it is more complicated than that, so let's get into it.

# Prompt injections

Usually caused by models simply concatenating system instructions and user input, allowing users to easily override system instructions.
With guardrails, this is typically much harder to exploit.

But since these are quite standard, and not time-consuming, one may simply copy-paste the inputs to see if any can pass.

- (When Users Hijack the AI: The Dangers of Prompt Injection (Hacking AI — Part 1))[https://medium.com/@indigoshadowwashere/hacking-ai-part-1-prompt-injection-7b95ed78d688]

# Extracting training data

Extracting training data usually requires prompting the model based on known starting words, such as "password: ".

## Fast Gradient Sign Method (FGSM)

A method for creating adversarial images, by taking the original image, and computing its loss w.r.t a falsified prediction veector. Then, apply the sign of the loss with an epsilon factor to tweak the original image.  

- (SG AI CTF 2025 Writeup (Part 2))[https://medium.com/@indigoshadowwashere/sg-ai-ctf-2025-writeup-part-2-b31cbb9cea33]