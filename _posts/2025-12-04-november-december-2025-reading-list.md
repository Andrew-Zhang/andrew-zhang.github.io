---
layout: post
title: "November & December 2025 Reading List"
date: 2025-12-04 00:00:00-0800
description: "This November and December, I was interested on MoE efficiency, speculative decoding, and efficient attention methods."
tags: [blog]
giscus_comments: true
related_posts: false
last_updated: 2026-01-07
---
<div>
<p>This November and December, I was interested on MoE efficiency, speculative decoding, and efficient attention methods.</p>
<h3>Efficient MoE</h3>
<p>It seems like increasing sparsity in MoE layers will become a challenge for existing hardware-aware algorithms, both in training and inference. Increasing sparsity lowers the arithmetic intensity of the MoE layers, since tokens share weights less often. Unlike dense models, where each token loads the same weight, tokens in MoE often load different weights (experts). Therefore, increasing batch size or sequence length is not always enough to reach a compute bound regime. The idea of efficient MoE is very interesting to me. <strong>My prediction is that as linear attention methods improve, MoE will become a critical bottleneck, especially for inference. If we can shrink KV cache size, the largest memory transfer between hbm and sbuf will be MoE weights.</strong>
</p>
<p>
<a href="https://arxiv.org/pdf/2512.14080" target="_blank" rel="noopener noreferrer">SonicMoE</a> is one of the papers that caught my eye this month. It aims to accelerate MoE through the following optimizations.</p>
<div> <ol> <li> <strong>Minimizing Activation Memory</strong> - SonicMoE does some tricks (see paper) to only cache the input to the MoE layer and the output of the up projection. This avoids <span>
<span>
<span>
<math xmlns="http://www.w3.org/1998/Math/MathML">
<semantics>
<mrow>
<mi>O</mi>
<mo stretchy="false">(</mo>
<mi>t</mi>
<mo>&#x22c5;</mo>
<mi>k</mi>
<mo>&#x22c5;</mo>
<mi>d</mi>
<mo stretchy="false">)</mo>
</mrow>
<annotation encoding="application/x-tex">O(t \cdot k \cdot d)</annotation>
</semantics>
</math>
</span>
<span aria-hidden="true">
<span>
<span>O</span>
<span>(</span>
<span>t</span>
<span>&#x22c5;</span>
</span>
<span>
<span>k</span>
<span>&#x22c5;</span>
</span>
<span>
<span>d</span>
<span>)</span>
</span>
</span>
</span>
</span> memory complexity, where t is the number of tokens, k is the number of experts, and d is dimension of the input. Rather, their activation memory complexity is <span>
<span>
<span>
<math xmlns="http://www.w3.org/1998/Math/MathML">
<semantics>
<mrow>
<mi>O</mi>
<mo stretchy="false">(</mo>
<mi>t</mi>
<mo>&#x22c5;</mo>
<mi>k</mi>
<mo>&#x22c5;</mo>
<mi>n</mi>
<mo stretchy="false">)</mo>
</mrow>
<annotation encoding="application/x-tex">O(t \cdot k \cdot n)</annotation>
</semantics>
</math>
</span>
<span aria-hidden="true">
<span>
<span>O</span>
<span>(</span>
<span>t</span>
<span>&#x22c5;</span>
</span>
<span>
<span>k</span>
<span>&#x22c5;</span>
</span>
<span>
<span>n</span>
<span>)</span>
</span>
</span>
</span>
</span>. Since k and n are inversely proportional when keeping flops constant, this scales better as MoE sparsity increases. </li>
<li> <strong>IO Overlap </strong>- SonicMoE uses async memory gathers/loads/stores to increase utilization of tensor cores. </li>
<li> <strong>Token Rounding</strong> - SonicMoE rounds the number of tokens per expert to a multiple of their tile size by either dropping low affinity tokens or adding additional tokens. </li> </ol> </div>
<p>Overall SonicMoE was a very useful paper to read, especially to understand GPU optimizations. For TPU style accelerators, IO overlap and token rounding may already be partially handled by the compiler. IO overlap could also speed up inference, although the ratio of IO to compute would be drastically different.</p>
<h3>Speculative Decoding</h3>
<p>The interaction between speculative decoding and MoE is very interesting to me. As previously mentioned, increasing sequence length does not always improve the arithmetic intensity of MoE layers. Increasing batch size does not amortize the cost of loading weights like a dense layer. <a href="https://arxiv.org/pdf/2505.19645" target="_blank" rel="noopener noreferrer">MoESD</a> approaches this behavior from a theoretical standpoint. From a high level, MoESD finds that speculative decoding can accelerate MoE inference for moderate batch sizes. At small batch size, a single decoding step may only activate a subset of experts. At large batch sizes, the model can become compute-bound, so adding more verification compute does increase runtime. However, with moderate batch sizes, verifying tokens does not significantly increase how many distinct expert weights you load and the task is still memory bound. I wonder if there is a way to design a drafter that generates batches that MoE target models can efficiently verify (through low expert selection entropy).</p>
<h3>Efficient Attention Methods</h3>
<p>As with many people, I have also been interested in efficient attention methods such as state space models (mamba) and linear attention methods (kimi-linear, gated delta net). I really like the combination of new architectures and hardware-efficient implementations. One of the favorite things I read this year was <a href="https://sustcsonglin.github.io/" target="_blank" rel="noopener noreferrer">Songlin Yang&#x2019;s blogs on parallelizing delta net</a>. On the plane ride home from China, I read these blogs instead of sleeping :D</p>
<p>I believe the main issue with linear attention methods is still retrieval. Full attention is like being able to flip through a book to find a certain section. However, linear attention is like reading the entire book and then being asked to recite a certain section. <a href="https://alexzhang13.github.io/blog/2025/rlm/" target="_blank" rel="noopener noreferrer">Recursive Language Models</a> showed that tool use (similar to grep) can drastically help in retrieval tasks. I believe this type of tool use will benefit linear attention models greatly. It is like allowing linear methods to flip through the pages of the book again. Since tool use can also blow up sequence length, linear attention methods also complement tool use.</p>
<p>
<strong>Papers and Blogs</strong>
</p>
<div> <ol> <li> <a href="https://arxiv.org/pdf/2512.14080" target="_blank" rel="noopener noreferrer">SonicMoE: Accelerating MoE with IO and Tile-aware Optimizations</a> </li>
<li> <a href="https://www.tinytpu.com/" target="_blank" rel="noopener noreferrer">Tiny-TPU: the why and how</a> </li>
<li> <a href="https://www.aleksagordic.com/blog/matmul" target="_blank" rel="noopener noreferrer">Inside NVIDIA GPUs: Anatomy of high performance matmul kernels</a> </li>
<li> <a href="https://www.aleksagordic.com/blog/vllm" target="_blank" rel="noopener noreferrer">Inside vLLM: Anatomy of a High-Throughput LLM Inference System</a> </li>
<li> <a href="https://alexzhang13.github.io/blog/2025/rlm/" target="_blank" rel="noopener noreferrer">Recursive Language Models</a> </li>
<li> <a href="https://arxiv.org/pdf/2505.19645" target="_blank" rel="noopener noreferrer">MoESD: Unveil Speculative Decoding&#x2019;s Potential for Accelerating Sparse MoE</a> </li>
<li> <a href="https://arxiv.org/pdf/2503.01840" target="_blank" rel="noopener noreferrer">EAGLE-3: Scaling up Inference Acceleration of Large Language Models via Training-Time Test</a> </li>
<li> <a href="https://arxiv.org/pdf/2510.26692" target="_blank" rel="noopener noreferrer">Kimi Linear: An Expressive, Efficient Attention Architecture</a> </li>
<li> <a href="https://arxiv.org/pdf/2412.06464" target="_blank" rel="noopener noreferrer">Gated Delta Networks: Improving Mamba2 with Delta Rule</a> </li>
<li> <a href="https://arxiv.org/pdf/2506.05233" target="_blank" rel="noopener noreferrer">MesaNet: Sequence Modeling by Locally Optimal Test-Time Training</a> </li>
<li> <a href="https://arxiv.org/pdf/2502.10297" target="_blank" rel="noopener noreferrer">DeltaProduct: Improving State-Tracking in Linear RNNs via Householder Products</a> </li>
<li> <a href="https://arxiv.org/pdf/2312.06635" target="_blank" rel="noopener noreferrer">Gated Linear Attention Transformers with Hardware-Efficient Training</a> </li>
<li> <a href="https://proceedings.neurips.cc/paper_files/paper/2024/file/d13a3eae72366e61dfdc7eea82eeb685-Paper-Conference.pdf" target="_blank" rel="noopener noreferrer">Parallelizing Linear Transformers with the Delta Rule over Sequence Length</a> </li>
<li> (Probably missed a lot. I got to start keeping track &#x1f643;) </li> </ol> </div>
</div>
